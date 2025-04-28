process.loadEnvFile();
import express from "express";
import cors from "cors";
import routes from "./routes";
import { connectDB } from "./libs/db";

const app = express();
app.use(express.json());
app.use(cors());

connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`💚 app is running on 🔌 port ${process.env.PORT}`);
    });
  })
  .catch((err: Error) => {
    console.error("❌ Failed to connect to database", err);
    process.exit(1);
  });

app.use("/", routes);
