import { Router } from "express";
import authController from "@controllers/auth.controllers";

const authRoutes: Router = Router();

authRoutes.post("/login", authController.login);
authRoutes.post("/logout", authController.logout);

export default authRoutes;
