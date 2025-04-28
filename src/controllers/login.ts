import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { prisma } from "../libs/db";
import { signToken } from "./verifyToken";

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: "Email and password are required" });
    return;
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    console.log("\nEmail not found on login 🚫");
    res.status(400).json("Email not found on login 🚫");
    return;
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    console.log("Password incorrect 🚫");
    res.status(401).json("Password incorrect 🚫");
    return;
  }

  try {
    const token = await signToken(
      { id: user.id },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
      },
    });
  } catch (err) {
    res.status(500).json({ error: "Error logging in" });
  }

  console.log("\nUser logged in ✅");
};

export default login;
