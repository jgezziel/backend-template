import type { Request, Response } from "express";
import { SessionModel } from "@models/Session";
import { validateLogin } from "@schemas/user.schema";
import config from "config";

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

    const login = await SessionModel.login(input);
    if (!login.success) {
      return res.status(400).json({
        code: 400,
        success: false,
        message: login.message,
      });
    }

    return res
      .status(200)
      .cookie("access_token", login.token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: config.cookieExpiration,
      })
      .json({
        code: 200,
        success: true,
        message: login.message,
        data: {
          user: login.user,
          token: login.token,
        },
      });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      success: false,
      message: "Internal server error",
    });
  }
};

const logout = async (req: Request, res: Response) => {
  try {
    const { authorization: access_token } = req.headers;
    if (!access_token) {
      return res.status(400).json({
        code: 400,
        success: false,
        message: "Access token not found",
      });
    }

    const logout = await SessionModel.logout(access_token);

    if (!logout.success) {
      return res.status(400).json({
        code: 400,
        success: false,
        message: logout.message,
      });
    }

    return res.status(200).clearCookie("access_token").json({
      code: 200,
      success: true,
      message: logout.message,
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
  logout,
};

export default authController;
