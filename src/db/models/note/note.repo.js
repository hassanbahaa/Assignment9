import { DBRepository } from "../../db.repo.js";
import { Note } from "./note.model.js";

export const noteRepo = new DBRepository(Note);
