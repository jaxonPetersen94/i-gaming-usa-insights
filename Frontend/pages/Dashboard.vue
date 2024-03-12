<template>
  <Grid />
</template>

<script lang="ts">
import Grid from '../components/Grid.vue';

export default {
  components: {
    Grid,
  },
  setup() {
    definePageMeta({
      middleware: 'auth',
    });
  },
};
</script>
