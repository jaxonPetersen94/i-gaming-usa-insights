<template>
  <div class="wrapper">
    <div class="grids-container">
      <div class="grid grid-large">
        <div class="card-slot"></div>
        <div class="card-slot"></div>
        <div class="card-slot"></div>
        <div class="card-slot"></div>
        <div class="card-slot"></div>
        <div class="card-slot"></div>
      </div>
      <div class="grid grid-small">
        <div class="card-slot"></div>
        <div class="card-slot"></div>
        <div class="card-slot"></div>
        <div class="card-slot"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Card from '../components/Card.vue';

export default {
  components: {
    Card,
  },
};
</script>

<style scoped lang="less">
.wrapper {
  margin: 48px auto auto auto;
  width: 75%;
  min-width: 792px;
  .grids-container {
    display: grid;
    grid-template-columns: 3fr 1fr;
    gap: 8px;
    padding: 8px;

    .grid {
      background-color: rgba(255, 255, 255, 0.8);
      height: 704px;

      &-large {
        display: grid;
        grid-template-columns: 2fr 2fr 2fr;
        gap: 8px;
      }

      &-small {
        display: grid;
        grid-template-columns: 4fr;
        gap: 8px;
      }

      .card-slot {
        height: 100%;
        background-color: rgba(255, 172, 172, 0.8);
      }
    }
  }
}
</style>
