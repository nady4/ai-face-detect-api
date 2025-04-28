import { Request, Response, Router } from "express";
import box from "./controllers/box";
import login from "./controllers/login";
import register from "./controllers/register";
import { verifyToken } from "./controllers/verifyToken";

const router = Router();

router.get("/", verifyToken, (req, res) => {
  res.json({
    message: "Welcome to the API",
  });
});

router.post("/login", login);

router.post("/register", register);

router.post("/verify-token", verifyToken, (req, res) => {
  res.json({
    message: "Token is valid",
  });
});

router.post("/image", box);

export default router;
