const CategoryService = require('../services/CategoryService');

class CategoryController {
  constructor() {
    this.categoryService = new CategoryService();
  }

  async createCategory(req, res) {
    try {
      const category = await this.categoryService.createCategory(req.user.id, req.body);
      res.status(201).json(category);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getCategories(req, res) {
    try {
      const categories = await this.categoryService.getCategories(req.user.id);
      res.json(categories);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getCategory(req, res) {
    try {
      const category = await this.categoryService.getCategoryById(req.user.id, req.params.id);
      res.json(category);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async updateCategory(req, res) {
    try {
      const category = await this.categoryService.updateCategory(req.user.id, req.params.id, req.body);
      res.json(category);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteCategory(req, res) {
    try {
      await this.categoryService.deleteCategory(req.user.id, req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
}

module.exports = CategoryController;
