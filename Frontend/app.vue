<template>
  <div>
    <NuxtPage />
  </div>
</template>

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
