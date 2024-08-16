import type { Request, Response, NextFunction } from "express";
import config from "config";
import jwt from "jsonwebtoken";

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { access_token } = req.cookies;
  const token: string = access_token;

  if (!token) {
    return res.status(403).json({
      code: 403,
      status: "error",
      error: {
        message: "No token provided",
        code: "MISSING_TOKEN",
        detail: "Token is required",
      },
    });
  }

  return jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(403).json({
        code: 403,
        status: "error",
        error: {
          message: "Invalid token",
          code: err.name.toUpperCase(),
          detail: err.message,
        },
      });
    }

    req.body.user = decoded;
    return next();
  });
};
