import { useUserStore } from '../stores/store';

export default defineNuxtRouteMiddleware((to, from) => {
  const userStore = useUserStore();

  const isAuthenticated = userStore.user != null ? false : true;

  if (!isAuthenticated) {
    return navigateTo('/login');
  }
});
