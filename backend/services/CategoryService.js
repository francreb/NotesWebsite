const CategoryRepository = require('../repositories/CategoryRepository');

class CategoryService {
  constructor() {
    this.categoryRepository = new CategoryRepository();
  }

  async createCategory(userId, categoryData) {
    const existingCategory = await this.categoryRepository.findByName(categoryData.name, userId);
    if (existingCategory) {
      throw new Error('Category with this name already exists');
    }

    return await this.categoryRepository.create({
      name: categoryData.name,
      color: categoryData.color || '#3B82F6',
      userId
    });
  }

  async getCategories(userId) {
    return await this.categoryRepository.findAllByUserId(userId);
  }

  async getCategoryById(userId, categoryId) {
    const category = await this.categoryRepository.findById(categoryId, userId);
    if (!category) {
      throw new Error('Category not found');
    }
    return category;
  }

  async updateCategory(userId, categoryId, updateData) {
    const updated = await this.categoryRepository.update(categoryId, userId, updateData);
    if (!updated) {
      throw new Error('Category not found');
    }
    return await this.categoryRepository.findById(categoryId, userId);
  }

  async deleteCategory(userId, categoryId) {
    const deleted = await this.categoryRepository.delete(categoryId, userId);
    if (!deleted) {
      throw new Error('Category not found');
    }
    return true;
  }
}

module.exports = CategoryService;
