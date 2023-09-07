<style lang="scss" scoped>
.ensure {
  width: 100vw;
  min-height: 100vh;
  padding: 30rpx;
  box-sizing: border-box;
  position: relative;

  .wait-collect {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 30px;
    img {
      width: 92rpx;
      height: 80rpx;
      margin-right: 20rpx;
    }
    span {
      font-size: 32rpx;
      font-weight: bold;
      color: #182133;
    }
  }

  // .footer {
  //   position: fixed;
  //   left: 0;
  //   bottom: 0;
  //   height: 150rpx;
  //   width: 100%;
  //   background: #fff;
  //   box-shadow: 0rpx -10rpx 20rpx #eeeeee;
  //   display: flex;
  //   align-items: center;
  //   justify-content: center;

  //   ::v-deep {
  //     u-button {
  //       min-width: 80%;
  //     }
  //   }
  // }
}
</style>

<template>
  <div class="ensure">
    <StepWithOrderInfo
      ref="stepWithOrderRef"
      :stepIndex="2"
      :orderNumber="order_number"
    >
      <template slot="status">
        <div class="wait-collect">
          <img src="../../static/images/wait-collect.png" alt="" />
          <span>
            {{
              orderInfo.order_status == 2 ? "等待商家确认" : "等待商家揽件"
            }}...
          </span>
        </div>
      </template>
    </StepWithOrderInfo>
  </div>
</template>

<script>
import StepWithOrderInfo from "@/components/StepWithOrderInfo";
export default {
  name: "ensure",
  components: {
    StepWithOrderInfo,
  },
  data() {
    return {
      transport_id: null,
      order_number: null,
      orderInfo: {},
    };
  },
  async onLoad(options) {
    this.transport_id = options.transport_id;
    this.order_number = options.order_number;
    const data = await this.$refs.stepWithOrderRef.getOrderInfo(
      this.order_number
    );
    this.orderInfo = data;
  },
};
</script>
