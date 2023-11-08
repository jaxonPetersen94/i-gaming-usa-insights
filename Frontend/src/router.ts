import { createRouter, createWebHistory } from 'vue-router';
import Login from './views/Login.vue';
import Dashboard from './views/Dashboard.vue';

const routes = [
  {
    path: '/:page(dashboard)?',
    name: 'Dashboard',
    component: Dashboard,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = false;

  if (to.params.page === 'dashboard' || to.path === '/login') {
    next();
  } else if (!isAuthenticated) {
    next('/login');
  } else {
    next('/dashboard');
  }
});

export default router;
