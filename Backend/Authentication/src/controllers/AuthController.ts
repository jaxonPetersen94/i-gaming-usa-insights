import { auth } from '../firebase.js';
import {
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

async function forgotPassword(email: string) {
  return sendPasswordResetEmail(auth, email);
}

export { login, logOut, register, forgotPassword };
