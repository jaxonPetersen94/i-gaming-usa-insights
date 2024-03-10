import { admin, auth } from '../firebase.js';
import {
  User,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { LoginUserForm, RegisterUserForm } from '../models/User.js';

async function login(newUser: LoginUserForm) {
  return signInWithEmailAndPassword(auth, newUser.email, newUser.password);
}

async function logOut() {
  return signOut(auth);
}

async function register(newUser: RegisterUserForm) {
  return createUserWithEmailAndPassword(auth, newUser.email, newUser.password);
}

async function updateFirebaseUser(updatedUser: any) {
  return admin.auth().updateUser(updatedUser.firebaseUid, {
    email: updatedUser.email,
    displayName: `${updatedUser.firstName} ${updatedUser.lastName}`,
    phoneNumber: updatedUser.phoneNumber,
  });
}

async function forgotPassword(email: string) {
  return sendPasswordResetEmail(auth, email);
}

export { login, logOut, register, updateFirebaseUser, forgotPassword };
