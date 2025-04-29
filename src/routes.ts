import { Router } from "express";
import { verifyToken } from "./controllers/verifyToken";
import login from "./controllers/login";
import register from "./controllers/register";
import image from "./controllers/image";

const router = Router();

router.get("/", verifyToken, (req, res) => {
  res.status(200).json({ message: "Welcome to the API" });
});

router.post("/login", login);

router.post("/register", register);

router.post("/image", image);

export default router;
