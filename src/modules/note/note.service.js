import { isValidObjectId } from "mongoose";
import { noteRepo } from "../../db/index.js";
import { Note } from "../../db/models/note/note.model.js";
import { checkExist } from "../user/user.service.js";
import { Types } from "mongoose";
const { ObjectId } = Types;
export async function createNote(id, note) {
  const user = await checkExist({ _id: id });
  if (!user) {
    throw new Error("User not found", { cause: 404 });
  }
  const newNote = await noteRepo.create({ ...note, userId: id });
  return newNote;
}

export async function updateNote(id, noteId, note) {
  const getNote = await noteRepo.getOne({ _id: noteId });
  if (!getNote) {
    throw new Error("Note not found", { cause: 404 });
  }
  if (getNote.userId.toString() !== id) {
    throw new Error(`You're not the Owner`, { cause: 401 });
  }
  const newNote = await noteRepo.update({ _id: noteId }, note);
  return newNote;
}

export async function replaceNote(id, noteId, note) {
  const getNote = await noteRepo.getOne({ _id: noteId });
  if (!getNote) {
    throw new Error("Note not found", { cause: 404 });
  }
  if (getNote.userId.toString() !== id) {
    throw new Error(`You're not the Owner`, { cause: 401 });
  }
  note.userId = id;
  const newNote = await noteRepo.replace({ _id: noteId }, note, {
    new: true,
    runValidators: true,
  });
  return newNote;
}

export async function updateAllNotes(id, note) {
  const { title } = note;
  const notes = await noteRepo.updateAll({ userId: id }, { title });
  return notes;
}

export async function deleteNote(id, noteId) {
  const getNote = await noteRepo.getOne({ _id: noteId });
  if (!getNote) {
    throw new Error("Note not found", { cause: 404 });
  }
  if (getNote.userId.toString() !== id) {
    throw new Error(`You're not the Owner`, { cause: 401 });
  }
  const deleteNote = await noteRepo.delete({ _id: noteId });
  return deleteNote;
}

export async function getAllNotes(id, limit, page) {
  const skip = (page - 1) * limit;
  const notes = await noteRepo.getAll(
    { userId: id },
    {},
    { skip, limit, sort: { createdAt: -1 } }
  );
  return notes;
}

export async function getOneNote(id, noteId) {
  const getNote = await noteRepo.getOne({ _id: noteId });
  if (!getNote) {
    throw new Error("Note not found", { cause: 404 });
  }
  if (getNote.userId.toString() !== id) {
    throw new Error(`You're not the Owner`, { cause: 401 });
  }
  return getNote;
}

export async function getOneNoteByContent(id, content) {
  const getNote = await noteRepo.getOne({
    content: { $regex: content },
    userId: id,
  });
  if (!getNote) {
    throw new Error("Note not found", { cause: 404 });
  }

  return getNote;
}

export async function getAllNotesWithUser(id) {
  const notes = await Note.find({ userId: id })
    .select("title userId createdAt")
    .populate("userId", "email -_id");
  return notes;
}

export async function aggregationNotes(id, title) {
  // aggregation
  const objId = new ObjectId(id);
  const pipeline = [
    { $match: { userId: objId } },
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $project: {
        title: 1,
        userId: 1,
        content: 1,
        user: { name: 1, email: 1 },
      },
    },
  ];

  if (title) {
    pipeline.push({ $match: { title: { $regex: title } } });
  }
  const notes = await Note.aggregate(pipeline);
  return notes;
}

export async function deleteAllNotes(id) {
  const notes = await Note.deleteMany({ userId: id });
  return notes;
}
