<template>
  <div class="card">
    <div class="card-interior-container">
      <div class="title-container">
        <span class="card-title">{{ cardTitle }}</span>
      </div>
      <div v-if="cardIsLarge" class="large-content-container">
        <div v-if="isLinkedCard">
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
            <span class="data-point">80.3%</span>
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
  background-color: rgba(255, 255, 255, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.16);
}

.card-interior-container {
  display: flex;
  flex-direction: column;
  padding: 12px;
  color: @white;

  .card-title {
    font-weight: bold;
  }

  .large-content-container {
    .data-container {
      display: flex;
      flex-direction: column;
      margin-top: 8px;

      .data-point {
        font-size: 56px;
        line-height: 56px;
        font-weight: bold;
      }
    }

    .graph-container {
      height: 128px;
      margin-top: 32px;
      border: blue solid 1px;
    }

    .linked-card-graph-container {
      height: 128px;
      margin-top: 16px;
      border: blue solid 1px;
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
      justify-content: space-between;

      .data-point-container {
        display: flex;
        flex-direction: column;

        .data-point {
          margin: 16px 0 8px 0;
          font-size: 32px;
          font-weight: bold;
        }

        .data-label {
          font-size: 12px;
        }
      }
    }
  }
}
</style>
