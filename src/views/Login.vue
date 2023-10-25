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
      <a>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        Submit
      </a>
    </form>
    <span>Forgot password?</span>
  </div>
</template>

<script>
export default {
  // Your component's logic goes here
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
    position: relative;
    display: inline-block;
    padding: 10px 20px;
    color: @button;
    font-size: 16px;
    text-decoration: none;
    text-transform: uppercase;
    overflow: hidden;
    transition: 0.5s;
    margin-top: 16px;
    margin-bottom: 32px;
    letter-spacing: 4px;
    cursor: pointer;
  }

  span {
    color: @white;
    opacity: 60%;
    transition: opacity 0.3s;
  }

  span:hover {
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
  color: @button;
  font-size: 12px;
}

.login-box a:hover {
  background: @button;
  color: @white;
  border-radius: 5px;
  box-shadow:
    0 0 4px @button,
    0 0 8px @button,
    0 0 16px @button,
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
  background: linear-gradient(90deg, transparent, @button);
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
  background: linear-gradient(180deg, transparent, @button);
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
  background: linear-gradient(270deg, transparent, @button);
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
  background: linear-gradient(360deg, transparent, @button);
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
