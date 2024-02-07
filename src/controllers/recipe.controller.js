import CoreController from './core.controller.js';
import RecipeDatamapper from '../datamappers/recipe.datamapper.js';
import RecipeValidator from '../helpers/validators/recipe.validator.js';

export default class RecipeController extends CoreController {
  static datamapper = RecipeDatamapper;
  static className = 'Recipe';
  static validator = RecipeValidator;

  // Get all recipes
  static async getAll(req, res) {
    try {
      const filter = req.query;
      const recipes = await this.datamapper.findAll(filter);
      res.status(200).json(recipes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Get a recipe by ID
  static async get(req, res) {
    try {
      const { id } = req.params;
      this.validator.checkId(id);

      const recipe = await this.datamapper.findByPk(id);
      this.validator.checkIfExist(recipe, 'Recipe');

      res.status(200).json(recipe);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Create a new recipe
  static async create(req, res) {
    try {
      const data = this.validator.checkBodyForCreate(req.body);
      const createdRecipe = await this.datamapper.create(data);
      res.status(200).json(createdRecipe);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Update an existing recipe
  static async update(req, res) {
    try {
      const { id } = req.params;
      this.validator.checkId(id);
      const data = this.validator.checkBodyForUpdate(req.body);

      const existingRecipe = await this.datamapper.findByPk(id);
      this.validator.checkIfExist(existingRecipe, 'Recipe');

      const updatedRecipe = await this.datamapper.update({ id, ...data });

      res.status(200).json(updatedRecipe);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Delete a recipe by ID
  static async delete(req, res) {
    try {
      const { id } = req.params;
      this.validator.checkId(id);

      const isDeleted = await this.datamapper.delete(id);
      this.validator.checkIfExist(isDeleted, 'Recipe deletion');

      res.status(204).json();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}
