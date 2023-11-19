import axios from 'axios';
import { defineStore } from 'pinia';
import type { RegisterUserPostRequest } from '../types/User/types';

export const useUserStore = defineStore('user', () => {
  const user = ref(0);
  const loginProcessing = ref(false);
  const loginSuccessful = ref(false);

  function registerUser(newUser: RegisterUserPostRequest) {
    loginProcessing.value = true;
    axios
      .post('https://localhost:5000/api/register', newUser)
      .then(() => {
        loginSuccessful.value = true;
      })
      .catch((error) => {
        console.error('Error:', error);
      })
      .finally(() => {
        loginProcessing.value = false;
      });
  }

  function signInUser(user: any) {
    axios
      .post('https://localhost:5000/api/login', user)
      .then((response) => {
        console.log('Successfully signed into User!');
        console.log('Response:', response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  return { user, loginProcessing, loginSuccessful, registerUser };
});
