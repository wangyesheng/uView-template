<template>
  <div class="result">
    <StepWithOrderInfo ref="stepWithOrderRef" :stepIndex="4">
      <template slot="status">
        <div class="result-inner">
          <img
            :src="
              require(`../../static/images/${
                orderInfo.order_status == 7 ? 'success' : 'wait'
              }.png`)
            "
            alt=""
          />
          <span>{{ getStatus() }}</span>
        </div>
      </template>
    </StepWithOrderInfo>
  </div>
</template>

<script>
import StepWithOrderInfo from "@/components/StepWithOrderInfo";
export default {
  name: "OrderResult",
  components: {
    StepWithOrderInfo,
  },
  data() {
    return {
      order_number: null,
      orderInfo: {},
    };
  },
  methods: {
    getStatus() {
      let status;
      if (this.orderInfo.order_status == 5) {
        status = "等待商家发货...";
      } else if (this.orderInfo.order_status == 6) {
        status = "等待送达...";
      } else if (this.orderInfo.order_status == 7) {
        status = "已送达";
      }
      return status;
    },
  },
  async onLoad(options) {
    this.order_number = options.order_number || "O2023082113253045085053084";
    this.orderInfo = await this.$refs.stepWithOrderRef.getOrderInfo(
      this.order_number
    );
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
  &-inner {
    margin-top: 30rpx;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    padding: 50rpx;
    box-sizing: border-box;
    img {
      width: 88rpx;
      height: 88rpx;
      margin-bottom: 20rpx;
    }
    span {
      color: #6e757a;
      font-size: 28rpx;
    }
  }
}
</style>
