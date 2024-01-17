import { defineStore } from 'pinia';
import type { RegisterUserPostRequest } from '../types/User/types';
import APP_CONST from '~/constants/appConstants';

export const useUserStore = defineStore('user', () => {
  const user = ref(0);
  const loginProcessing = ref(false);
  const loginSuccessful = ref(false);
  const errorMsg = ref('');

  async function registerUser(newUser: RegisterUserPostRequest) {
    loginProcessing.value = true;
    const data = await $fetch(APP_CONST.API_USER_REGISTER, {
      method: 'post',
      body: newUser,
    }).catch((error) => {
      loginSuccessful.value = false;
      errorMsg.value = error.response._data.code;
    });
    if (data) {
      loginSuccessful.value = true;
    }
    loginProcessing.value = false;
  }

  async function signInUser(user: any) {
    loginProcessing.value = true;
    const data = await $fetch(APP_CONST.API_USER_LOGIN, {
      method: 'post',
      body: user,
    }).catch((error) => {
      loginSuccessful.value = false;
      errorMsg.value = error.response._data.code;
    });
    if (data) {
      loginSuccessful.value = true;
    }
    loginProcessing.value = false;
  }

  return {
    user,
    loginProcessing,
    loginSuccessful,
    errorMsg,
    registerUser,
    signInUser,
  };
});
