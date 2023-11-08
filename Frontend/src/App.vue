<template>
  <!-- <NavBar /> -->
  <router-view></router-view>
</template>

<script>
import NavBar from './components/NavBar.vue';

export default {
  name: 'iGamingUSA-Insights',
  components: {
    NavBar,
  },
};
</script>

<style lang="less">
@import './variables.less';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

html {
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
