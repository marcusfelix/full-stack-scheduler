import express from "express";
import { Auth } from "../middlewares/auth";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.use(Auth);

router.get('/', async (req, res) => {
  try {

    // Fetch user events or all events in case
    // current user is ADMIN type
    const events = await prisma.event.findMany(req.user.type === "ADMIN" ? undefined : {
      where: {
        uid: req.user.id
      }
    });
    res.json({
      events
    });
  } catch (error: any) {
    res.status(500).json({
      error: error.message
    });
  }
});

router.post('/', async (req, res) => {
  try {

    const { name = '', description = '', when = '' } = req.body;

    if (name === '') {
      throw new Error('name field is required')
    }

    if (description === '') {
      throw new Error('description field is required')
    }

    if (when === '') {
      throw new Error('when field is required')
    }

    const data = await prisma.event.create({
      data: {
        name,
        description,
        when,
        uid: req.user.id
      }
    });
    res.json({
      data
    });
  } catch (error: any) {
    res.status(500).json({
      error: error.message
    });
  }
});

export default router;