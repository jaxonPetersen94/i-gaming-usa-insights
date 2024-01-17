import express, { Request, Response } from 'express';
import { login, register, logOut } from '../controllers/AuthController.js';

const router = express.Router();

router.post('/api/login', async (req: Request, res: Response) => {
  try {
    const user = req.body;
    await login(user);
    res.status(200).send('Login successful');
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/api/register', async (req: Request, res: Response) => {
  try {
    const newUser = req.body;
    await register(newUser);
    res.status(200).send('Registration successful');
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

router.post('/api/logout', async (req: Request, res: Response) => {
  try {
    await logOut();
    res.status(200).send('Logout successful');
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

export default router;
