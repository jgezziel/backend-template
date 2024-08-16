export default {
  APP_URL: process.env.URL || "http://localhost",
  port: process.env.PORT || 3000,
  apiVersion: process.env.API_VERSION || "/api/v1",
  cors: {
    acceptedOrigins: ["http://127.0.0.1:3001"],
    allowedOrigins: ["http://localhost:3000"],
  },
  db: {
    username: process.env.DB_USER || "jgezziel",
    password: process.env.DB_PASS || "635jgezziel131",
    database: process.env.DB_NAME || "api_db",
    host: process.env.DB_HOST || "cont_db_api",
    dialect: process.env.DB_DIALECT || "postgres",
  },
  bcryptSalt: process.env.BCRYPT_SALT || 10,
  jwtSecret: process.env.JWT_SECRET || "@En_todo_el_final_es_importante@",
  jwtExpiration: process.env.JWT_EXPIRATION || "1h",
  cookieExpiration: 1000 * 60 * 60,
};
