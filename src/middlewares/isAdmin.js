import ApiError from "../helpers/apiError.js";
import UserDatamapper from "../datamappers/user.datamapper.js";

export default async function (req, _, next) {
  const user = await UserDatamapper.findByPk(req.user.id);
  
  if (!user.isAdmin) throw new ApiError("Forbidden", {httpStatus: 403});

  next();
}