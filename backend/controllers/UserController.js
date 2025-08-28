const UserService = require('../services/UserService');

class UserController {
  constructor() {
    this.userService = new UserService();
  }

  async register(req, res) {
    try {
      const { username, email, password } = req.body;
      const user = await this.userService.register({ username, email, password });
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async login(req, res) {
    try {
      const { username, password } = req.body;
      const result = await this.userService.login(username, password);
      res.json(result);
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  }

  async getProfile(req, res) {
    try {
      const profile = await this.userService.getProfile(req.user.id);
      res.json(profile);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
}

module.exports = UserController;
