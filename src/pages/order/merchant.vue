<style lang="scss" scoped>
.merchant {
  width: 100vw;
  min-height: 100vh;
  background: #f7f8fa;
  padding: 30rpx;
  box-sizing: border-box;

  .merchant-inner {
    &-layer {
      margin-top: 20rpx;
      height: 360rpx;
      background: #ffffff;
      border-radius: 16rpx;
      display: flex;

      .left {
        width: 30vw;
        height: 100%;

        image {
          width: 100%;
          height: 100%;
          border-top-left-radius: 16rpx;
          border-bottom-left-radius: 16rpx;
        }
      }

      .right {
        width: 70vw;
        padding: 30rpx;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .name {
          font-size: 32rpx;
          font-weight: bold;
          color: #333333;
        }

        .phone {
          color: #6e757a;
          font-weight: 400;
          font-size: 26rpx;

          span:last-child {
            color: #49d2b2;
            font-weight: 550;
          }
        }

        .license-merchant {
          display: flex;
          font-size: 24rpx;
          font-weight: 400;
          color: #6e757a;
          div {
            display: flex;
            align-items: center;
            margin-right: 20rpx;
            img {
              width: 42rpx;
              height: 34rpx;
              margin-right: 5rpx;
            }
          }
        }

        .info {
          font-size: 26rpx;
          font-weight: 400;
          color: #6e757a;
          span {
            padding: 0 15rpx;
          }

          span:first-child {
            // border-right: 2rpx solid #6e757a;
            padding-left: 0;
          }
        }

        .tags {
          ::v-deep {
            u-tag {
              margin-right: 10rpx;
            }
          }
        }

        .price {
          display: flex;
          align-items: center;
          justify-content: space-between;

          .current {
            font-size: 32rpx;
            font-weight: 400;
            color: #e42323;
          }

          .raw {
            font-size: 24rpx;
            font-weight: 400;
            color: #cdcdcd;
            text-decoration: line-through;
          }

          ::v-deep {
            button {
              height: 68rpx !important;
              line-height: 68rpx !important;
              padding: 0 20rpx !important;
            }
          }
        }
      }
    }
  }

  .nodata {
    margin-top: 50rpx;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 26rpx;
    font-weight: 400;
    color: #aeb5c4;
    img {
      width: 386rpx;
      height: 298rpx;
      margin-bottom: 20rpx;
    }
  }
}
</style>

<template>
  <div class="merchant">
    <StepWithOrderInfo
      ref="stepWithOrderRef"
      :stepIndex="0"
      :orderNumber="orderNumber"
    />
    <div class="merchant-inner" v-if="merchants && merchants.length > 0">
      <div
        class="merchant-inner-layer"
        v-for="item in merchants"
        :key="item.transport_id"
      >
        <div class="left">
          <image mode="aspectFill" :src="item.transport_image" alt="" />
        </div>

        <div class="right">
          <h3 class="name">{{ item.transport_nick }}</h3>
          <div class="license-merchant">
            <div class="license" v-if="item.is_available == 1">
              <img src="../../static/images/offer/license.png" alt="" />
              <span>已审证照</span>
            </div>
            <div v-if="item.is_local == 1">
              <img src="../../static/images/offer/merchant.png" alt="" />
              <span>本地商家</span>
            </div>
          </div>
          <div class="info">
            <span>{{ `已提供${item.service_times}次服用` }}</span>
            <!-- <span>好评率：95%</span> -->
          </div>

          <div class="tags">
            <u-tag
              size="mini"
              mode="plain"
              type="warning"
              v-for="tag in item.transport_tags"
              :key="tag"
              :text="tag"
            />
          </div>
          <div class="price">
            <span class="current">¥{{ item.quotation_price }}</span>
            <span class="raw">原价：¥{{ item.quotation_old_price }}</span>
            <u-button
              shape="circle"
              type="primary"
              @click="
                navTo(
                  `/pages/order/pay-deposit?transport_id=${item.transport_id}&order_number=${orderNumber}`
                )
              "
            >
              选这家
            </u-button>
          </div>
        </div>
      </div>
    </div>
    <div class="nodata" v-else>
      <img src="../../static/images/no-merchant.png" alt="" />
      <span>暂无商家报价</span>
    </div>
  </div>
</template>

<script>
import StepWithOrderInfo from "@/components/StepWithOrderInfo";
import { getMerchantsRes } from "@/api";

export default {
  name: "Merchant",

  components: {
    StepWithOrderInfo,
  },

  data() {
    return {
      orderNumber: null,
      merchants: [],
    };
  },

  methods: {
    async getMerchants() {
      const data = await getMerchantsRes(this.orderNumber);
      this.merchants = data;
    },
  },

  onLoad(options) {
    this.orderNumber = options.order_number || "O202308221107338043399662";
  },

  onShow() {
    this.$refs.stepWithOrderRef.getOrderInfo(this.orderNumber);
    this.getMerchants();
  },
};
</script>
