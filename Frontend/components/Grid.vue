<template>
  <div class="wrapper">
    <div class="grids-container">
      <div class="grid grid-large">
        <div class="card-slot"><Card cardTitle="Conversions" /></div>
        <div class="card-slot"><Card cardTitle="Conversion rate" /></div>
        <div class="card-slot"><Card cardTitle="Sessions" /></div>
        <div class="card-slot"><Card :isLinkedCard="true" /></div>
        <div class="card-slot"><Card :isLinkedCard="true" /></div>
        <div class="card-slot"><Card :isLinkedCard="true" /></div>
      </div>
      <div class="grid grid-small">
        <div class="card-slot">
          <Card cardTitle="Stickiness - 7 day" :cardIsLarge="false" />
        </div>
        <div class="card-slot">
          <Card cardTitle="Engagement - 7 day" :cardIsLarge="false" />
        </div>
        <div class="card-slot">
          <Card cardTitle="Bounce rate - 7 day" :cardIsLarge="false" />
        </div>
        <div class="card-slot">
          <Card cardTitle="User locations - live" :cardIsLarge="false" />
        </div>
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
  max-width: 1280px;
  min-width: 768px;
  .grids-container {
    display: grid;
    grid-template-columns: 3fr 1fr;
    gap: 14px;

    .grid {
      display: grid;
      gap: 14px;

      &-large {
        grid-template-columns: 2fr 2fr 2fr;
        grid-template-rows: repeat(1, 0fr);
      }

      &-small {
        grid-template-columns: 4fr;
      }

      .card-slot {
        user-select: none;
      }
    }
  }
}
</style>
