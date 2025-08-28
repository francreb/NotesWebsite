const express = require('express');
const auth = require('../middleware/auth');
const { registerValidation, loginValidation, noteValidation, categoryValidation } = require('../middleware/validation');

const UserController = require('../controllers/UserController');
const NoteController = require('../controllers/NoteController');
const CategoryController = require('../controllers/CategoryController');

const router = express.Router();

const userController = new UserController();
const noteController = new NoteController();
const categoryController = new CategoryController();

// Auth routes
router.post('/register', registerValidation, userController.register);
router.post('/login', loginValidation, userController.login);

// Protected routes
router.use(auth);

// User routes
router.get('/profile', userController.getProfile);

// Note routes
router.get('/notes', noteController.getNotes);
router.post('/notes', noteValidation, noteController.createNote);
router.get('/notes/:id', noteController.getNote);
router.put('/notes/:id', noteValidation, noteController.updateNote);
router.delete('/notes/:id', noteController.deleteNote);
router.patch('/notes/:id/archive', noteController.toggleArchive);

// Category routes
router.get('/categories', categoryController.getCategories);
router.post('/categories', categoryValidation, categoryController.createCategory);
router.get('/categories/:id', categoryController.getCategory);
router.put('/categories/:id', categoryValidation, categoryController.updateCategory);
router.delete('/categories/:id', categoryController.deleteCategory);

module.exports = router;
