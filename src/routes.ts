import { Router } from "express";
import box from "./controllers/box";
import login from "./controllers/login";
import register from "./controllers/register";
import { verifyToken } from "./controllers/verifyToken";

const router = Router();

router.get("/", verifyToken, (req, res) => {
  res.status(200).json({ message: "Welcome to the API" });
});

router.post("/login", login);

router.post("/register", register);

router.post("/image", box);

export default router;
