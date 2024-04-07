import { useUserStore } from '../stores/store';

export default defineNuxtRouteMiddleware(async (to, from) => {
  const userStore = useUserStore();
  const isAuthenticated = userStore.userIsAuthenticated();

  if (!isAuthenticated && to.fullPath !== '/login') {
    return navigateTo('/login');
  }

  if (isAuthenticated && (to.fullPath === '/' || to.fullPath === '/login')) {
    return navigateTo('/dashboard');
  }
});
