<style lang="scss" scoped>
.ensure {
  width: 100vw;
  min-height: 100vh;
  padding: 30rpx;
  padding-bottom: 180rpx;
  box-sizing: border-box;
  position: relative;

  .footer {
    position: fixed;
    left: 0;
    bottom: 0;
    height: 150rpx;
    width: 100%;
    background: #fff;
    box-shadow: 0rpx -10rpx 20rpx #eeeeee;
    display: flex;
    align-items: center;
    justify-content: center;

    ::v-deep {
      u-button {
        min-width: 80%;
      }
    }
  }
}
</style>

<template>
  <div class="ensure">
    <StepWithOrderInfo :stepIndex="3" :hasOrder="false" />

    <BasicOrderInfo :orderNumber="order_number" />

    <WechatPay
      :price="merchantPrice"
      :params="{
        transport_id,
        order_number,
      }"
    />
  </div>
</template>

<script>
import StepWithOrderInfo from "@/components/StepWithOrderInfo";
import BasicOrderInfo from "@/components/BasicOrderInfo";
import WechatPay from "@/components/WechatPay";
import { getMerchantPriceRes } from "@/api";

export default {
  name: "PayFinal",
  components: {
    StepWithOrderInfo,
    BasicOrderInfo,
    WechatPay,
  },
  data() {
    return {
      order_number: null,
      transport_id: null,
      merchantPrice: {},
    };
  },
  methods: {
    async getMerchantPrice() {
      const data = await getMerchantPriceRes({
        transport_id: this.transport_id,
        order_number: this.order_number,
      });
      this.merchantPrice = data;
    },
  },
  onLoad(options) {
    this.transport_id = options.transport_id;
    this.order_number = options.order_number;
    this.getMerchantPrice();
  },
};
</script>
