import HistoryDatamapper from "../datamappers/history.datamapper.js";


export default class HistoryController {
  static datamapper = HistoryDatamapper;
  static className = "history";
  static validator = HistoryValidator;

}

