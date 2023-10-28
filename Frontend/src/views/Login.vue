<template>
  <div class="login-box">
    <h2>Login</h2>
    <form>
      <div class="user-box">
        <input type="text" name="" required="" />
        <label>Username</label>
      </div>
      <div class="user-box">
        <input type="password" name="" required="" />
        <label>Password</label>
      </div>
      <div class="submit-btn-container">
        <a v-if="!loginProcessing" ref="submitButton" @mouseup="handleMouseUp">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Submit
        </a>
        <Preloader v-else />
      </div>
    </form>
    <span class="forgot-password">Forgot password?</span>
  </div>
</template>

<script>
import Preloader from '../components/Preloader.vue';

export default {
  components: {
    Preloader,
  },
  data() {
    return {
      loginProcessing: false,
    };
  },
  methods: {
    handleMouseUp() {
      const submitButton = this.$refs.submitButton;
      submitButton.classList.add('submit-btn-animate-out');
      submitButton.addEventListener(
        'transitionend',
        () => {
          this.loginProcessing = true;
          submitButton.classList.remove('submit-btn-animate-out');
        },
        { once: true },
      );
    },
  },
};
</script>

<style lang="less" scoped>
@import '../variables.less';

.login-box {
  user-select: none;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 400px;
  min-height: 384px;
  padding: 40px;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.5);
  box-sizing: border-box;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.6);
  border-radius: 10px;

  h2 {
    margin: 0 0 30px;
    padding: 0;
    color: @white;
    text-align: center;
    user-select: none;
  }

  form a {
    display: inline-block;
    position: relative;
    padding: 10px 20px;
    color: @login-button;
    font-size: 16px;
    text-decoration: none;
    text-transform: uppercase;
    overflow: hidden;
    letter-spacing: 4px;
    cursor: pointer;
    transition: 0.5s;

    &:active {
      transition: transform 0.2s;
      transform: scale(0.9);
    }
  }
}

.submit-btn-container {
  display: flex;
  height: 64px;
  justify-content: center;
  align-items: center;
  margin-bottom: 24px;
}

.submit-btn-animate-out {
  opacity: 0;
  transform: scale(1);
  pointer-events: none;
}

.forgot-password {
  color: @white;
  opacity: 60%;
  transition: opacity 0.3s;
  // margin-top: 16px;

  &:hover {
    opacity: 100%;
  }
}

.login-box .user-box {
  position: relative;
  user-select: none;

  input {
    width: 100%;
    padding: 10px 0;
    font-size: 16px;
    color: @white;
    margin-bottom: 30px;
    border: none;
    border-bottom: 1px solid @white;
    outline: none;
    background: transparent;
    cursor: default;
  }

  label {
    position: absolute;
    top: 0;
    left: 0;
    padding: 10px 0;
    font-size: 16px;
    color: @white;
    pointer-events: none;
    transition: 0.5s;
    user-select: none;
  }
}

.login-box .user-box input:focus ~ label,
.login-box .user-box input:valid ~ label {
  top: -20px;
  left: 0;
  color: @login-button;
  font-size: 12px;
}

.login-box a:hover {
  background: @login-button;
  color: @white;
  border-radius: 5px;
  box-shadow:
    0 0 4px @login-button,
    0 0 8px @login-button,
    0 0 16px @login-button,
    0 0 32px @button-alt;
}

.login-box a span {
  position: absolute;
  display: block;
}

.login-box a span:nth-child(1) {
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

.login-box a span:nth-child(2) {
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

.login-box a span:nth-child(3) {
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

.login-box a span:nth-child(4) {
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
</style>
