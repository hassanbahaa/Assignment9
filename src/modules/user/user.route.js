import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  getUserController,
  loginUserController,
  updateUserController,
} from "./user.controller.js";
import { authMiddleware } from "../../middleware/authentication.middleware.js";
const route = Router();

route.post("/signup", createUserController);
route.post("/login", loginUserController);
route.patch("/", authMiddleware, updateUserController);
route.delete("/", authMiddleware, deleteUserController);
route.get("/", authMiddleware, getUserController);
export default route;
