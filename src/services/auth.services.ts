import jwt from "jsonwebtoken";
import config from "config";

export const createToken = (payload: object) => {
  return jwt.sign(payload, config.jwtSecret, {
    expiresIn: config.jwtExpiration,
  });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, config.jwtSecret);
}
