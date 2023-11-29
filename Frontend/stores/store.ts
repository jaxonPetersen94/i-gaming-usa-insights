import { defineStore } from 'pinia';
import type { RegisterUserPostRequest } from '../types/User/types';

export const useUserStore = defineStore('user', () => {
  const user = ref(0);
  const loginProcessing = ref(false);
  const loginSuccessful = ref(false);

  async function registerUser(newUser: RegisterUserPostRequest) {
    loginProcessing.value = true;

    const CONSTS_API_USER_REGISTER = 'https://localhost:5000/api/register';
    const { error, data: responseData } = await useFetch(
      CONSTS_API_USER_REGISTER,
      {
        method: 'post',
        body: newUser,
      },
    );

    if (error) {
      loginSuccessful.value = false;
      console.log('register error =', error);
    } else {
      loginSuccessful.value = true;
      console.log('responseData =', responseData);
    }

    loginProcessing.value = false;
  }

  async function signInUser(user: any) {
    loginProcessing.value = true;

    const CONSTS_API_USER_LOGIN = 'https://localhost:5000/api/register';
    const { error, data: responseData } = await useFetch(
      CONSTS_API_USER_LOGIN,
      {
        method: 'get',
        body: user,
      },
    );

    if (error) {
      loginSuccessful.value = false;
      console.log('login error =', error);
    } else {
      loginSuccessful.value = true;
      console.log('responseData =', responseData);
    }

    loginProcessing.value = false;
  }

  return { user, loginProcessing, loginSuccessful, registerUser, signInUser };
});
