import jwt from "jsonwebtoken";
import config from "config";

const createToken = (payload: object) => {
  return jwt.sign(payload, config.jwtSecret, {
    expiresIn: config.jwtExpiration,
  });
};

export default createToken;
