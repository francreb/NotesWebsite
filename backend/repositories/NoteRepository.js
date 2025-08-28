const db = require('../models');

class NoteRepository {
  async create(noteData) {
    return await db.Note.create(noteData);
  }

  async findById(id, userId) {
    return await db.Note.findOne({ 
      where: { id, userId },
      include: [{ 
        model: db.Category, 
        as: 'categories', 
        through: { attributes: [] } 
      }]
    });
  }

  async findAllByUserId(userId, options = {}) {
    const where = { userId };
    
    if (options.archived !== undefined) {
      where.archived = options.archived;
    }

    return await db.Note.findAll({
      where,
      include: [{ 
        model: db.Category, 
        as: 'categories', 
        through: { attributes: [] } 
      }],
      order: [['createdAt', 'DESC']]
    });
  }

  async update(id, userId, updateData) {
    const [affectedCount] = await db.Note.update(updateData, {
      where: { id, userId }
    });
    return affectedCount > 0;
  }

  async delete(id, userId) {
    return await db.Note.destroy({ where: { id, userId } });
  }

  async updateCategories(noteId, categoryIds) {
    const note = await db.Note.findByPk(noteId);
    if (!note) return false;
    
    await note.setCategories(categoryIds);
    return true;
  }
}

module.exports = NoteRepository;
