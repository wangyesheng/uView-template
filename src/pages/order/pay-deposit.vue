<style lang="scss" scoped>
.deposit {
  width: 100vw;
  min-height: 100vh;
  padding: 30rpx;
  box-sizing: border-box;
  position: relative;

  .merchant {
    height: 546rpx;
    background: #ffffff;
    border-radius: 16rpx;
    margin-top: 30rpx;
    display: flex;
    flex-direction: column;

    &-inner {
      padding: 40rpx;
      box-sizing: border-box;
      .info {
        display: flex;
        image {
          width: 148rpx;
          height: 148rpx;
          border-radius: 16rpx;
        }
        div {
          margin-left: 30rpx;
          flex: 1;
          display: flex;
          flex-direction: column;

          span:nth-child(1) {
            font-size: 32rpx;
            font-weight: bold;
            color: #333333;
          }
          span:nth-child(2) {
            margin-top: 30rpx;
            font-size: 26rpx;
            font-weight: 400;
            color: #6e757a;
          }
        }
      }

      .feat {
        margin-top: 30rpx;
        display: flex;
        justify-content: space-between;
        &-layer {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 134rpx;
          height: 134rpx;
          background: #f7f9f9;
          border-radius: 12rpx;
          font-size: 24rpx;
          font-weight: 400;
          color: #9b9fa5;
          img {
            width: 74rpx;
            height: 62rpx;
          }
        }
      }
    }

    &-refund {
      flex: 1;
      background: #fdfeec;
      display: flex;
      align-items: center;
      padding: 20rpx;
      box-sizing: border-box;

      .left {
        flex: 1;
        display: flex;
        div {
          font-size: 22rpx;
          font-weight: 400;
          color: #a0711e;
          margin-left: 20rpx;
        }
      }

      .rule {
        align-self: flex-end;
        width: 118rpx;
        height: 44rpx;
        line-height: 44rpx;
        text-align: center;
        border-radius: 22rpx;
        border: 2rpx solid #a0711e;
        font-size: 22rpx;
        font-weight: 400;
        color: #a0711e;
      }
    }
  }

  .footer {
    position: fixed;
    left: 0;
    bottom: 0;
    height: 220rpx;
    width: 100%;
    background: #fff;
    box-shadow: 0rpx -10rpx 20rpx #eeeeee;
    .protocol {
      display: flex;
      border-bottom: 2rpx solid #f2f2f7;
      padding: 20rpx 30rpx;
      box-sizing: border-box;
      font-size: 24rpx;
      font-weight: 400;
      color: #8d8285;
      .link {
        color: #68d279;
      }
      .radio {
        display: flex;
        align-items: center;
        img {
          width: 28rpx;
          height: 28rpx;
          margin-right: 10rpx;
        }
      }
    }
    .deposit-info {
      display: flex;
      align-items: center;
      padding: 20rpx 30rpx;
      .left {
        width: 50vw;

        .top {
          font-size: 24rpx;
          font-weight: 400;
          span:first-child {
            color: #bbb8b9;
            margin-right: 20rpx;
          }
          span:last-child {
            color: #75e3de;
          }
        }

        .bottom {
          span:first-child {
            font-size: 24rpx;
            font-weight: 400;
            color: #bbb8b9;
            margin-right: 20rpx;
          }
          span:last-child {
            font-size: 36rpx;
            font-weight: bold;
            color: #ed1c5a;
          }
        }
      }

      ::v-deep {
        button {
          min-width: 50vw;
          flex-shrink: 0;
        }
      }
    }
  }
}
</style>

<template>
  <div class="deposit">
    <StepWithOrderInfo :stepIndex="1" :hasOrder="false" />
    <div class="merchant">
      <div class="merchant-inner">
        <div class="info">
          <image
            mode="aspectFill"
            :src="merchantPrice.transport_image"
            alt=""
          />
          <div>
            <span>{{ merchantPrice.transport_name }}</span>
            <span>支付定金后立刻与商家建立联系</span>
          </div>
        </div>
        <div class="feat">
          <div class="feat-layer">
            <img src="../../static/images/offer/food.png" alt="" />
            <span>喂食喂水</span>
          </div>
          <div class="feat-layer">
            <img src="../../static/images/offer/video.png" alt="" />
            <span>视频拍摄</span>
          </div>
          <div class="feat-layer">
            <img src="../../static/images/offer/car.png" alt="" />
            <span>车辆空调</span>
          </div>
          <div class="feat-layer">
            <img src="../../static/images/offer/overnight.png" alt="" />
            <span>过夜寄养 </span>
          </div>
        </div>
      </div>
      <div class="merchant-refund">
        <div class="left">
          <u-icon name="info-circle" color="#A0711E" size="28" />
          <div>
            支付订金后如商家不能满足您的出行需求，可全额退款或平台协助更换商家。
          </div>
        </div>
        <div class="rule" @click="onShowRefundRulePopup">退款规则</div>
      </div>
    </div>
    <WechatPay
      protocol
      :price="merchantPrice"
      :params="{
        transport_id,
        order_number,
      }"
    />
    <u-popup v-model="refundRulePopupVisble" border-radius="20" mode="center">
      <div class="redundRulePopup">
        <div v-html="refundRuleContent"></div>
      </div>
    </u-popup>
  </div>
</template>

<script>
import StepWithOrderInfo from "@/components/StepWithOrderInfo";
import WechatPay from "@/components/WechatPay";
import { getMerchantPriceRes, getRefundRuleRes } from "@/api";

export default {
  name: "Deposit",

  components: {
    StepWithOrderInfo,
    WechatPay,
  },

  data() {
    return {
      isAgree: false,
      merchantPrice: {},
      transport_id: null,
      order_number: null,
      refundRulePopupVisble: false,
      refundRuleContent: null,
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
    async onShowRefundRulePopup() {
      const data = await getRefundRuleRes();
      this.refundRuleContent = data;
      this.refundRulePopupVisble = true;
    },
  },

  onLoad(options) {
    this.transport_id = options.transport_id || 1;
    this.order_number = options.order_number || "O2023081615132795826987269";
    this.getMerchantPrice();
  },
};
</script>
