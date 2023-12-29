<style lang="scss" scoped>
.wechat-pay {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background: #fff;
  box-shadow: 0rpx -10rpx 20rpx #eeeeee;
  display: flex;
  flex-direction: column;
  .protocol {
    display: flex;
    border-bottom: 2rpx solid #f2f2f7;
    padding: 20rpx 30rpx;
    box-sizing: border-box;
    font-size: 26rpx;
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
  .price-info {
    display: flex;
    align-items: center;
    padding: 20rpx 30rpx;
    flex: 1;
    .left {
      width: 50vw;

      .top {
        font-size: 26rpx;
        font-weight: 400;
        span:first-child {
          color: #8d8285;
          margin-right: 20rpx;
        }
        span:last-child {
          color: #49d2b2;
        }
      }

      .bottom {
        span:first-child {
          font-size: 26rpx;
          font-weight: 400;
          color: #8d8285;
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

  ::v-deep {
    u-popup {
      .pricePopup {
        height: 38vh;
        padding: 50rpx;
        box-sizing: border-box;

        .title {
          font-size: 32rpx;
          font-weight: 550;
          text-align: center;
        }
        .content {
          & > div {
            display: flex;
            justify-content: space-between;
            margin-top: 20rpx;
            span:nth-child(1) {
              font-size: 26rpx;
              font-weight: 400;
              color: #6e757a;
            }
            span:nth-child(2) {
              font-size: 30rpx;
              font-weight: bold;
              color: #333333;
            }
          }
        }
      }

      .releaseAgreementPopup {
        height: 50vh;
        padding: 20rpx;
        box-sizing: border-box;
      }
    }
  }
}
</style>

<template>
  <div class="wechat-pay" :style="{ height: payWrapHeight }">
    <div class="protocol" v-if="protocol">
      <div class="radio" @click="() => (isAgree = !isAgree)">
        <img
          :src="
            require(`../../static/images/offer/${
              isAgree ? 'radio-selected' : 'radio'
            }.png`)
          "
          alt=""
        />
        <span>同意</span>
      </div>
      <span class="link" @click="onShowReleaseAgreementPopup">
        《宠小皮发布协议》
      </span>
    </div>
    <div class="price-info">
      <div class="left">
        <div class="top">
          <span>总计¥ {{ price.sum_price }}</span>
          <span
            @click="
              () => {
                priceDetailPopupVisble = true;
              }
            "
          >
            价格明细
            <u-icon name="arrow-right" color="#49d2b2" size="24" />
          </span>
        </div>
        <div class="bottom">
          <span>{{ protocol ? "下单支付" : "剩余待付" }}</span>
          <span>
            ¥ {{ protocol ? price.deposit_price : price.final_price }}
          </span>
        </div>
      </div>
      <u-button shape="circle" type="primary" @click="onCallPay">
        支付
      </u-button>
    </div>
    <u-popup v-model="priceDetailPopupVisble" border-radius="20" mode="bottom">
      <div class="pricePopup">
        <div class="title">价格明细</div>
        <div class="content">
          <div>
            <span>商家报价：</span>
            <span>¥{{ price.quotation_price }}</span>
          </div>
          <div>
            <span>保险价格：</span>
            <span>¥{{ price.insure_price }}</span>
          </div>
          <div>
            <span>笼具价格：</span>
            <span>¥{{ price.cage_price }}</span>
          </div>
          <div>
            <span>托运费用：</span>
            <span>¥{{ price.deposit_price }}</span>
          </div>
          <div>
            <span>剩余待付：</span>
            <span>¥{{ price.final_price }}</span>
          </div>
          <div>
            <span>总付金额：</span>
            <span>¥{{ price.sum_price }}</span>
          </div>
        </div>
      </div>
    </u-popup>
    <u-popup
      mode="center"
      border-radius="20"
      v-model="releaseAgreementPopupVisible"
    >
      <div class="releaseAgreementPopup">
        <div v-html="releaseAgreementContent"></div>
      </div>
    </u-popup>
  </div>
</template>

<script>
import {
  getPayParamsRes,
  getReleaseAgreementRes,
  getFinalPayParamsRes,
} from "@/api";
export default {
  name: "WechatPay",

  props: {
    protocol: {
      type: Boolean,
      default: false,
    },
    price: {
      type: Object,
      default: () => ({}),
    },
    params: {
      type: Object,
      default: () => ({}),
    },
  },

  computed: {
    payWrapHeight() {
      /**
       * 总价：商家报价（100）+笼具（30）+保险（20）
       * 定金：100 * 0.1 = 10
       * 尾款: 150 - 10
       */
      return this.protocol ? "220rpx" : "150rpx";
    },
  },

  data() {
    return {
      isAgree: false,
      priceDetailPopupVisble: false,
      releaseAgreementPopupVisible: false,
      releaseAgreementContent: false,
    };
  },

  methods: {
    async callWechatPay() {
      if (this.protocol && !this.isAgree) {
        return this.toast("请先勾选宠小皮发布协议");
      }
      const { transport_id, order_number } = this.params;
      const data = this.protocol
        ? await getPayParamsRes({
            transport_id,
            order_number,
          })
        : await getFinalPayParamsRes({
            order_number,
          });
      wx.requestPayment({
        ...data,
        success: (res) => {
          console.log("用户支付扣款成功", res);
          this.navTo(
            this.protocol
              ? `/pages/order/ensure?transport_id=${transport_id}&order_number=${order_number}`
              : `/pages/order/result?order_number=${order_number}`
          );
        },
        fail(res) {
          console.log("用户支付扣款失败", res);
        },
      });
    },
    onCallPay() {
      this.$u.debounce(this.callWechatPay, 500);
    },
    async onShowReleaseAgreementPopup() {
      const data = await getReleaseAgreementRes();
      this.releaseAgreementContent = data;
      this.releaseAgreementPopupVisible = true;
    },
  },
};
</script>
