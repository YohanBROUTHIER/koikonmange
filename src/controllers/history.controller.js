import HistoryDatamapper from "../datamappers/history.datamapper.js";
import HistoryValidator from "../helpers/validators/history.validator.js";
import CoreController from "./core.controller.js";


export default class HistoryController extends CoreController{
  static datamapper = HistoryDatamapper;
  static className = "history";
  static validator = HistoryValidator;

  static async addRecipe(req, res) {
    const data = this.validator.checkBodyForAddRecype(req.body);

    await this.datamapper.addRecipeToHistory(data);
    res.status(200).end();
  }
  
  static updateRecipe(req, res) {
    const data = this.validator.checkBodyForUpdateRecype(req.body);

    await this.datamapper.updateRecipeToHistory(data);
    res.status(200).end();
  }

  static removeRecipe(req, res) {
    const data = this.validator.checkBodyForRemoveRecype(req.body);

    await this.datamapper.removeRecipeToHistory(data);
    res.status(200).end();
  }

}

