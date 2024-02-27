import HistoryDatamapper from "../datamappers/history.datamapper.js";
import RecipeDatamapper from "../datamappers/recipe.datamapper.js";
import UserDatamapper from "../datamappers/user.datamapper.js";
import ApiError from "../helpers/apiError.js";

export default function (paramsName, tableName) {
  return async function (req, _, next) {
    const id = req.params[paramsName];
    const user = await UserDatamapper.findByPk(req.user.id);
    let data;
    switch (tableName) {
    case "user":
      if (parseInt(user.id) !== parseInt(id)) {
        if (!user.isAdmin) throw new ApiError("Forbidden", {httpStatus: 403});
      }
      break;
    case "recipe":
      data = await RecipeDatamapper.findByPk(id);
      if (data.userId !== parseInt(user.id)) {
        if (!user.isAdmin) throw new ApiError("Forbidden", {httpStatus: 403});
      }
      break;
    case "history":
      data = await HistoryDatamapper.findByPk(id);
      if (data.userId !== parseInt(user.id)) {
        if (!user.isAdmin) throw new ApiError("Forbidden", {httpStatus: 403});
      }
      break;
    default:
      throw new ApiError("This tableName isn't exist.");
    }
          
    next();
  };
}