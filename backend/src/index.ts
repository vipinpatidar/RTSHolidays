import "dotenv/config";
import connectDB from "./db/db";
import app from "./app";

const port: number = parseInt(process.env.PORT || "8080", 10);

connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.log("Error", error);
      throw error;
    });

    app.listen(port, () => {
      console.log(`Server is listing on port ${port}`);
    });
  })
  .catch((error) => {
    console.log(`Mongodb Connect Failed:`, error);
    process.exit(1);
  });
