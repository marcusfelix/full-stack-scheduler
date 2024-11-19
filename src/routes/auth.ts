import { PrismaClient } from "@prisma/client";
import express from "express";
import { validateEmail } from "../utils/email";
import { validatePassword } from "../utils/password";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();
const prisma = new PrismaClient()

router.post('/create', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!validateEmail(email)) {
      throw new Error('e-mail not valid')
    }

    if (!validatePassword(password)) {
      throw new Error('password must have at least 8 characters, one uppercase character and one symbol')
    }

    const existing = await prisma.user.findUnique({
      where: {
        email: email
      }
    });

    if (existing) {
      throw new Error('e-mail already taken');
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = {
      email,
      password: hashedPassword,
    }

    const data = await prisma.user.create({
      data: user
    })

    res.json({
      id: data.id,
      email: data.email,
      created: data.created
    });
  } catch (error: any) {
    res.status(500).json({
      error: error.message
    })
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!validateEmail(email)) {
      throw new Error('e-mail not valid')
    }

    if (!validatePassword(password)) {
      throw new Error('password must have at least 8 characters, one uppercase character and one symbol')
    }

    const data = await prisma.user.findUnique({
      where: {
        email: email
      }
    });

    if (!data) {
      throw new Error('e-mail or password are incorrect');
    }

    const isPasswordCorrect = await bcrypt.compare(password, data?.password);

    if (!isPasswordCorrect) {
      throw new Error('e-mail or password are incorrect');
    }

    const token = jwt.sign(
      data,
      process.env.JWT_SECRET!,
      { expiresIn: '1h' }
    );
    res.json({
      token
    });
  } catch (error: any) {
    res.status(500).json({
      error: error.message
    })
  }
});

export default router;