import { auth } from '../firebase.js';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { LoginUserForm, RegisterUserForm } from '../models/User.js';

async function login(newUser: LoginUserForm) {
  return signInWithEmailAndPassword(auth, newUser.email, newUser.password);
}

async function register(newUser: RegisterUserForm) {
  return createUserWithEmailAndPassword(auth, newUser.email, newUser.password);
}

async function logOut() {
  return signOut(auth);
}

export { login, register, logOut };
