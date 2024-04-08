import express, { Request, Response } from 'express';
import {
  login,
  register,
  updateFirebaseUser,
} from '../controllers/AuthController.js';
import { mongoDatabase } from '../app.js';
import { DbUser } from '../models/User.js';

const router = express.Router();

router.post('/api/auth/login', async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const dbUser: any = await login(user);
    if (dbUser) {
      res.status(200).send(dbUser);
    } else {
      res.status(500).json('User not found in MongoDB');
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/api/auth/register', async (req: Request, res: Response) => {
  try {
    const newUser = req.body;
    const registeredUser = await register(newUser);
    res.status(200).send(registeredUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/api/auth/updateUser', async (req: Request, res: Response) => {
  try {
    const updatedUserInfo = req.body;
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
    if (
      updatedUserInfo.phoneNumber === null &&
      updatedFirebaseUser.phoneNumber === undefined
    ) {
      await mongoDatabase.collection('Users').updateOne(dbFilter, {
        $unset: { phoneNumber: true },
      });
    }
    if (updatedUserInfo.dob === null) {
      await mongoDatabase.collection('Users').updateOne(dbFilter, {
        $unset: { dob: true },
      });
    }
    const returnedUser = {
      ...updatedDbUser,
      accessToken: updatedUserInfo.accessToken,
    };
    res.status(200).send(returnedUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
