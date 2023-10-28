<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'iGamingUSA-Insights',
};
</script>

<style lang="less">
@import './variables.less';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
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
</style>
