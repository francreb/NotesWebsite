const db = require('../models');

class CategoryRepository {
  async create(categoryData) {
    return await db.Category.create(categoryData);
  }

  async findById(id, userId) {
    return await db.Category.findOne({ where: { id, userId } });
  }

  async findAllByUserId(userId) {
    return await db.Category.findAll({ where: { userId } });
  }

  async findByName(name, userId) {
    return await db.Category.findOne({ where: { name, userId } });
  }

  async update(id, userId, updateData) {
    const [affectedCount] = await db.Category.update(updateData, {
      where: { id, userId }
    });
    return affectedCount > 0;
  }

  async delete(id, userId) {
    return await db.Category.destroy({ where: { id, userId } });
  }
}

module.exports = CategoryRepository;
