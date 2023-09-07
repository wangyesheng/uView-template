<style lang="scss">
.__wrap {
  .order-info,
  .merchant-info {
    margin-top: 30rpx;
    background: #ffffff;
    border-radius: 16rpx;
    padding: 20rpx;
    box-sizing: border-box;

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20rpx;
      position: relative;
      &::before {
        content: "";
        width: 6rpx;
        height: 100%;
        background: #75e3de;
        position: absolute;
        top: 0;
        left: -20rpx;
        border-radius: 6rpx;
      }
      .title {
        font-size: 30rpx;
        font-weight: bold;
        color: #333;
      }
      .action {
        font-size: 26rpx;
        color: #6e757a;
        span {
          margin-left: 10rpx;
        }
      }

      .merchant-phone {
        font-size: 28rpx;
        color: #20d0c8;
        font-weight: 550;
      }
    }

    .station {
      .start,
      .end {
        display: flex;
        align-items: center;
        margin-bottom: 20rpx;

        .sign {
          width: 10rpx;
          height: 10rpx;
          border-radius: 50%;
          background: #75e3de;
          margin-right: 30rpx;
        }

        .address {
          display: flex;
          flex-direction: column;
          width: 560rpx;
          span {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          span:first-child {
            font-size: 28rpx;
            color: #333;
            margin-bottom: 10rpx;
          }
          span:last-child {
            font-size: 24rpx;
            color: #6e757a;
          }
        }
      }

      .end .sign {
        background: #fd9656 !important;
      }

      img {
        width: 36rpx;
        height: 36rpx;
      }
    }

    .showMore {
      text-align: center;
      color: #75e3de;
      span {
        margin-right: 10rpx;
      }
    }

    .detail {
      &-layer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 28rpx;
        margin-top: 20rpx;
        span:first-child {
          color: #6e757a;
        }
        span:last-child {
          color: #333;
        }
        .link {
          color: #75e3de !important;
        }
      }

      &-photo {
        margin-top: 20rpx;
        div:nth-child(1) {
          font-size: 28rpx;
          color: #6e757a;
        }
        .preview-photos {
          margin-top: 20rpx;
          display: flex;
          flex-wrap: wrap;
          .photo-layer {
            position: relative;
            display: inline-block;
            margin-bottom: 40rpx;

            image {
              width: 120rpx;
              height: 120rpx;
              border-radius: 8rpx;
            }
          }
        }
      }
    }
  }
}
</style>

<template>
  <div class="__wrap">
    <u-steps
      mode="number"
      active-color="#20D0C8"
      un-active-color="#20D0C8"
      :list="stpes"
      :current="stepIndex"
    />
    <slot name="status" />
    <div class="merchant-info" v-if="orderInfo.transport_mobile">
      <h3 class="header">
        <span class="title">商家信息</span>
      </h3>
      <div class="detail">
        <div class="detail-layer">
          <span>商家名称</span>
          <span>{{ orderInfo.transport_nick }}</span>
        </div>
        <div class="detail-layer">
          <span>商家电话</span>
          <span @click="onCallPhone(orderInfo.transport_mobile)">
            {{ orderInfo.transport_mobile }}
          </span>
        </div>
      </div>
    </div>
    <div class="order-info" v-if="hasOrder">
      <h3 class="header">
        <span class="title">订单信息</span>
        <div class="action" v-if="stepIndex < 2">
          <span @click="onCancelOrder">取消托运</span>
          <span
            @click="
              navTo(
                `/pages/order/edition?order_number=${orderInfo.order_number}`
              )
            "
          >
            修改订单
          </span>
        </div>
      </h3>

      <div class="station">
        <div class="start">
          <div class="sign"></div>
          <div class="address">
            <span>{{ orderInfo.start_title }}</span>
            <span>{{ orderInfo.start_location }}</span>
          </div>
        </div>
        <div class="end">
          <div class="sign"></div>
          <div class="address">
            <span>{{ orderInfo.arrive_title }}</span>
            <span>{{ orderInfo.arrive_location }}</span>
          </div>
        </div>
      </div>

      <div class="showMore" @click="onShowMore">
        <span>{{ showMore ? "收起" : "展开" }}</span>
        <u-icon :name="showMore ? 'arrow-up' : 'arrow-down'" />
      </div>
      <div class="detail" v-if="showMore">
        <div class="detail-layer">
          <span>订单编号</span>
          <span>{{ orderInfo.order_number }}</span>
        </div>
        <div class="detail-layer">
          <span>是否上门接宠</span>
          <span>{{ orderInfo.is_home_start == 1 ? "是" : "否" }}</span>
        </div>
        <div class="detail-layer">
          <span>是否送宠到家</span>
          <span>{{ orderInfo.is_home_arrive == 1 ? "是" : "否" }}</span>
        </div>
        <div class="detail-layer">
          <span>出发时间</span>
          <span>{{ orderInfo.start_date }}</span>
        </div>
        <div class="detail-layer">
          <span>宠物名字</span>
          <span>{{ orderInfo.pet_name }}</span>
        </div>
        <div class="detail-layer">
          <span>宠物品种</span>
          <span>{{ orderInfo.pet_category }}</span>
        </div>
        <div class="detail-layer">
          <span>宠物数量</span>
          <span>{{ orderInfo.pet_number }}只</span>
        </div>
        <div class="detail-layer">
          <span>宠物重量</span>
          <span>{{ orderInfo.pet_weight }}</span>
        </div>
        <div class="detail-layer">
          <span>托运方式</span>
          <span>{{ orderInfo.check_type }}</span>
        </div>
        <div class="detail-layer">
          <span>是否有笼具</span>
          <span>{{ orderInfo.cage_have == 1 ? "是" : "否" }}</span>
        </div>
        <div class="detail-layer" v-if="orderInfo.cage_have == 1">
          <span>笼具尺寸</span>
          <span>{{ orderInfo.cage_size }}</span>
        </div>
        <div class="detail-layer" v-if="orderInfo.cage_have == 0">
          <span>是否代买笼具</span>
          <span>{{ orderInfo.is_buy_cage == 1 ? "是" : "否" }}</span>
        </div>
        <div class="detail-layer" v-if="orderInfo.is_buy_cage == 1">
          <span>笼具类型</span>
          <span>{{ orderInfo.cage_category }}</span>
        </div>
        <div class="detail-layer">
          <span>备注</span>
          <span>{{ orderInfo.notes || "-" }}</span>
        </div>
        <div class="detail-photo">
          <div>宠物照片</div>
          <div class="preview-photos">
            <div
              class="photo-layer"
              v-for="(url, index) in orderInfo.pet_pic"
              :key="index"
            >
              <image mode="aspectFill" :src="url" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getOrderInfoRes, cancelOrderRes } from "@/api";

export default {
  name: "StepWithOrderInfo",

  props: {
    stepIndex: {
      type: Number,
      default: 0,
    },
    hasOrder: {
      type: Boolean,
      default: true,
    },
    orderNumber: {
      type: String,
    },
  },

  data() {
    return {
      showMore: false,
      stpes: [
        {
          name: "选择商家",
        },
        {
          name: "支付定金",
        },
        {
          name: "确认行程",
        },
        {
          name: "托管尾款",
        },
        {
          name: "出行送达",
        },
      ],
      orderInfo: {},
    };
  },

  methods: {
    async getOrderInfo(order_number) {
      const data = await getOrderInfoRes(order_number);
      this.orderInfo = data;
      return data;
    },
    onShowMore() {
      this.showMore = !this.showMore;
    },
    onCancelOrder() {
      uni.showModal({
        title: "提示",
        content: "确定要取消托运吗？",
        confirmText: "确定",
        success: async ({ cancel, confirm }) => {
          if (confirm) {
            await cancelOrderRes(this.orderNumber);
            uni.navigateBack({
              delta: 1,
            });
          }
        },
      });
    },
    onCallPhone(phoneNumber) {
      uni.makePhoneCall({
        phoneNumber,
        success: (_) => {},
      });
    },
  },
};
</script>
