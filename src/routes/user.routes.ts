import { Router } from "express";
import userControllers from "@controllers/user.controllers";
import { verifyToken } from "@middlewares/auth";

const userRoutes: Router = Router();

userRoutes.get("/", userControllers.getUsers);
userRoutes.get("/:id", verifyToken, userControllers.getUserById);
userRoutes.post("/", userControllers.createUser);
// userRoutes.put("/:id", userControllers.updateUser);
// userRoutes.delete("/:id", userControllers.deleteUser);

export default userRoutes;
