import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { prisma } from "../libs/db";
import { signToken } from "./verifyToken";

const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res
      .status(400)
      .json({ error: "Username, email, and password are required" });
    return;
  }

  const isUsernameAvailable = async (username: string) => {
    const user = await prisma.user.findUnique({
      where: { username: username },
    });
    return user ? false : true;
  };

  const isEmailAvailable = async (email: string) => {
    const user = await prisma.user.findUnique({
      where: { email: email },
    });
    return user ? false : true;
  };

  const isEmailValid = (email: string) =>
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    );

  const isPasswordValid = (password: string) =>
    /(?=.*\d)(?=.*[a-zA-Z]).{8,}/.test(password);

  const isUsernameValid = (username: string) =>
    username.length >= 3 && username.length <= 20;

  if (!(await isUsernameAvailable(username))) {
    console.log("\nUsername not available on registration 🚫");
    res.status(402).json("Username not available on registration 🚫");
    return;
  }

  if (!(await isEmailAvailable(email))) {
    console.log("\nEmail not available on registration 🚫");
    res.status(403).json("Email not available on registration 🚫");
    return;
  }

  if (!isEmailValid(email)) {
    console.log("\nIncorrect format for email on registration 🚫");
    res.status(400).json("Incorrect format for email on registration 🚫");
    return;
  }

  if (!isPasswordValid(password)) {
    console.log("\nIncorrect format for password on registration 🚫");
    res.status(401).json("Incorrect format for password on registration 🚫");
    return;
  }

  if (!isUsernameValid(username)) {
    console.log("\nIncorrect format for username on registration 🚫");
    res.status(404).json("Incorrect format for username on registration 🚫");
    return;
  }

  const hash = await bcrypt.hash(password, 10);
  const id = uuidv4();

  try {
    const user = await prisma.user.create({
      data: {
        id: id,
        email: email,
        password: hash,
        username: username,
      },
    });

    const token = await signToken(
      { id: user.id },
      process.env.JWT_SECRET as string,
      {
        expiresIn: 86400,
      }
    );

    res.status(201).json({ user, token });

    console.log("\nUser added ✅");
  } catch (err: any) {
    console.error("\nError creating user in database", err);
    if (err.code === "P2002") {
      res.status(409).json({ error: "User already exists" });
      return;
    }
    res.status(500).json({ error: "Internal Server Error" });
    return;
  }
};

export default register;
