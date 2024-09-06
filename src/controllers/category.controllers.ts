import type { Request, Response } from "express";
import { CategoryModel } from "@models/Category";
import { validateCategory } from "@schemas/category.schema";

const getCategories = async (_req: Request, res: Response) => {
  try {
    const categories = await CategoryModel.getCategories();
    if (!categories.success) {
      return res.status(404).json({
        code: 404,
        success: false,
        message: categories.message,
      });
    }
    return res.status(200).json({
      code: 200,
      success: true,
      message: categories.message,
      data: categories.data,
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      success: false,
      message: "Internal server error",
    });
  }
};

const getCategoryById = async (req: Request, res: Response) => {
  try {
    const category = await CategoryModel.getCategoryById(Number(req.params.id));
    if (!category.success) {
      return res.status(404).json({
        code: 404,
        success: false,
        message: category.message,
      });
    }
    return res.status(200).json({
      code: 200,
      success: true,
      message: category.message,
      data: category.data,
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      success: false,
      message: "Internal server error",
    });
  }
};

const createCategory = async (req: Request, res: Response) => {
  try {
    const input = req.body;
    const result = validateCategory(input);
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
        message: "Error in the fields",
        errors: errorsField,
      });
    }

    const category = await CategoryModel.createCategory(input);
    if (!category.success) {
        
      return res.status(400).json({
        code: 400,
        success: false,
        message: category.message,
      });
    }

    return res.status(201).json({
      code: 201,
      success: true,
      message: category.message,
      data: category.data,
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      success: false,
      message: "Internal server error",
    });
  }
};

const categoryController = {
  getCategories,
  getCategoryById,
  createCategory,
};

export default categoryController;
