import { Router } from "express";
import authController from "@controllers/auth.controllers";

const authRoutes: Router = Router();

authRoutes.post("/login", authController.login);

export default authRoutes;
