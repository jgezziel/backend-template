import type { Request, Response } from "express";
import { UserModel } from "../models/User";
import { validateLogin } from "../schemas/user.schema";

const login = async (req: Request, res: Response) => {
  try {
    const input = req.body;
    const result = validateLogin(input);

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

    const login = await UserModel.login(input);
    if (!login.success) {
      return res.status(400).json({
        code: 400,
        success: false,
        message: login.message,
      });
    }

    return res.status(200).json({
      code: 200,
      success: true,
      message: login.message,
      data: login.data,
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      success: false,
      message: "Internal server error",
    });
  }
};

const authController = {
  login,
};

export default authController;
