import type { Request, Response } from "express";
import { CompanyModel } from "@models/Company";
import { validateCompany } from "@schemas/company.schema";

const getCompanies = async (_req: Request, res: Response) => {
	try {
		const companies = await CompanyModel.getCompanies();
		if (!companies.success) {
			return res.status(404).json({
				code: 404,
				success: false,
				message: companies.message,
			});
		}
		return res.status(200).json({
			code: 200,
			success: true,
			message: companies.message,
			data: companies.data,
		});
	} catch (error) {
		return res.status(500).json({
			code: 500,
			success: false,
			message: "Internal server error",
		});
	}
};

const getCompanyById = async (req: Request, res: Response) => {
	try {
		const company = await CompanyModel.getCompanyById(Number(req.params.id));
		if (!company.success) {
			return res.status(404).json({
				code: 404,
				success: false,
				message: company.message,
			});
		}
		return res.status(200).json({
			code: 200,
			success: true,
			message: company.message,
			data: company.data,
		});
	} catch (error) {
		return res.status(500).json({
			code: 500,
			success: false,
			message: "Internal server error",
		});
	}
};

const createCompany = async (req: Request, res: Response) => {
	try {
		const input = req.body;
		const result = validateCompany(input);
		if (!result.success) {
			const errorsField = result.error.issues.map((issue) => {
				return {
					field: issue.path.join("."),
					message: issue.message,
				};
			});
			return res.status(400).json({
				code: 400,
				success: false,
				message: "Error in fields",
				errors: errorsField,
			});
		}

		const company = await CompanyModel.createCompany(input);
		if (!company.success) {
			return res.status(500).json({
				code: 500,
				success: false,
				message: company.message,
			});
		}

		return res.status(201).json({
			code: 201,
			success: true,
			message: company.message,
			data: company.data,
		});
	} catch (error) {
		return res.status(500).json({
			code: 500,
			success: false,
			message: "Internal server error",
		});
	}
};

const companyController = {
	getCompanies,
	getCompanyById,
	createCompany,
};

export default companyController;
