import Job from "../models/jobModel.js";
import { StatusCodes } from "http-status-codes";
import asyncHandler from "express-async-handler";
import mongoose from "mongoose";
import moment from "moment";
const createJob = asyncHandler(async (req, res) => {
  // const { position, company, jobLocation,status,jobType } = req.body

  req.body.createdBy = req.user._id;
  const job = new Job(req.body);

  const createdJob = await job.save();
  res.status(StatusCodes.CREATED).json(createdJob);
});

const getAllJobs = asyncHandler(async (req, res) => {
  const { status, search, jobType, sort } = req.query;
  const queryObject = {
    createdBy: req.user._id,
  };

  if (status && status !== "all") {
    queryObject.status = status;
  }
  if (jobType && jobType != "all") {
    queryObject.jobType = jobType;
  }
  if (search) {
    queryObject.position = { $regex: search, $options: "i" };
  }

  let result = Job.find(queryObject);

  if (sort === "latest") {
    result = result.sort("-createdAt");
  }
  if (sort === "latest") {
    result = result.sort("-createdAt");
  }
  if (sort === "oldest") {
    result = result.sort("createdAt");
  }
  if (sort === "a-z") {
    result = result.sort("position");
  }
  if (sort === "z-a") {
    result = result.sort("-position");
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 2;
  const skip = (page - 1) * limit;
  result = result.skip(skip).limit(limit);

  const jobs = await result;

  const totalJobs = await Job.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalJobs / limit);


  res.json({ jobs, totalJobs,numOfPages });
});

const updateJob = asyncHandler(async (req, res) => {
  const { position, company, jobLocation, status, jobType } = req.body;
  const job = await Job.findById(req.params.id);
  if (job) {
    job.user = req.user._id;
    job.position = position;
    job.company = company;
    job.jobLocation = jobLocation;
    job.status = status;
    job.jobType = jobType;

    const updatedJob = await await job.save();
    res.status(StatusCodes.ACCEPTED).json(updateJob);
  } else {
    res.status(StatusCodes.NOT_FOUND);
    throw new Error(`Job not found!`);
  }
});

const getJobByID = async (req, res) => {
  const job = await Job.findById(req.params.id);

  if (job) {
    res.json(job);
  } else {
    res.status(StatusCodes.NOT_FOUND);
    throw new Error(`Job not found!`);
  }
};

const deleteJob = async (req, res) => {
  console.log(req.params.id);
  const job = await Job.findById(req.params.id);
  if (job) {
    await job.remove();
    res.json({ message: "Job removed" });
  } else {
    res.status(StatusCodes.NOT_FOUND).json(`Job not found`);
  }
};

const showStats = asyncHandler(async (req, res) => {
  let stats = await Job.aggregate([
    {
      $match: { createdBy: mongoose.Types.ObjectId(req.user._id) },
    },
    { $group: { _id: "$status", count: { $sum: 1 } } },
  ]);
  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    console.log(curr);
    acc[title] = count;
    return acc;
  }, {});

  const defaultStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0,
  };
  let monthlyApplication = await Job.aggregate([
    {
      $match: { createdBy: mongoose.Types.ObjectId(req.user._id) },
    },
    {
      $group: {
        _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
        count: { $sum: 1 },
      },
    },
    {
      $sort: { "_id.year": -1, "_id.month": -1 },
    },
    {
      $limit: 6,
    },
  ]);
  monthlyApplication = monthlyApplication.map((item) => {
    const {
      _id: { year, month },
      count,
    } = item;

    const date = moment()
      .month(month - 1)
      .year(year)
      .format("MMM Y");
    return { date, count };
  });

  res.status(StatusCodes.OK).json({ stats, monthlyApplication });
});

export { createJob, getAllJobs, updateJob, deleteJob, showStats, getJobByID };
