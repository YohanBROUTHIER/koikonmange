import ApiError from "../helpers/apiError.js";

export default function (err, req, res, _)  {
  if (!err.httpStatus) {
    console.error(err);
    err = new ApiError("Unexpected server error. Please try again later.", {name:"Error", httpStatus: 500});
  }
  const resError = {
    name: err.name,
    message: err.message,
    status: err.httpStatus
  };

  res.status(err.httpStatus).json({"error":resError.message});
}