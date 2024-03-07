<template>
  <div class="container">
    <div class="card">
      <div class="card-interior-container">
        <span class="card-title">
          <font-awesome-icon icon="fa-solid fa-gear" />Account
        </span>
        <hr class="line-break" />
        <div class="content-wrapper">
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
                <Field name="dob" type="text" class="input-field" required />
                <ErrorMessage name="dob" class="form-validation-error-text" />
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
                  name="phoneNumber"
                  type="text"
                  class="input-field"
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
          <div class="save-changes-btn-container" @mouseup="handleSaveChanges">
            <button>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Field, ErrorMessage } from 'vee-validate';
import { useUserStore } from '../stores/store';

export default {
  components: {
    Field,
    ErrorMessage,
  },

  setup() {
    const userStore = useUserStore();
    const user = userStore.user;

    const changeAccountPicture = () => {
      console.log('Open Account Picture change modal!');
    };

    const changePassword = () => {
      console.log('Open Password change modal!');
    };

    const handleSaveChanges = () => {
      console.log('Changes saved!');
    };

    return {
      user,
      changeAccountPicture,
      changePassword,
      handleSaveChanges,
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

      .content-wrapper {
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
        }
      }
    }
  }
}
</style>
