import app, { APP_URL, PORT, API_URL } from "./app";
import db from "./db";
import colors from "colors";

const init = async () => {
  try {
    await db.authenticate();
    console.log(
      colors.black.bgGreen.bold("✔️ Database connection established")
    );

    await db.sync();
    console.log(colors.black.bgGreen.bold("✔️ Database models synchronized"));

    app.listen(PORT, () => {
      console.log(
        colors.black.bgGreen.bold(
          `✔️ Server is listening on: ${APP_URL}:${API_URL}`
        )
      );
    });
  } catch (error) {
    console.error(
      colors.white.bgRed.italic(`❌ Server could not start. Error: ${error}`)
    );
    process.exit(1);
  }
};

void init();
