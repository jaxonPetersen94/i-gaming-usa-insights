import { admin } from '../firebase.js';
import { mongoDatabase } from '../app.js';

async function login(user) {
  return await mongoDatabase.collection('Users').findOne({
    $or: [{ email: user.email }, { firebaseUid: user.uid }],
  });
}

async function register(newUser: any) {
  await mongoDatabase.collection('Users').insertOne(newUser);
  return newUser;
}

async function updateFirebaseUser(updatedUser: any) {
  return admin.auth().updateUser(updatedUser.firebaseUid, {
    email: updatedUser.email,
    displayName: `${updatedUser.firstName} ${updatedUser.lastName}`,
    phoneNumber: updatedUser.phoneNumber,
  });
  // Move DB actions into here?
}

export { login, register, updateFirebaseUser };
