import { DBRepository } from "../../db.repo.js";
import { User } from "./user.model.js";

export const userRepo = new DBRepository(User);
