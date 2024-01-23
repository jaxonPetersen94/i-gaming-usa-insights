<template>
  <div>
    <Grid />
  </div>
</template>

<script lang="ts">
import Grid from '../components/Grid.vue';

definePageMeta({
  middleware: 'auth',
});

export default {
  components: {
    Grid,
  },
};
</script>
