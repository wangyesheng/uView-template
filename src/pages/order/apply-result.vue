<template>
  <div class="result">
    <div class="status">
      <img
        :src="
          require(`../../static/images/${reviewStatus.value || 'wait'}.png`)
        "
        alt=""
      />
      <span>{{ reviewStatus.label || "待审核" }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "apply-result",

  data() {
    return {
      applyInfo: {},
    };
  },

  computed: {
    reviewStatus() {
      let scope = {};
      if (this.applyInfo.status == 0) {
        scope.value = "wait";
        scope.label = "待审核";
      } else if (this.applyInfo.status == 1) {
        scope.value = "success";
        scope.label = `已通过，退款${this.applyInfo.refund_amount}元将在3个工作日原路退回`;
      } else if (this.applyInfo.status == 2) {
        scope.value = "reject";
        scope.label = "已拒绝";
      }
      return scope;
    },
  },

  async onLoad({ data }) {
    if (data) {
      data = JSON.parse(data);
      this.applyInfo = data;
    }
  },
};
</script>

<style lang="scss" scoped>
.result {
  width: 100vw;
  min-height: 100vh;
  padding: 30rpx;
  box-sizing: border-box;
  position: relative;
  .status {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 30rpx;
    box-sizing: border-box;
    margin-top: 20vh;

    img {
      width: 176rpx;
      height: 176rpx;
    }

    span {
      color: #6e757a;
      font-size: 30rpx;
      margin-top: 50rpx;
    }
  }
}
</style>
