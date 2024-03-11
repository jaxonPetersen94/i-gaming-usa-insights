import express, { Request, Response } from 'express';
import {
  login,
  logOut,
  register,
  updateFirebaseUser,
  forgotPassword,
} from '../controllers/AuthController.js';
import { mongoDatabase } from '../app.js';
import { DbUser } from '../models/User.js';

const router = express.Router();

router.post('/api/auth/login', async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const response = await login(user);
    const dbUser = await mongoDatabase.collection('Users').findOne({
      $or: [{ email: response.user.email }, { firebaseUid: response.user.uid }],
    });
    if (dbUser) {
      const returnedUser = {
        ...dbUser,
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

router.post('/api/auth/logout', async (req: Request, res: Response) => {
  try {
    await logOut();
    res.status(200).end();
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/api/auth/register', async (req: Request, res: Response) => {
  try {
    const newUser = req.body;
    const response = await register(newUser);
    const newDbUser = {
      firebaseUid: response.user.uid,
      email: response.user.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    };
    await mongoDatabase.collection('Users').insertOne(newDbUser);
    const returnedUser = {
      ...newDbUser,
      accessToken: (response.user as any).stsTokenManager.accessToken,
    };
    res.status(200).send(returnedUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/api/auth/updateUser', async (req: Request, res: Response) => {
  try {
    const { firebaseUser, ...updatedUserInfo } = req.body;
    const updatedFirebaseUser = await updateFirebaseUser(updatedUserInfo);
    const updatedDbUser: DbUser = {
      firebaseUid: updatedUserInfo.firebaseUid,
      email: updatedFirebaseUser.email,
      firstName: updatedUserInfo.firstName,
      lastName: updatedUserInfo.lastName,
      ...(updatedUserInfo.dob && { dob: updatedUserInfo.dob }),
      ...(updatedFirebaseUser.phoneNumber && {
        phoneNumber: updatedFirebaseUser.phoneNumber,
      }),
    };
    const dbFilter = { firebaseUid: updatedDbUser.firebaseUid };
    await mongoDatabase.collection('Users').updateOne(dbFilter, {
      $set: updatedDbUser,
    });
    const returnedUser = {
      ...updatedDbUser,
      accessToken: updatedUserInfo.accessToken,
    };
    res.status(200).send(returnedUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/api/auth/forgotPassword', async (req: Request, res: Response) => {
  try {
    const email = req.body.email;
    const response = await forgotPassword(email);
    res.status(200).send(response);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
