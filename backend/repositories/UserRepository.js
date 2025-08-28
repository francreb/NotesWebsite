const db = require('../models');

class UserRepository {
  async create(userData) {
    return await db.User.create(userData);
  }

  async findByUsername(username) {
    return await db.User.findOne({ where: { username } });
  }

  async findByEmail(email) {
    return await db.User.findOne({ where: { email } });
  }

  async findById(id) {
    return await db.User.findByPk(id);
  }
}

module.exports = UserRepository;
