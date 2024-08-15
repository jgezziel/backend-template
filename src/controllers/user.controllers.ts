import type { Request, Response } from "express";
import { UserModel } from "@models/User";
import { validateUser } from "@schemas/user.schema";

const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await UserModel.readUsers();
    if (!users.success) {
      return res.status(404).json({
        code: 404,
        success: false,
        message: users.message,
      });
    }
    return res.status(200).json({
      code: 200,
      success: true,
      message: users.message,
      data: users.data,
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      success: false,
      message: "Internal server error",
    });
  }
};

const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await UserModel.getUserById(Number(req.params.id));
    if (!user.success) {
      return res.status(404).json({
        code: 404,
        success: false,
        message: user.message,
      });
    }
    return res.status(200).json({
      code: 200,
      success: true,
      message: user.message,
      data: user.data,
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      success: false,
      message: "Internal server error",
    });
  }
};

const createUser = async (req: Request, res: Response) => {
  try {
    const input = req.body;
    const result = validateUser(input);

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

    const user = await UserModel.createUser(input);
    if (!user.success) {
      return res.status(400).json({
        code: 400,
        success: false,
        message: user.message,
      });
    }

    return res.status(201).json({
      code: 201,
      success: true,
      message: "User created",
      data: user.data,
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      success: false,
      message: "Internal server error",
    });
  }
};

const userControllers = {
  getUsers,
  getUserById,
  createUser,
};

export default userControllers;
