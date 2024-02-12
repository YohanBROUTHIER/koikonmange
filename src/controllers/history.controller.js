import HistoryDatamapper from "../datamappers/history.datamapper.js";
import HistoryValidator from "../helpers/validators/history.validator.js";
import CoreController from "./core.controller.js";


export default class HistoryController extends CoreController{
  static datamapper = HistoryDatamapper;
  static className = "history";
  static validator = HistoryValidator;

  static async addRecipe(req, res) {
    const data = this.validator.checkBodyForAddRecype(req.body);

    const row = await this.datamapper.addRecipeToHistory(data);
    res.status(200).end();
  }
  
  static updateRecipe() {
    const data = this.validator.checkBodyForAddRecype(req.body);

    const row = await this.datamapper.updateRecipeToHistory(data);
    res.status(200).end();
  }

  static removeRecipe() {

  }

}

