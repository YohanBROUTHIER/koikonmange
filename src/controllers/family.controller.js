import CoreController from './core.controller.js';
import FamilyDatamapper from '../datamappers/family.datamapper.js';  
import FamilyValidator from '../helpers/validators/family.validator.js';

export default class FamilyController extends CoreController {
  static datamapper = FamilyDatamapper;
  static className = 'Family';
  static validator = FamilyValidator;

  static async getAll(req, res) {
    try {
      const filter = req.query;
      const families = await this.datamapper.findAll(filter);
      res.status(200).json(families);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async get(req, res) {
    try {
      const { id } = req.params;
      this.validator.checkId(id);

      const family = await this.datamapper.findByPk(id);
      this.validator.checkIfExist(family, 'Family');

      res.status(200).json(family);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async create(req, res) {
    try {
      const data = this.validator.checkBodyForCreate(req.body);
      const createdFamily = await this.datamapper.create(data);
      res.status(200).json(createdFamily);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;
      this.validator.checkId(id);
      const data = this.validator.checkBodyForUpdate(req.body);

      const existingFamily = await this.datamapper.findByPk(id);
      this.validator.checkIfExist(existingFamily, 'Family');

      const updatedFamily = await this.datamapper.update({ id, ...data });

      res.status(200).json(updatedFamily);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;
      this.validator.checkId(id);

      const isDeleted = await this.datamapper.delete(id);
      this.validator.checkIfExist(isDeleted, 'Family deletion');

      res.status(204).json();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}
