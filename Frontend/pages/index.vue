<template>
  <div></div>
</template>

<script>
export default {
  setup() {
    definePageMeta({
      middleware: 'auth',
    });
  },
};
</script>
