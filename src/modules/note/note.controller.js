import {
  aggregationNotes,
  createNote,
  deleteNote,
  getAllNotes,
  getAllNotesWithUser,
  getOneNote,
  getOneNoteByContent,
  replaceNote,
  updateAllNotes,
  updateNote,
} from "./note.service.js";

export const createNoteController = async (req, res, next) => {
  const id = req.user.id;
  const note = req.body;
  console.log(id);
  try {
    const newNote = await createNote(id, note);
    res.status(201).json({
      success: true,
      message: "Note created successfully",
      noteId: newNote._id,
    });
  } catch (error) {
    next(error);
  }
};

export const updateNoteController = async (req, res, next) => {
  const id = req.user.id;
  const noteId = req.params.noteId;
  const note = req.body;
  try {
    const newNote = await updateNote(id, noteId, note);
    res.status(200).json({
      success: true,
      message: "Note updated successfully",
      note: newNote,
    });
  } catch (error) {
    next(error);
  }
};

export const replaceNoteController = async (req, res, next) => {
  const id = req.user.id;
  const noteId = req.params.noteId;
  const note = req.body;
  try {
    const newNote = await replaceNote(id, noteId, note);
    res.status(200).json({
      success: true,
      message: "Note replaced successfully",
      note: newNote,
    });
  } catch (error) {
    next(error);
  }
};

export const updateAllTitles = async (req, res, next) => {
  const id = req.user.id;
  const note = req.body;
  try {
    const notes = await updateAllNotes(id, note);
    res.status(200).json({
      success: true,
      message: "All notes updated successfully",
      data: notes,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteNoteController = async (req, res, next) => {
  const id = req.user.id;
  const noteId = req.params.noteId;

  try {
    const newNote = await deleteNote(id, noteId);
    res.status(200).json({
      success: true,
      message: "Note deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getAllNotesWithPagination = async (req, res, next) => {
  const id = req.user.id;
  const page = req.query.page || 1;
  const limit = req.query.limit || 2;
  try {
    const notes = await getAllNotes(id, page, limit);
    res.status(200).json({
      success: true,
      message: "Notes retrieved successfully",
      data: notes,
    });
  } catch (error) {
    next(error);
  }
};

export const getOneNoteController = async (req, res, next) => {
  const id = req.user.id;
  const noteId = req.params.noteId;
  try {
    const note = await getOneNote(id, noteId);
    res.status(200).json({
      success: true,
      message: "Note retrieved successfully",
      data: note,
    });
  } catch (error) {
    next(error);
  }
};

export const getOneNoteByContentController = async (req, res, next) => {
  const id = req.user.id;
  const content = req.query.content;
  try {
    const note = await getOneNoteByContent(id, content);
    res.status(200).json({
      success: true,
      message: "Note retrieved successfully",
      data: note,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllWithUserData = async (req, res, next) => {
  const id = req.user.id;
  try {
    const note = await getAllNotesWithUser(id);
    res.status(200).json({
      success: true,
      message: "Note retrieved successfully",
      data: note,
    });
  } catch (error) {
    next(error);
  }
};

export const getAggregateNotes = async (req, res, next) => {
  const id = req.user.id;
  const title = req.query.title;
  try {
    const note = await aggregationNotes(id, title);
    res.status(200).json({
      success: true,
      message: "Note retrieved successfully",
      data: note,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteAllNotesController = async (req, res, next) => {
  const id = req.user.id;
  try {
    const note = await deleteAllNotes(id);
    res.status(200).json({
      success: true,
      message: "All notes deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
