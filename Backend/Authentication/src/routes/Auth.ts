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
    const mongoUser = await mongoDatabase.collection('Users').findOne({
      $or: [{ email: response.user.email }, { firebaseUid: response.user.uid }],
    });
    if (mongoUser) {
      const returnedUser = {
        ...mongoUser,
        accessToken: (response.user as any).stsTokenManager.accessToken,
      };
      res.status(200).send(returnedUser);
    } else {
      res.status(500).json('User not found in MongoDB');
    }
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
    const newUserDbEntry = {
      firebaseUid: response.user.uid,
      email: response.user.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    };
    await mongoDatabase.collection('Users').insertOne(newUserDbEntry);
    const returnedUser = {
      ...newUserDbEntry,
      accessToken: (response.user as any).stsTokenManager.accessToken,
    };
    res.status(200).send(returnedUser);
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
