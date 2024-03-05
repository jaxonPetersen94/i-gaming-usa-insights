<template>
  <div class="container">
    <div class="card">
      <div class="card-interior-container">
        <span class="card-title">
          <font-awesome-icon icon="fa-solid fa-gear" />Account
        </span>
        <hr class="line-break" />
        <div class="content-container">
          <div class="user-profile-icon">
            <font-awesome-icon icon="fa-solid fa-user" />
          </div>
          <div class="inputs-container"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts"></script>

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

        svg {
          font-size: 40px;
          margin-right: 8px;
          transform: translateY(-2px);
        }
      }

      .content-container {
        border: yellow dashed 1px;
        margin: 12px 16px 0 16px;

        .user-profile-icon {
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

        .inputs-container {
        }
      }
    }
  }
}
</style>
