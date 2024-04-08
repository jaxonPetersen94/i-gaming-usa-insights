import { defineStore } from 'pinia';
import type { RegisterUserPostRequest, User } from '../types/User/types';
import APP_CONST from '~/constants/appConstants';
import { auth } from '../firebase';
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

export const useUserStore = defineStore('user', () => {
  const user = ref({} as User);
  const sessionCheckCompleted = ref(false);
  const loginProcessing = ref(false);
  const loginSuccessful = ref(false);
  const userUpdateProcessing = ref(false);
  const userUpdateSuccessful = ref(false);
  const forgotPasswordEmailProcessing = ref(false);
  const forgotPasswordEmailSent = ref(false);
  const errorMsg = ref('');

  const userIsAuthenticated = (): boolean => {
    return !!user.value.accessToken;
  };

  async function signInUser(userLoginData: any): Promise<boolean> {
    try {
      loginProcessing.value = true;
      const firebaseUser: any = await signInWithEmailAndPassword(
        auth,
        userLoginData.email,
        userLoginData.password,
      );
      loginSuccessful.value = true;
      const dbUser: any = await $fetch(APP_CONST.API_USER_LOGIN, {
        method: 'post',
        body: {
          email: auth.currentUser?.email,
          firebaseUid: auth.currentUser?.uid,
        },
      });
      user.value = {
        firebaseUid: dbUser.firebaseUid,
        firstName: dbUser.firstName,
        lastName: dbUser.lastName,
        email: dbUser.email,
        ...(dbUser.dob && { dob: dbUser.dob }),
        ...(dbUser.phoneNumber && {
          phoneNumber: dbUser.phoneNumber,
        }),
        accessToken: firebaseUser.user.accessToken,
      };
      return true;
    } catch (error: any) {
      loginSuccessful.value = false;
      if (error.response) {
        errorMsg.value = error.response._data.code;
      } else {
        errorMsg.value = 'FetchError: Failed to fetch';
      }
      return false;
    } finally {
      loginProcessing.value = false;
    }
  }

  async function signOutUser() {
    await signOut(auth);
    loginSuccessful.value = false;
    sessionCheckCompleted.value = false;
    user.value = {} as User;
  }

  async function registerUser(
    newUserData: RegisterUserPostRequest,
  ): Promise<boolean> {
    try {
      loginProcessing.value = true;
      const newFirebaseUser: any = await createUserWithEmailAndPassword(
        auth,
        newUserData.email,
        newUserData.password,
      );
      const newDbUser: any = await $fetch(APP_CONST.API_USER_REGISTER, {
        method: 'post',
        body: {
          firebaseUid: newFirebaseUser.user.uid,
          email: newFirebaseUser.user.email,
          firstName: newUserData.firstName,
          lastName: newUserData.lastName,
        },
      });
      user.value = {
        firebaseUid: newDbUser.firebaseUid,
        firstName: newDbUser.firstName,
        lastName: newDbUser.lastName,
        email: newDbUser.email,
        accessToken: newFirebaseUser.user.accessToken,
      };
      loginSuccessful.value = true;
      return true;
    } catch (error: any) {
      loginSuccessful.value = false;
      if (error.response) {
        errorMsg.value = error.response._data.code;
      } else {
        errorMsg.value = 'FetchError: Failed to fetch';
      }
      return false;
    } finally {
      loginProcessing.value = false;
    }
  }

  async function updateUser(updatedUserData: User): Promise<boolean> {
    try {
      userUpdateProcessing.value = true;
      const data: any = await $fetch(APP_CONST.API_USER_UPDATE, {
        method: 'post',
        body: updatedUserData,
      });
      userUpdateSuccessful.value = true;
      user.value = {
        firebaseUid: data.firebaseUid,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        ...(data.dob && { dob: data.dob }),
        ...(data.phoneNumber && {
          phoneNumber: data.phoneNumber,
        }),
        accessToken: data.accessToken,
      };
      return true;
    } catch (error: any) {
      userUpdateSuccessful.value = false;
      if (error.response) {
        errorMsg.value = error.response._data.code;
      } else {
        errorMsg.value = 'FetchError: Failed to fetch';
      }
      return false;
    } finally {
      userUpdateProcessing.value = false;
    }
  }

  async function forgotPassword(email: string): Promise<boolean> {
    try {
      forgotPasswordEmailProcessing.value = true;
      await sendPasswordResetEmail(auth, email);
      forgotPasswordEmailSent.value = true;
      return true;
    } catch (error: any) {
      if (error.response) {
        errorMsg.value = error.response._data.code;
      } else {
        errorMsg.value = 'Error: Failed to send password reset email';
      }
      return false;
    } finally {
      forgotPasswordEmailProcessing.value = false;
    }
  }

  return {
    user,
    sessionCheckCompleted,
    loginProcessing,
    loginSuccessful,
    userUpdateProcessing,
    userUpdateSuccessful,
    forgotPasswordEmailProcessing,
    forgotPasswordEmailSent,
    errorMsg,
    userIsAuthenticated,
    signInUser,
    signOutUser,
    registerUser,
    updateUser,
    forgotPassword,
  };
});
