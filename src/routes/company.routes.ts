import { Router } from "express";
import companyControllers from "@controllers/company.controllers";

const companyRoutes: Router = Router();

companyRoutes.get("/", companyControllers.getCompanies);
companyRoutes.get("/:id", companyControllers.getCompanyById);
companyRoutes.post("/", companyControllers.createCompany);

export default companyRoutes;
