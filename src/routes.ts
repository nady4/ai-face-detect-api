import { Router } from "express";
import login from "./controllers/login";
import register from "./controllers/register";
import image from "./controllers/image";
import { verifyToken } from "./controllers/verifyToken";

const router = Router();

router.get("/", verifyToken, (req, res) => {
  res.status(200).json({ message: "Welcome to the API" });
});

router.post("/login", login);

router.post("/register", register);

router.post("/image", image);

export default router;
