import { defineStore } from 'pinia';
import { User } from '../types/User/types';

type State = {
  user: User | null;
};

export const UserStore = defineStore('userStore', {
  state: (): State => ({
    user: null,
  }),
  actions: {
    signInUser() {
      console.log('I am attempting to Sign-In User!');
    },
  },
  getters: {
    getUser(state) {
      return state.user;
    },
  },
});
