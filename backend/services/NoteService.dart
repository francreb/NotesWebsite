const NoteRepository = require('../repositories/NoteRepository');
const CategoryRepository = require('../repositories/CategoryRepository');

class NoteService {
  constructor() {
    this.noteRepository = new NoteRepository();
    this.categoryRepository = new CategoryRepository();
  }

  async createNote(userId, noteData) {
    const note = await this.noteRepository.create({
      title: noteData.title,
      content: noteData.content,
      userId
    });

    if (noteData.categoryIds && noteData.categoryIds.length > 0) {
      await this.noteRepository.updateCategories(note.id, noteData.categoryIds);
    }

    return await this.noteRepository.findById(note.id, userId);
  }

  async getNotes(userId, archived = false) {
    return await this.noteRepository.findAllByUserId(userId, { archived });
  }

  async getNoteById(userId, noteId) {
    const note = await this.noteRepository.findById(noteId, userId);
    if (!note) {
      throw new Error('Note not found');
    }
    return note;
  }

  async updateNote(userId, noteId, updateData) {
    const updated = await this.noteRepository.update(noteId, userId, updateData);
    if (!updated) {
      throw new Error('Note not found');
    }

    if (updateData.categoryIds) {
      await this.noteRepository.updateCategories(noteId, updateData.categoryIds);
    }

    return await this.noteRepository.findById(noteId, userId);
  }

  async deleteNote(userId, noteId) {
    const deleted = await this.noteRepository.delete(noteId, userId);
    if (!deleted) {
      throw new Error('Note not found');
    }
    return true;
  }

  async toggleArchive(userId, noteId) {
    const note = await this.getNoteById(userId, noteId);
    const updated = await this.noteRepository.update(noteId, userId, {
      archived: !note.archived
    });
    
    if (!updated) {
      throw new Error('Note not found');
    }
    
    return await this.noteRepository.findById(noteId, userId);
  }
}

module.exports = NoteService;
