import { Router } from "express";
import categoryControllers from "@controllers/category.controllers";

const categoryRoutes: Router = Router();

categoryRoutes.get("/", categoryControllers.getCategories);
categoryRoutes.get("/:id", categoryControllers.getCategoryById);
categoryRoutes.post("/", categoryControllers.createCategory);

export default categoryRoutes;
