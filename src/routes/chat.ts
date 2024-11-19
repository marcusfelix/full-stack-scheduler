import express from "express";
import { Auth } from "../middlewares/auth";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient()

router.use(Auth);

router.get('/:id', async (req, res) => {
  try {

    const event = await prisma.event.findUnique({
      where: {
        id: req.params.id,
        uid: req.user.id
      }
    })

    if (req.user.type === "USER" && event === null) {
      throw new Error('not allowed to fetch messages');
    }

    const messages = await prisma.message.findMany({
      where: {
        eid: req.params.id as string,
      }
    });
    res.json({
      messages
    });
  } catch (error: any) {
    res.status(500).json({
      error: error.message
    });
  }
});

router.post('/:id', async (req, res) => {
  try {
    const { body } = req.body;

    if (!body) {
      throw new Error('missing body');
    }

    const event = await prisma.event.findUnique({
      where: {
        id: req.params.id,
        uid: req.user.id
      }
    });

    if (req.user.type === "USER" && event === null) {
      throw new Error('not allowed to post messages');
    }

    const data = await prisma.message.create({
      data: {
        body,
        uid: req.user.id,
        eid: req.params.id,
      }
    });
    res.json({ data })
  } catch (error: any) {
    res.status(500).json({
      error: error.message
    });
  }
});

export default router;