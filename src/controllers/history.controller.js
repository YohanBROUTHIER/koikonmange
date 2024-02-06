
import HistoryDatamapper from "../datamapper/history.datamapper.js";


export default class HistoryController {
  static datamapper = HistoryDatamapper;
  static className = "history";
  static validator = HistoryValidator

  
    static async create(req, res) {
      const data = this.validator.checkBodyForCreate(req.body);
  
      const row = await this.datamapper.insert(data);
      res.status(200).json(row);
    }
  
    static async getAll(_, res) {
      const rows = await this.datamapper.findAll();
      res.status(200).json(rows);
    }
  
    static async getByPk(req, res) {
      const { id } = req.params;
      this.validator.checkId(id);
  
      const row = await this.datamapper.findByPk(id);
      this.validator.checkIfExist(row);
  
      return res.status(200).json(row);
    }
  
    static async update(req, res) {
      const { id } = req.params;
      this.validator.checkId(id);
      const data = this.validator.checkBodyForUpdate(req.body);
  
      const exitedRow = await this.datamapper.findByPk(id);
      this.validator.checkIfExist(exitedRow);
  
      const row = await this.datamapper.update(data);
  
      return res.status(200).json(row);
    }
  
    static async delete(req, res) {
      const { id } = req.params;
      this.validator.checkId(id);
  
      const isDeleted = await this.datamapper.delete(id);
      this.validator.checkIfExist(isDeleted);
  
      return res.status(204).json();
    }
  }