<template>
  <div class="card">
    <div class="card-interior-container">
      <div class="title-container">
        <span class="card-title">{{ cardTitle }}</span>
      </div>
      <div v-if="cardIsLarge" class="large-content-container">
        <div v-if="isLinkedCard" class="linked-card-container">
          <div class="linked-card-graph-container"></div>
        </div>
        <div v-else>
          <div class="data-container">
            <span class="data-point">229</span>
            <span class="data-label">past 7 days</span>
          </div>
          <div class="graph-container"></div>
        </div>
      </div>
      <div v-else class="small-content-container">
        <div class="data-container">
          <div class="data-point-container">
            <span class="data-point"
              >80.3<span class="data-point-symbol">%</span></span
            >
            <span class="data-label">New users</span>
          </div>
          <div class="data-point-container">
            <span class="data-point">1.14</span>
            <span class="data-label">Sessions per user</span>
          </div>
        </div>
        <div class="graph-container"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    cardTitle: {
      type: String,
      default: 'by medium',
    },
    cardIsLarge: {
      type: Boolean,
      default: true,
    },
    isLinkedCard: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped lang="less">
@import '../variables.less';

.card {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: rgba(0, 0, 0, 0.5);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
  border-radius: 8px;

  .card-interior-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 12px;
    color: @white;

    .card-title {
      font-size: 18px;
      font-weight: bold;
    }

    .large-content-container {
      height: 100%;

      .data-container {
        display: flex;
        flex-direction: column;
        margin-top: 8px;

        .data-point {
          font-size: 56px;
          line-height: 56px;
          font-weight: bold;
        }

        .data-label {
          font-size: 18px;
        }
      }

      .graph-container {
        height: 128px;
        margin-top: 32px;
      }

      .linked-card-container {
        display: flex;
        flex-direction: column;
        height: 100%;

        .linked-card-graph-container {
          flex: 1;
          margin-top: 16px;
        }
      }
    }

    .small-content-container {
      display: flex;
      flex-direction: column;
      flex: 1;
      justify-content: center;

      .data-container {
        display: flex;
        flex-direction: row;
        justify-content: space-around;

        .data-point-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          margin-bottom: 16px;

          .data-point {
            margin: 20px 0 0px 0;
            font-size: 32px;
            font-weight: bold;

            &-symbol {
              font-size: 20px;
            }
          }

          .data-label {
            font-size: 16px;
          }
        }
      }
    }
  }
}
</style>
