import React, { useState, useEffect } from 'react';
import { noteService, categoryService } from '../../services/notes';

const NoteForm = ({ note, onSave, onCancel }) => const [title, setTitle]