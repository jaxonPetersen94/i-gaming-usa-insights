<template>
  <div class="popup-modal-container">
    <div class="popup-modal">
      <font-awesome-icon
        icon="far fa-circle-xmark"
        @click="$emit('closePopUp')"
      />
      <div class="popup-modal-title">Upload Photo</div>
      <div v-bind="getRootProps()" class="drag-and-drop-zone">
        <input v-bind="getInputProps()" />
        <p v-if="false">Drop the files here ...</p>
        <div v-else class="drag-and-drop-zone-empty">
          <p>Drag and drop files here,</p>
          <p>or click to select files</p>
        </div>
      </div>
      <div class="popup-modal-save-button-container">
        <button>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Save
        </button>
      </div>
    </div>
  </div>
  <div ref="popUpModalBackdrop" class="popup-modal-backdrop"></div>
</template>

<script lang="ts">
import { useDropzone } from 'vue3-dropzone';

export default {
  setup() {
    const popUpModalBackdrop = ref<HTMLElement | null>(null);
    const { getRootProps, getInputProps, ...rest } = useDropzone({ onDrop });

    function onDrop(acceptFiles: any, rejectReasons: any) {
      console.log(acceptFiles);
      console.log(rejectReasons);
    }

    onMounted(() => {
      setTimeout(function () {
        popUpModalBackdrop.value &&
          popUpModalBackdrop.value.classList.add(
            'popup-modal-backdrop-fade-in',
          );
      }, 0);
    });

    return {
      getRootProps,
      getInputProps,
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
  z-index: 2;

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
  z-index: 3;

  .popup-modal {
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    width: 400px;
    background: @primary-background-gradient;
    transform: translateY(-120px);
    padding: 24px 64px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);

    svg {
      position: absolute;
      top: 20px;
      right: 20px;
      font-size: 28px;
      color: @white;
      cursor: pointer;
      z-index: 5;
    }

    &-title {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      font-weight: bold;
      color: @white;
      user-select: none;
    }

    .drag-and-drop-zone {
      display: flex;
      margin: 32px 0;
      height: 256px;
      justify-content: center;
      align-items: center;
      background-color: rgba(255, 255, 255, 0.16);
      border-radius: 8px;

      &-empty {
        text-align: center;

        p {
          user-select: none;
          cursor: default;
          color: @white;
          margin: 8px;
        }
      }
    }

    &-save-button-container {
      margin-bottom: 8px;
      text-align: center;

      button {
        display: inline-block;
        position: relative;
        padding: 10px 20px;
        color: @login-button;
        background-color: transparent;
        font-size: 16px;
        text-decoration: none;
        text-transform: uppercase;
        overflow: hidden;
        letter-spacing: 4px;
        border: none;
        cursor: pointer;
        transition: 0.5s;

        &:active {
          transition: transform 0.2s;
          transform: scale(0.9);
        }

        &:hover {
          background: @login-button;
          color: @white;
          border-radius: 4px;
          box-shadow:
            0 0 4px @login-button,
            0 0 8px @login-button,
            0 0 16px @login-button,
            0 0 32px @login-button-alt;
        }

        span {
          position: absolute;
          display: block;
        }

        span:nth-child(1) {
          top: 0;
          left: -100%;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, transparent, @login-button);
          animation: btn-anim1 1s linear infinite;
        }

        @keyframes btn-anim1 {
          0% {
            left: -100%;
          }
          50%,
          100% {
            left: 100%;
          }
        }

        span:nth-child(2) {
          top: -100%;
          right: 0;
          width: 2px;
          height: 100%;
          background: linear-gradient(180deg, transparent, @login-button);
          animation: btn-anim2 1s linear infinite;
          animation-delay: 0.25s;
        }

        @keyframes btn-anim2 {
          0% {
            top: -100%;
          }
          50%,
          100% {
            top: 100%;
          }
        }

        span:nth-child(3) {
          bottom: 0;
          right: -100%;
          width: 100%;
          height: 2px;
          background: linear-gradient(270deg, transparent, @login-button);
          animation: btn-anim3 1s linear infinite;
          animation-delay: 0.5s;
        }

        @keyframes btn-anim3 {
          0% {
            right: -100%;
          }
          50%,
          100% {
            right: 100%;
          }
        }

        span:nth-child(4) {
          bottom: -100%;
          left: 0;
          width: 2px;
          height: 100%;
          background: linear-gradient(360deg, transparent, @login-button);
          animation: btn-anim4 1s linear infinite;
          animation-delay: 0.75s;
        }

        @keyframes btn-anim4 {
          0% {
            bottom: -100%;
          }
          50%,
          100% {
            bottom: 100%;
          }
        }
      }
    }
  }
}
</style>
