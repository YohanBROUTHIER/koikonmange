import ApiError from "../helpers/apiError.js";

export default function (req, _, next) {
  if (req.session?.user) {
    next();
  } else {
    throw new ApiError("Merci de vous connecter pour accèdé a cette page.", {name: "Unauthorized", httpStatus: 401, redirect: ("/signin?redirect=" + req.url)});
  }
}