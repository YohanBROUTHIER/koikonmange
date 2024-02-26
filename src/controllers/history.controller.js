import HistoryDatamapper from "../datamappers/history.datamapper.js";
import RecipeDatamapper from "../datamappers/recipe.datamapper.js";
import HistoryValidator from "../validators/history.validator.js";
import CoreController from "./core.controller.js";


export default class HistoryController extends CoreController{
  static datamapper = HistoryDatamapper;
  static className = "history";
  static validator = HistoryValidator;

  static async addRecipe(req, res) {
    const data = this.validator.checkDataForAddRecype({ ...req.body, ...req.params});

    const existingRecipeInHistory = await this.datamapper.findRecipeToHistory({filter:{history:[["historyId","=",data.historyId],["recipeId","=",data.recipeId]]}});
    this.validator.checkIfAlreadyExist(existingRecipeInHistory, "This recipe in history");

    const existingHistory = await this.datamapper.findByPk(data.historyId);
    this.validator.checkIfExist(existingHistory, "History");

    const existingRecipe = await RecipeDatamapper.findByPk(data.recipeId);
    this.validator.checkIfExist(existingRecipe, "Recipe");

    await this.datamapper.addRecipeToHistory(data);
    res.status(200).end();
  }
  
  static async updateRecipe(req, res) {
    const data = this.validator.checkDataForUpdateRecype({ ...req.body, ...req.params});

    const existingRecipeInHistory = await this.datamapper.findRecipeToHistory({filter:{history:[["historyId","=",data.historyId],["recipeId","=",data.recipeId]]}});
    this.validator.checkIfExist(existingRecipeInHistory, "This recipe in history");

    await this.datamapper.updateRecipeToHistory(data);
    res.status(200).end();
  }

  static async removeRecipe(req, res) {
    const data = this.validator.checkDataForRemoveRecype({ ...req.body, ...req.params});

    const existingRecipeInHistory = await this.datamapper.findRecipeToHistory({filter:{history:[["historyId","=",data.historyId],["recipeId","=",data.recipeId]]}});
    this.validator.checkIfExist(existingRecipeInHistory, "This recipe in history");

    await this.datamapper.removeRecipeToHistory(data);
    res.status(200).end();
  }

}

