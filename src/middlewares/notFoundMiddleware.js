import ApiError from "../helpers/apiError.js";

export default function () {
  throw new ApiError("La page n'as pas été trouvé", {name:"NotFound" ,httpStatus: 404});
}