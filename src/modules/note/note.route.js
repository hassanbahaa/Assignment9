import { Router } from "express";
import {
  createNoteController,
  deleteAllNotesController,
  deleteNoteController,
  getAggregateNotes,
  getAllNotesWithPagination,
  getAllWithUserData,
  getOneNoteByContentController,
  getOneNoteController,
  replaceNoteController,
  updateAllTitles,
  updateNoteController,
} from "./note.controller.js";
import { authMiddleware } from "../../middleware/authentication.middleware.js";

const route = Router();

route.post("/", authMiddleware, createNoteController);
route.delete("/", authMiddleware, deleteAllNotesController);
route.patch("/all", authMiddleware, updateAllTitles);
route.get("/paginate-sort", authMiddleware, getAllNotesWithPagination);
route.get("/aggregate", authMiddleware, getAggregateNotes);
route.get("/note-with-user", authMiddleware, getAllWithUserData);
route.get("/note-by-content", authMiddleware, getOneNoteByContentController);
route.put("/replace/:noteId", authMiddleware, replaceNoteController);
route.get("/:noteId", authMiddleware, getOneNoteController);
route.patch("/:noteId", authMiddleware, updateNoteController);
route.delete("/:noteId", authMiddleware, deleteNoteController);

export default route;
