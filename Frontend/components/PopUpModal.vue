<template>
  <div ref="popUpModalBackdrop" class="popup-modal-backdrop"></div>
  <div class="popup-modal-container">
    <div class="popup-modal">
      <font-awesome-icon icon="fa-regular fa-circle-xmark" />
      <div class="popup-modal-title"></div>
    </div>
  </div>
</template>

<script lang="ts">
import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';

export default {
  components: {
    VueCropper,
  },

  setup() {
    const popUpModalBackdrop = ref<HTMLElement | null>(null);

    onMounted(() => {
      setTimeout(function () {
        popUpModalBackdrop.value &&
          popUpModalBackdrop.value.classList.add(
            'popup-modal-backdrop-fade-in',
          );
      }, 0);
    });

    return {
      popUpModalBackdrop,
    };
  },
};
</script>

<style scoped lang="less">
@import '../variables.less';

.popup-modal-backdrop {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: @black;
  transition: opacity 0.35s;
  opacity: 0;
  pointer-events: none;

  &-fade-in {
    opacity: 0.5;
  }
}

.popup-modal-container {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  pointer-events: none;

  .popup-modal {
    border-radius: 8px;
    height: 600px;
    width: 400px;
    background: @primary-background-gradient;
    margin-bottom: 96px;

    &-title {
      color: @white;
    }
  }
}
</style>
