import cors from "cors";
import config from "config";

const allowedOrigins: string[] = config.cors.allowedOrigins;

const corsMiddleware = ({ acceptedOrigins = allowedOrigins } = {}) =>
  cors({
    origin: (origin, callback) => {
      // allow requests with no origin
      // (like mobile apps or curl requests)
      if (origin === null || origin === undefined || origin === "")
        return callback(null, true);

      if (!acceptedOrigins.includes(origin)) {
        const msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }

      return callback(null, true);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  });

export default corsMiddleware;
