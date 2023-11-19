<template>
  <div ref="formBox" class="form-box">
    <div class="form-box-title">
      <h2 ref="formTitleText" class="form-title-text">{{ formType }}</h2>
      <h2 @mouseup="toggleFormType" class="opposite-form-text">
        {{ getOppositeFormTypeText }}?
      </h2>
    </div>
    <Form class="veeValidateForm">
      <div
        class="inputs-container"
        :class="{
          'inputs-container-override': formTypeIsRegister,
          'inputs-container-final': landedAtRegisterPage,
        }"
      >
        <div
          class="input-box"
          :class="{
            'input-box-register-first': !landedAtRegisterPage,
            'input-box-register-first-override':
              formTypeIsRegister && !landedAtRegisterPage,
          }"
        >
          <Field
            name="firstName"
            type="text"
            class="inputField"
            v-model="registerFormData.firstName"
            required
          />
          <label>First Name</label>
        </div>
        <div
          class="input-box"
          :class="{
            'input-box-register': !landedAtRegisterPage,
            'input-box-register-override':
              formTypeIsRegister && !landedAtRegisterPage,
          }"
        >
          <Field
            name="lastName"
            type="text"
            class="inputField"
            v-model="registerFormData.lastName"
            required
          />
          <label>Last Name</label>
        </div>
        <div class="input-box">
          <Field
            name="email"
            type="text"
            class="inputField"
            :rules="validateEmail"
            :value="getUsernameOrEmailValue"
            @input="updateUsernameEmail"
            required
          />
          <label ref="usernameEmailText">
            {{ usernameOrEmail }}
          </label>
        </div>
        <div class="input-box">
          <Field
            name="password"
            type="password"
            class="inputField"
            :value="getPasswordValue"
            @input="updatePassword"
            required
          />
          <label>Password</label>
        </div>
        <div
          class="input-box"
          :class="{
            'input-box-register-last': !landedAtRegisterPage,
            'input-box-register-last-override':
              formTypeIsRegister && !landedAtRegisterPage,
            'input-box-register-last-final': landedAtRegisterPage,
          }"
        >
          <Field
            name="confirmPassword"
            type="password"
            class="inputField"
            v-model="registerFormData.confirmPassword"
            required
          />
          <label>Confirm Password</label>
        </div>
      </div>
      <div
        class="submit-forgot-container"
        :class="{
          'submit-forgot-container-override': formTypeIsRegister,
          'submit-forgot-container-final': landedAtRegisterPage,
        }"
      >
        <div class="submit-btn-container">
          <a v-if="!loginProcessing" ref="submitButton" @mouseup="handleSubmit">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Submit
          </a>
          <Preloader v-else />
        </div>
        <span
          class="forgot-password"
          :class="{
            'forgot-password-fade-out': formTypeIsRegister,
            'forgot-password-fade-in': shouldFadeInForgotPassword,
          }"
          >Forgot password?</span
        >
      </div>
    </Form>
  </div>
</template>

<script lang="ts">
import { ref, onMounted, computed } from 'vue';
import Preloader from '@/components/Preloader.vue';
import TextScramble from '@/utilities/TextScrambler';
import type {
  RegisterUserForm,
  RegisterUserPostRequest,
  SignInUserForm,
} from '@/types/User/types';
import { Form, Field, ErrorMessage } from 'vee-validate';

export default {
  components: {
    Preloader,
    Form,
    Field,
  },
  setup() {
    const formBox = ref<HTMLElement | null>(null);
    const submitButton = ref<HTMLElement | null>(null);
    const formTitleText = ref<HTMLElement | null>(null);
    const usernameEmailText = ref<HTMLElement | null>(null);

    const formType = ref('Login');
    const usernameOrEmail = ref('Username');

    const formTransitionOccuring = ref(false);
    const landedAtRegisterPage = ref(false);
    const landedAtLoginPage = ref(false);
    const registerPageVisited = ref(false);

    const signInFormData = ref<SignInUserForm>({
      username: '',
      password: '',
    });

    const registerFormData = ref<RegisterUserForm>({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    });

    let formTitleTextScramble: TextScramble;
    let usernameEmailTextScramble: TextScramble;

    onMounted(() => {
      if (formTitleText.value) {
        formTitleTextScramble = new TextScramble(formTitleText.value);
      }
      if (usernameEmailText.value) {
        usernameEmailTextScramble = new TextScramble(usernameEmailText.value);
      }
    });

    const toggleFormType = () => {
      if (!registerPageVisited.value) {
        registerPageVisited.value = true;
      }

      if (!formTransitionOccuring.value) {
        formType.value = formType.value === 'Login' ? 'Register' : 'Login';
        usernameOrEmail.value =
          usernameOrEmail.value === 'Username' ? 'Email' : 'Username';
        applyScrambleTextEffect(formTitleTextScramble, formType.value);
        applyScrambleTextEffect(
          usernameEmailTextScramble,
          usernameOrEmail.value,
        );
        if (formBox.value) {
          formTransitionOccuring.value = true;
          if (formType.value === 'Register') {
            formBox.value.classList.add('register-override');
          } else {
            landedAtRegisterPage.value = false;
            formBox.value.classList.remove('register-override');
          }
          formBox.value.addEventListener('transitionend', handleTransitionEnd);
        }
      }
    };

    const handleTransitionEnd = (event: any) => {
      if (formBox.value && event.target === formBox.value) {
        formTransitionOccuring.value = false;
        if (formType.value === 'Register') {
          landedAtRegisterPage.value = true;
          landedAtLoginPage.value = false;
        } else {
          landedAtLoginPage.value = true;
        }
        formBox.value.removeEventListener('transitionend', handleTransitionEnd);
      }
    };

    const applyScrambleTextEffect = (
      textScrambleInstance: TextScramble,
      newText: string,
    ) => {
      if (textScrambleInstance) {
        textScrambleInstance.setText(newText);
      }
    };

    const handleSubmit = async (values: any) => {
      // if (submitButton.value) {
      //   console.log('values =', values);
      //   submitButton.value.classList.add('submit-btn-animate-out');
      //   submitButton.value.addEventListener(
      //     'transitionend',
      //     () => {
      //       submitButton.value!.classList.remove('submit-btn-animate-out');
      //       store.state.user.loginProcessing = true;
      //     },
      //     { once: true },
      //   );
      //   if (formType.value === 'Register') {
      //     const newUser: RegisterUserPostRequest = {
      //       firstName: registerFormData.value.firstName,
      //       lastName: registerFormData.value.lastName,
      //       email: registerFormData.value.email,
      //       password: registerFormData.value.password,
      //     };
      //     store.dispatch('registerUser', newUser);
      //   } else {
      //     store.dispatch('signInUser', signInFormData.value);
      //   }
      // }
    };

    const formTypeIsRegister = computed(() => {
      return formType.value === 'Register';
    });

    const shouldFadeInForgotPassword = computed(() => {
      return (
        formType.value === 'Login' &&
        registerPageVisited.value &&
        !landedAtLoginPage.value
      );
    });

    const loginProcessing = computed(() => {
      // return store.state.user.loginProcessing;
      return false;
    });

    const getOppositeFormTypeText = computed(() => {
      return formType.value === 'Login' ? 'Register' : 'Login';
    });

    const getUsernameOrEmailValue = computed(() =>
      formTypeIsRegister.value
        ? registerFormData.value.email
        : signInFormData.value.username,
    );

    const getPasswordValue = computed(() =>
      formTypeIsRegister.value
        ? registerFormData.value.password
        : signInFormData.value.password,
    );

    const updateUsernameEmail = (event: any) => {
      if (formTypeIsRegister.value) {
        registerFormData.value.email = event.target.value;
      } else {
        signInFormData.value.username = event.target.value;
      }
    };

    const updatePassword = (event: any) => {
      if (formTypeIsRegister.value) {
        registerFormData.value.password = event.target.value;
      } else {
        signInFormData.value.password = event.target.value;
      }
    };

    const validateEmail = (value: any) => {
      if (!value) {
        return 'This field is required';
      }
      const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      if (!regex.test(value)) {
        return 'This field must be a valid email';
      }
      return true;
    };

    return {
      formBox,
      submitButton,
      formTitleText,
      usernameEmailText,
      formType,
      usernameOrEmail,
      formTransitionOccuring,
      landedAtRegisterPage,
      landedAtLoginPage,
      registerPageVisited,
      signInFormData,
      registerFormData,
      toggleFormType,
      handleSubmit,
      formTypeIsRegister,
      shouldFadeInForgotPassword,
      loginProcessing,
      getOppositeFormTypeText,
      getUsernameOrEmailValue,
      getPasswordValue,
      updateUsernameEmail,
      updatePassword,
      validateEmail,
    };
  },
};
</script>

<style lang="less" scoped>
@import '../variables.less';

.form-box {
  display: flex;
  flex-direction: column;
  user-select: none;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 400px;
  padding: 40px 40px 0px 40px;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.5);
  box-sizing: border-box;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.6);
  border-radius: 10px;
  height: 384px;
  transition: height 0.7s ease-in-out;

  h2 {
    margin: 0;
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

.register-override {
  height: 524px;
}

.form-box-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  margin: 0 0 30px 0;

  .form-text-container {
    display: flex;
    justify-content: center;
    flex: 1;
  }

  .form-title-text {
    flex: 1;
  }

  .opposite-form-text {
    position: absolute;
    right: 0;

    font-size: 14px;
    font-weight: normal;
    opacity: 60%;
    color: @white;
    transition: opacity 0.3s;

    &:hover {
      opacity: 100%;
    }
  }
}

.veeValidateForm {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.inputs-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  flex: 1;
  max-height: 138px;
  transition: max-height 0.7s ease-in-out;

  &-override {
    max-height: 276px;
  }

  &-final {
    justify-content: flex-start;
  }
}

.submit-forgot-container {
  margin-top: auto;
  height: 95px;
  margin-bottom: 40px;
  transition: margin-bottom 0.7s ease-in-out, height 0.7s ease-in-out;

  &-override {
    margin-bottom: 0px;
    height: 68px;
  }
}

.submit-btn-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 40px;
  margin-bottom: 32px;
}

.submit-btn-animate-out {
  opacity: 0;
  transition: opacity 0.3s, transform 0.3s !important;
  pointer-events: none;
}

.forgot-password {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  color: @white;
  opacity: 60%;
  transition: opacity 0.3s;

  &:hover {
    opacity: 100%;
    transition: opacity 0.3s ease-in-out !important;
  }

  &-fade-out {
    pointer-events: none;
    transition: opacity 0.35s ease-in-out;
    opacity: 0;
  }

  &-fade-in {
    transition: opacity 0.35s ease-in-out !important;
    transition-delay: 0.3s !important;
  }
}

.form-box .input-box {
  position: relative;
  user-select: none;

  .inputField {
    display: block;
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

  &-register-first {
    transition: opacity 0.35s;
    pointer-events: none;
    opacity: 0;

    &-override {
      transition-delay: 0.5s;
      opacity: 1;
    }
  }

  &-register {
    transition: opacity 0.35s;
    transition-delay: 0.25s;
    pointer-events: none;
    opacity: 0;

    &-override {
      opacity: 1;
    }
  }

  &-register-last {
    position: absolute;
    transform: translateY(100%);
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.35s;
    width: 320px;

    &-override {
      transition-delay: 0.375s;
      opacity: 1;
    }

    &-final {
      position: relative;
    }
  }
}

.inputField:focus ~ label,
.inputField:valid ~ label {
  top: -20px;
  left: 0;
  color: @login-button;
  font-size: 12px;
}

.form-box a:hover {
  background: @login-button;
  color: @white;
  border-radius: 5px;
  box-shadow: 0 0 4px @login-button, 0 0 8px @login-button,
    0 0 16px @login-button, 0 0 32px @login-button-alt;
}

.form-box a span {
  position: absolute;
  display: block;
}

.form-box a span:nth-child(1) {
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

.form-box a span:nth-child(2) {
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

.form-box a span:nth-child(3) {
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

.form-box a span:nth-child(4) {
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
@/stores/UserStore/userStore
