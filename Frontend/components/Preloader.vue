<template>
  <div>
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
  </div>
</template>

<script lang="ts">
export default {};
</script>

<style scoped lang="less">
@import '../variables.less';

.dot {
  @animation-speed: 1000ms;
  @dot-size: 10px;
  width: @dot-size;
  height: @dot-size;
  border: (@dot-size / 5) solid @login-button;
  border-radius: 50%;
  float: left;
  margin: 0 (@dot-size / 2);
  transform: scale(0);
  .animation();
  &:nth-child(2) {
    .animation(@animation-speed * 0.3);
  }
  &:nth-child(3) {
    .animation(@animation-speed * 0.6);
  }
}

.animation(@delay: 0ms) {
  animation: fx @animation-speed ease infinite @delay;
}

@keyframes fx {
  50% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
