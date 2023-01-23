import express from "express";
import {
  createJob,
  deleteJob,
  getAllJobs,
  getJobByID,
  showStats,
  updateJob,
} from "../controllers/jobController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route(`/`).post(protect, createJob).get(protect, getAllJobs);
router.route(`/stats`).get(protect, showStats);
router.route(`/:id`).get(protect,getJobByID).patch(protect, updateJob).delete(protect ,deleteJob)

export default router;
