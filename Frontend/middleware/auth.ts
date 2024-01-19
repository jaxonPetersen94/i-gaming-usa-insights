import { useUserStore } from '../stores/store';

export default defineNuxtRouteMiddleware((to, from) => {
  const userStore = useUserStore();

  const isAuthenticated = userStore.userIsAuthenticated();

  if (!isAuthenticated) {
    return navigateTo('/login');
  }
});
