import ApiError from "../helpers/apiError.js";

export default function (req, _, next) {
  const { id } = req.params;
  if (parseInt(req.user.id) === parseInt(id)) {
    next();
  } else {
    throw new ApiError("Vous n'avez pas les droits d'accès.", {name: "Forbidden", httpStatus: 403});
  }
}