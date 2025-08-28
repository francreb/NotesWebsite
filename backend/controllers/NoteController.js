const NoteService = require('../services/NoteService');

class NoteController {
  constructor() {
    this.noteService = new NoteService();
  }

  async createNote(req, res) {
    try {
      const note = await this.noteService.createNote(req.user.id, req.body);
      res.status(201).json(note);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getNotes(req, res) {
    try {
      const archived = req.query.archived === 'true';
      const notes = await this.noteService.getNotes(req.user.id, archived);
      res.json(notes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getNote(req, res) {
    try {
      const note = await this.noteService.getNoteById(req.user.id, req.params.id);
      res.json(note);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async updateNote(req, res) {
    try {
      const note = await this.noteService.updateNote(req.user.id, req.params.id, req.body);
      res.json(note);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteNote(req, res) {
    try {
      await this.noteService.deleteNote(req.user.id, req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async toggleArchive(req, res) {
    try {
      const note = await this.noteService.toggleArchive(req.user.id, req.params.id);
      res.json(note);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
}

module.exports = NoteController;
