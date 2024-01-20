<template>
  <div>
    <NavBar v-if="userIsAuthenticated" />
    <NuxtPage />
  </div>
</template>

<script lang="ts">
import { useUserStore } from './stores/store';

export default {
  setup() {
    const userStore = useUserStore();

    const userIsAuthenticated = computed(() => {
      return userStore.loginSuccessful && userStore.user.email;
    });

    return {
      userIsAuthenticated,
    };
  },
};
</script>

<style lang="less">
@import './variables.less';

html {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  background: linear-gradient(
    to bottom right,
    @background-light,
    @background-dark
  );
  background-size: 100% 100%;
  background-attachment: fixed;
}

body {
  margin: 0;
}
</style>
