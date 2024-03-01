import express, { Request, Response } from 'express';
import {
  login,
  logOut,
  register,
  forgotPassword,
} from '../controllers/AuthController.js';
import { mongoDatabase } from '../app.js';

const router = express.Router();

router.post('/api/login', async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const response = await login(user);
    res.status(200).send(response.user);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/api/logout', async (req: Request, res: Response) => {
  try {
    await logOut();
    res.status(200).end();
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/api/register', async (req: Request, res: Response) => {
  try {
    const newUser = req.body;
    const response = await register(newUser);
    const { password, confirmPassword, ...newUserDbEntry } = req.body;
    await mongoDatabase.collection('Users').insertOne(newUserDbEntry);
    res.status(200).send(response.user);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/api/forgotPassword', async (req: Request, res: Response) => {
  try {
    const email = req.body.email;
    const response = await forgotPassword(email);
    res.status(200).send(response);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
