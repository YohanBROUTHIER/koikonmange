import UserDatamapper from "../datamappers/user.datamapper.js";
import ApiError from "../helpers/apiError.js";

export default async function (req, _, next) {
  const { id } = req.params;
  if (parseInt(req.user.id) !== parseInt(id)) {
    const user = await UserDatamapper.findByPk(req.user.id);
    if (!user.isAdmin) throw new ApiError("Forbidden", {httpStatus: 403});
  }
  next();
}