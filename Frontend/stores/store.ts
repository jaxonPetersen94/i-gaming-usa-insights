import { defineStore } from 'pinia';
import type { RegisterUserPostRequest, User } from '../types/User/types';
import APP_CONST from '~/constants/appConstants';

export const useUserStore = defineStore('user', () => {
  const user = ref({} as User);
  const fireBaseUser = ref({} as any);
  const loginProcessing = ref(false);
  const loginSuccessful = ref(false);
  const errorMsg = ref('');
  const forgotPasswordEmailSent = ref(false);

  const userIsAuthenticated = (): boolean => {
    return !!fireBaseUser.value.stsTokenManager?.accessToken;
  };

  async function signInUser(userLoginData: any): Promise<boolean> {
    try {
      loginProcessing.value = true;
      const data = await $fetch(APP_CONST.API_USER_LOGIN, {
        method: 'post',
        body: userLoginData,
      });
      loginSuccessful.value = true;
      fireBaseUser.value = data;
      user.value = {
        firstName: '',
        lastName: '',
        email: fireBaseUser.value.email,
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
    await $fetch(APP_CONST.API_USER_LOGOUT, { method: 'post' });
    loginSuccessful.value = false;
    fireBaseUser.value = {} as any;
    user.value = {} as User;
  }

  async function registerUser(
    newUserData: RegisterUserPostRequest,
  ): Promise<boolean> {
    try {
      loginProcessing.value = true;
      const data = await $fetch(APP_CONST.API_USER_REGISTER, {
        method: 'post',
        body: newUserData,
      });
      loginSuccessful.value = true;
      fireBaseUser.value = data;
      user.value = {
        firstName: newUserData.firstName,
        lastName: newUserData.lastName,
        email: fireBaseUser.value.email,
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

  async function forgotPassword(email: string): Promise<boolean> {
    try {
      await $fetch(APP_CONST.API_USER_FORGOT_PASSWORD, {
        method: 'post',
        body: { email },
      });
      forgotPasswordEmailSent.value = true;
      return true;
    } catch (error: any) {
      if (error.response) {
        errorMsg.value = error.response._data.code;
      } else {
        errorMsg.value = 'Error: Failed to send password reset email';
      }
      return false;
    }
  }

  return {
    user,
    loginProcessing,
    loginSuccessful,
    errorMsg,
    forgotPasswordEmailSent,
    userIsAuthenticated,
    signInUser,
    signOutUser,
    registerUser,
    forgotPassword,
  };
});
