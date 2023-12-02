import { auth } from '../firebase.js';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { LoginUserForm, RegisterUserForm } from '../models/User.js';

async function login(newUser: LoginUserForm) {
  console.log('login');
  console.log('newUser =', newUser);
  return signInWithEmailAndPassword(auth, newUser.email, newUser.password);
}

async function register(newUser: RegisterUserForm) {
  console.log('register');
  return createUserWithEmailAndPassword(auth, newUser.email, newUser.password);
}

async function logOut() {
  console.log('logOut');
  return signOut(auth);
}

export { login, register, logOut };
