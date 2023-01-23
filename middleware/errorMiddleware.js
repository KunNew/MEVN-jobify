import { StatusCodes } from "http-status-codes";
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};
const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
 
  if (err.name === "ValidationError") {
    statusCode = StatusCodes.BAD_REQUEST
    err.message = Object.values(err.errors)
      .map((item) => item.message)
      .join(",");
  }
  if(err.code && err.code === 11000) {
    statusCode = StatusCodes.BAD_REQUEST
    err.message = `${Object.keys(err.keyValue)} field has to be unqiue`
  }
  
  res.status(statusCode);

  res.json({
    message: err.message,

    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

export { errorHandler, notFound };
