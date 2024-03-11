<template>
  <div class="container">
    <div class="card">
      <div class="card-interior-container">
        <span class="card-title">
          <font-awesome-icon icon="fa-solid fa-gear" />Account
        </span>
        <hr class="line-break" />
        <Form ref="form" class="vee-validate-form" @submit="handleSaveChanges">
          <div class="content-container">
            <div class="column">
              <input
                class="account-picture"
                type="button"
                @mouseup="changeAccountPicture"
              />
              <div class="user-account-picture">
                <font-awesome-icon icon="fa-solid fa-user" />
              </div>
              <span class="change-password" @mouseup="changePassword">
                <font-awesome-icon icon="fa-solid fa-key" />Change Password
              </span>
            </div>
            <div class="input-column">
              <div class="input-container">
                <Field
                  name="firstName"
                  type="text"
                  class="input-field"
                  :value="user.firstName"
                  required
                />
                <ErrorMessage
                  name="firstName"
                  class="form-validation-error-text"
                />
                <label>First Name</label>
              </div>
              <div class="input-container">
                <Field
                  ref="dateOfBirthInput"
                  name="date-of-birth"
                  type="text"
                  class="input-field"
                  :value="user.dob"
                  @keypress="handleDateOfBirthInput"
                  @paste="handleDateOfBirthInputPaste"
                  @keydown="handleDateOfBirthBackspace"
                  maxlength="10"
                  required
                />
                <ErrorMessage
                  name="date-of-birth"
                  class="form-validation-error-text"
                />
                <label>Date of Birth</label>
              </div>
              <div class="input-container">
                <Field
                  name="email"
                  type="text"
                  class="input-field"
                  :value="user.email"
                  required
                />
                <ErrorMessage name="email" class="form-validation-error-text" />
                <label>Email</label>
              </div>
            </div>
            <div class="input-column">
              <div class="input-container">
                <Field
                  name="lastName"
                  type="text"
                  class="input-field"
                  :value="user.lastName"
                  required
                />
                <ErrorMessage
                  name="lastName"
                  class="form-validation-error-text"
                />
                <label>Last Name</label>
              </div>
              <div class="input-container">
                <Field
                  ref="phoneNumberInput"
                  name="phoneNumber"
                  type="text"
                  class="input-field"
                  :value="formattedPhoneNumber"
                  @keypress="handlePhoneNumberInput"
                  @paste="handlePhoneNumberInputPaste"
                  @keydown="handlePhoneNumberBackspace"
                  maxlength="14"
                  required
                />
                <ErrorMessage
                  name="phoneNumber"
                  class="form-validation-error-text"
                />
                <label>Phone Number</label>
              </div>
            </div>
          </div>
          <div class="save-changes-btn-container">
            <button v-if="!userUpdateProcessing">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Save Changes
            </button>
            <Preloader v-else />
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Field, Form, ErrorMessage } from 'vee-validate';
import Preloader from '@/components/Preloader.vue';
import { useUserStore } from '../stores/store';
import type { User } from '~/types/User/types';

export default {
  components: {
    Preloader,
    Form,
    Field,
    ErrorMessage,
  },

  setup() {
    const userStore = useUserStore();

    const dateOfBirthInput = ref<HTMLElement | null>(null);
    const phoneNumberInput = ref<HTMLElement | null>(null);

    const changeAccountPicture = () => {
      console.log('Open Account Picture change modal!');
    };

    const changePassword = () => {
      console.log('Open Password change modal!');
    };

    const handleSaveChanges = async (values: any, actions: any) => {
      const updatedUser: User = {
        firebaseUid: user.value.firebaseUid,
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        dob: values['date-of-birth']
          ? values['date-of-birth']
          : user.value.dob
            ? null
            : undefined,
        phoneNumber: values.phoneNumber
          ? `+1${values.phoneNumber.replace(/\D/g, '')}`
          : user.value.phoneNumber
            ? null
            : undefined,
        accessToken: user.value.accessToken,
      };
      await userStore.updateUser(updatedUser);
    };

    const handleDateOfBirthInput = (event: any) => {
      const char = event.key;
      const value = event.target.value;
      let formattedValue = '';

      const charIsDigit = /^\d+$/.test(char);
      if (charIsDigit) {
        const charInt = parseInt(char);
        if (
          (value.length === 0 && charInt > 1) ||
          ((value.length === 2 || value.length === 3) && charInt > 3) ||
          ((value.length === 5 || value.length === 6) && charInt > 2)
        ) {
          event.preventDefault();
          return;
        }
        formattedValue =
          value.length === 2 || value.length === 5 ? value + '-' : value;
      } else if (
        (char === '-' || char === '/') &&
        (value.length === 2 || value.length === 5)
      ) {
        formattedValue = `${value}-`;
        event.preventDefault();
      } else {
        const arrowKeysPressed =
          event.key === 'ArrowLeft' || event.key === 'ArrowRight';
        if (!arrowKeysPressed) {
          event.preventDefault();
          return;
        }
        formattedValue = value;
      }
      event.target.value = formattedValue;
    };

    const handleDateOfBirthInputPaste = (event: any) => {
      event.preventDefault();
      const pastedText = event.clipboardData.getData('text/plain');
      const cleanedDigits = pastedText.replace(/\D/g, '');
      const truncatedDigits = cleanedDigits.slice(0, 8);

      let formattedValue = '';
      for (let i = 0; i < truncatedDigits.length; i++) {
        const char = truncatedDigits[i];

        if (i === 2 || i === 4) {
          formattedValue += '-';
        }

        formattedValue += char;
      }
      event.target.value = formattedValue;
    };

    const handleDateOfBirthBackspace = (event: any) => {
      const value = event.target.value;
      if (event.key === 'Backspace') {
        if (value.length === 3 || value.length === 6) {
          event.target.value = value.slice(0, -1);
        }
      }
    };

    const handlePhoneNumberInput = (event: any) => {
      const char = event.key;
      let value = event.target.value;
      let formattedValue = '';

      const charIsDigit = /^\d+$/.test(char);
      if (charIsDigit) {
        if (value.length === 2) {
          formattedValue = `(${value + char}) `;
          event.preventDefault();
        } else if (value.length === 8) {
          formattedValue = value + char + '-';
          event.preventDefault();
        } else {
          formattedValue = value;
        }
      } else {
        const arrowKeysPressed =
          event.key === 'ArrowLeft' || event.key === 'ArrowRight';
        if (!arrowKeysPressed) {
          event.preventDefault();
          return;
        }
        formattedValue = value;
      }
      event.target.value = formattedValue;
    };

    const handlePhoneNumberInputPaste = (event: any) => {
      event.preventDefault();

      const pastedText = event.clipboardData.getData('text/plain');
      const cleanedDigits = pastedText.replace(/\D/g, '');
      const truncatedDigits = cleanedDigits.slice(0, 10);

      let formattedNumber;
      if (truncatedDigits.length >= 6) {
        formattedNumber = `(${truncatedDigits.slice(
          0,
          3,
        )}) ${truncatedDigits.slice(3, 6)}-${truncatedDigits.slice(6, 10)}`;
      } else if (truncatedDigits.length >= 3) {
        formattedNumber = `(${truncatedDigits.slice(
          0,
          3,
        )}) ${truncatedDigits.slice(3, 6)}`;
      } else {
        formattedNumber = truncatedDigits;
      }
      event.target.value = formattedNumber;
    };

    const handlePhoneNumberBackspace = (event: any) => {
      let value = event.target.value;
      if (event.key === 'Backspace') {
        if (value.length === 6) {
          value = value.slice(0, -2);
          event.target.value = value.slice(1);
        }
        if (value.length === 10) {
          event.target.value = value.slice(0, -1);
        }
      }
    };

    const user = computed(() => {
      return userStore.user;
    });

    const userUpdateProcessing = computed(() => {
      return userStore.userUpdateProcessing;
    });

    const formattedPhoneNumber = computed(() => {
      return user.value.phoneNumber
        ? formatPhoneNumber(user.value.phoneNumber)
        : '';
    });

    function formatPhoneNumber(phoneNumber: string): string | null {
      const numericPhoneNumber = phoneNumber.replace(/\D/g, '');

      if (numericPhoneNumber.length !== 11) {
        console.error('Invalid phone number length');
        return null;
      }
      const areaCode = numericPhoneNumber.substring(1, 4);
      const localNumber = numericPhoneNumber.substring(4);

      const formattedPhoneNumber = `(${areaCode}) ${localNumber.substring(
        0,
        3,
      )}-${localNumber.substring(3)}`;

      return formattedPhoneNumber;
    }

    return {
      dateOfBirthInput,
      phoneNumberInput,
      changeAccountPicture,
      changePassword,
      handleSaveChanges,
      handleDateOfBirthInput,
      handleDateOfBirthInputPaste,
      handleDateOfBirthBackspace,
      handlePhoneNumberInput,
      handlePhoneNumberInputPaste,
      handlePhoneNumberBackspace,
      user,
      userUpdateProcessing,
      formattedPhoneNumber,
    };
  },
};

definePageMeta({
  middleware: 'auth',
});
</script>

<style scoped lang="less">
@import '../variables.less';

.container {
  margin: 48px auto auto auto;
  max-width: 1280px;
  min-width: 768px;

  .card {
    height: 100%;
    display: flex;
    flex-direction: column;
    background: rgba(0, 0, 0, 0.5);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
    border-radius: 10px;

    .card-interior-container {
      display: flex;
      height: 100%;
      padding: 16px 32px;
      flex-direction: column;
      color: @white;
      user-select: none;

      .line-break {
        width: 100%;
        margin: 12px 0;
        border-top: none;
        border-color: @white;
      }

      .card-title {
        display: flex;
        margin: 2px 0 0px 0;
        font-size: 24px;
        font-weight: bold;
        align-items: center;
        user-select: none;

        svg {
          font-size: 40px;
          margin-right: 8px;
          transform: translateY(-2px);
        }
      }

      .vee-validate-form {
        margin: 24px 16px 0 16px;

        .content-container {
          display: grid;
          grid-template-columns: 2fr 4fr 4fr;
          gap: 64px;

          .column {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;

            .account-picture {
              margin: 0;
              position: absolute;
              width: 160px;
              height: 160px;
              border-radius: 50%;
              border-width: 0;
              background-color: transparent;
              cursor: pointer;
              z-index: 999;

              &:active {
                box-shadow: inset 0 0 20px 2px rgb(36, 36, 36);
              }
            }

            .user-account-picture {
              display: flex;
              justify-content: center;
              align-items: center;
              width: 160px;
              height: 160px;
              border-radius: 50%;
              background-color: @gray;
              cursor: pointer;

              svg {
                font-size: 64px;
                color: @white;
              }
            }
          }

          .input-column {
            display: flex;
            flex-direction: column;
            gap: 48px;
            width: 100%;

            .input-container {
              position: relative;
              user-select: none;
              transition: opacity 0.7s;
              transition-delay: 0.35s;

              .input-field {
                width: 100%;
                display: block;
                padding: 10px 0;
                text-indent: 4px;
                font-size: 16px;
                color: @input-text;
                border: none;
                border-bottom: 1px solid @white;
                outline: none;
                border-radius: 0px 16px 0 0;
                box-shadow: inset 0 6px 12px 0 rgba(0, 0, 0, 0.12);
                background-color: transparent;
                cursor: default;

                &:-webkit-autofill {
                  -webkit-background-clip: text;
                  -webkit-text-fill-color: @input-text !important;
                }

                &:focus ~ label,
                &:valid ~ label {
                  top: -25px;
                  left: -4px;
                  color: @login-button;
                  font-size: 12px;
                }
              }

              label {
                position: absolute;
                top: 0;
                left: 0;
                padding: 10px 0 10px 4px;
                font-size: 16px;
                color: @input-text-placeholder;
                pointer-events: none;
                transition: 0.5s;
                user-select: none;
              }
            }
          }
        }

        .change-password {
          display: flex;
          gap: 8px;
          cursor: pointer;
          transform: translateY(48px);
        }

        .save-changes-btn-container {
          display: flex;
          float: right;
          min-height: 40px;
          margin: 16px 0;

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
              border-radius: 5px;
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

          div {
            display: flex;
            align-items: center;
            padding: 0 69.54px;
          }
        }
      }
    }
  }
}
</style>
