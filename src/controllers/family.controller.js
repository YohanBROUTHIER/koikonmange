import CoreController from './core.controller.js';
import FamilyDatamapper from '../datamappers/family.datamapper.js';  
import FamilyValidator from '../helpers/validators/family.validator.js';

export default class FamilyController extends CoreController {
  static datamapper = FamilyDatamapper;
  static className = 'Family';
  static validator = FamilyValidator;

  // getting all families
  static async getAll(req, res) {
    try {
      const filter = req.query;
  
      // all families using the FamilyDatamapper
      const families = await this.datamapper.findAll(filter);
      res.status(200).json(families);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
     // getting a specific family by ID
      static async get(req, res) {
      try {

    // Extract the family ID from the request parameters      
      const { id } = req.params;
      this.validator.checkId(id);

    // the family by ID using the FamilyDatamapper
      const family = await this.datamapper.findByPk(id);

    // Check if the family exists; otherwise, throw an error
      this.validator.checkIfExist(family, 'Family');
    
    // Respond with the retrieved family
      res.status(200).json(family);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  // creating a new family
  static async create(req, res) {
    try {
      const data = this.validator.checkBodyForCreate(req.body);
      const createdFamily = await this.datamapper.create(data);
  // Respond with the created family
      res.status(200).json(createdFamily);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
 // updating an existing family
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
  
  // deleting a family by ID
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
