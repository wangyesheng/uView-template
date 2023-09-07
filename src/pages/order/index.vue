<style lang="scss" scoped>
.order {
  width: 100vw;
  min-height: 100vh;
  position: relative;

  ::v-deep {
    .u-tabs {
      background-color: #4b4f54;
      background: transparent !important;

      .u-tab-bar {
        background-color: #49d2b2 !important;
      }
    }
  }

  &-inner {
    padding: 30rpx;
    box-sizing: border-box;

    .order-layer {
      width: 100%;
      background: #ffffff;
      border-radius: 16rpx;
      margin-bottom: 20rpx;
      padding: 30rpx 20rpx;
      box-sizing: border-box;

      .header {
        font-size: 32rpx;
        font-weight: 400;
        color: #2f2f2f;
        margin-bottom: 30rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;

        span:last-child {
          display: inline-block;
          font-size: 26rpx;
          font-weight: 400;
          color: #333333;
          position: relative;

          &::before {
            content: "";
            width: 10rpx;
            height: 10rpx;
            border-radius: 50%;
            background: #3fb67a;
            position: absolute;
            left: -20rpx;
            top: 50%;
            transform: translateY(-50%);
          }
        }
      }

      .address {
        display: flex;
        align-items: center;
        margin-bottom: 30rpx;
        span {
          font-size: 30rpx;
          margin-left: 40rpx;
        }
        img {
          width: 44rpx;
          height: 16rpx;
          margin-left: 40rpx;
        }
      }

      .info {
        margin-bottom: 30rpx;
        ::v-deep {
          .u-col {
            font-size: 28rpx;
            font-weight: 400;
            span:first-child {
              color: #989898;
            }
            span:last-child {
              color: #333;
            }
          }
        }
      }

      .time {
        display: flex;
        border-bottom: 2rpx solid #efefef;
        padding-bottom: 20rpx;

        ::v-deep {
          u-icon {
            align-self: flex-start;
          }
        }
        .right {
          margin-left: 20rpx;
          font-size: 28rpx;
          font-weight: 400;
          span:first-child {
            color: #989898;
          }
          span:last-child {
            color: #333;
          }
        }
      }

      .footer {
        padding-top: 20rpx;

        .right {
          text-align: right;

          ::v-deep {
            .u-btn {
              margin-left: 10rpx;
            }
          }
        }
      }
    }
  }

  .nodata {
    margin-top: 20vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 26rpx;
    font-weight: 400;
    color: #aeb5c4;
    img {
      width: 196rpx;
      height: 128rpx;
      margin-bottom: 20rpx;
    }
  }
}
</style>

<template>
  <div class="order">
    <u-tabs
      active-color="#4B4F54"
      inactive-color="#626D7D"
      :font-size="28"
      :bar-width="70"
      :active-item-style="{
        fontSize: '16px',
        fontWeight: 'blod',
      }"
      :list="orderOptions"
      :is-scroll="false"
      :current="activeOrderIndex"
      @change="onActiveOrderChange"
    />
    <div class="order-inner" v-if="orders && orders.length > 0">
      <div class="order-layer" v-for="order in orders" :key="order.order_id">
        <div class="header">
          <span>{{ order.pet_name }}</span>
          <span>{{ getOrderStatus(order) }}</span>
        </div>
        <div class="address">
          <u-icon name="map-fill" color="#00B7AF" size="32" />
          <span>{{ order.start_city }}{{ order.start_area }}</span>
          <img src="../../static/images/traffic-arrow.png" alt="" />
          <span>{{ order.arrive_city }}{{ order.arrive_area }}</span>
        </div>
        <div class="info">
          <u-row gutter="16">
            <u-col span="6">
              <span>数量：</span>
              <span>{{ order.pet_number }}</span>
            </u-col>
            <u-col span="6">
              <span>重量：</span>
              <span>{{ order.pet_weight }}</span>
            </u-col>
          </u-row>
        </div>
        <div class="time">
          <u-icon name="clock-fill" color="#3FB67A" size="32" />
          <div class="right">
            <div>
              <span>出发时间：</span>
              <span>{{ order.start_date }}</span>
            </div>
            <div v-if="order.order_status == 7">
              <span>送达时间：</span>
              <span>{{ order.start_date }}</span>
            </div>
          </div>
        </div>
        <div class="footer">
          <div class="right">
            <u-button
              plain
              shape="circle"
              size="mini"
              @click="onNavToOrderDetails(order)"
            >
              订单详情
            </u-button>
            <u-button
              plain
              shape="circle"
              size="mini"
              v-if="order.order_status > 1 && order.order_status < 3"
              @click="onRefund(order)"
            >
              退定金
            </u-button>
            <u-button
              plain
              shape="circle"
              size="mini"
              v-if="order.order_status == 1 && order.is_pay_deposit == 0"
              @click="onNavToOrderDetails(order)"
            >
              付定金
            </u-button>
            <u-button
              plain
              shape="circle"
              size="mini"
              v-if="order.order_status == 4 && order.is_pay_balance == 0"
              @click="onNavToOrderDetails(order)"
            >
              付尾款
            </u-button>
            <u-button
              plain
              shape="circle"
              size="mini"
              v-if="order.order_status == 6"
              @click="onFollow(order)"
            >
              行程追踪
            </u-button>
            <u-button
              plain
              shape="circle"
              size="mini"
              v-if="order.order_status == 6"
              @click="onConfirmOrder(order)"
            >
              确认收货
            </u-button>
            <u-button
              plain
              shape="circle"
              size="mini"
              v-if="order.order_status == 7"
              @click="onNavToAfterSales(order)"
            >
              申请售后
            </u-button>
          </div>
        </div>
      </div>
    </div>
    <div class="nodata" v-else>
      <img src="../../static/images/nodata-large.png" alt="" />
      <span>暂无订单数据</span>
    </div>
  </div>
</template>

<script>
import {
  getOrdersRes,
  refundRes,
  confirmOrderRes,
  getApplyAfterSalesRes,
} from "@/api";

export default {
  name: "Order",

  data() {
    return {
      orderOptions: [
        {
          name: "待报价",
          status: 0,
        },
        {
          name: "待揽收",
          status: 2,
        },
        {
          name: "待发货",
          status: 4,
        },
        {
          name: "待收货",
          status: 6,
        },
        {
          name: "已完成",
          status: 7,
        },
        {
          name: "已取消",
          status: 8,
        },
      ],
      activeOrderIndex: 0,
      orders: [],
    };
  },

  methods: {
    onActiveOrderChange(index) {
      this.activeOrderIndex = index;
      this.currentOrderStatus = this.orderOptions[index].status;
      this.getOrders(this.currentOrderStatus);
    },
    async getOrders(order_status) {
      const data = await getOrdersRes({
        order_status,
      });
      this.orders = data;
    },
    getOrderStatus(order) {
      let status;
      if (order.order_status == 0) {
        status = "待报价";
      } else if (order.order_status == 1) {
        status = "待付定金";
      } else if (order.order_status == 2) {
        status = "待商家确认";
      } else if (order.order_status == 3) {
        status = "待商家揽件";
      } else if (order.order_status == 4) {
        status = "待付尾款";
      } else if (order.order_status == 5) {
        status = "待发货";
      } else if (order.order_status == 6) {
        status = "待收货";
      } else if (order.order_status == 7) {
        status = "已完成";
      } else if (order.order_status == 8) {
        status = "已退定金";
      } else if (order.order_status == 9) {
        status = "已取消";
      }
      return status;
    },
    async onRefund(order) {
      uni.showModal({
        title: "提示",
        content: "确定要退定金吗？",
        confirmText: "确定",
        success: async ({ confirm }) => {
          if (confirm) {
            await refundRes({
              order_number: order.order_number,
            });
            this.getOrders(order.order_status);
          }
        },
      });
    },
    onNavToOrderDetails(order) {
      if (order.order_status == 0) {
        this.navTo(`/pages/order/merchant?order_number=${order.order_number}`);
      } else if (order.order_status == 1) {
        this.navTo(
          `/pages/order/pay-deposit?order_number=${order.order_number}&transport_id=${order.provider_id}`
        );
      } else if (order.order_status == 2 || order.order_status == 3) {
        this.navTo(
          `/pages/order/ensure?order_number=${order.order_number}&transport_id=${order.provider_id}`
        );
      } else if (order.order_status == 4) {
        this.navTo(
          `/pages/order/pay-final?order_number=${order.order_number}&transport_id=${order.provider_id}`
        );
      } else if (order.order_status == 5 || order.order_status == 6) {
        this.navTo(`/pages/order/result?order_number=${order.order_number}`);
      } else if (order.order_status == 7) {
        this.navTo(`/pages/order/result?order_number=${order.order_number}`);
      } else if (order.order_status == 8 || order.order_status == 9) {
        this.navTo(`/pages/order/detail?order_number=${order.order_number}`);
      }
    },
    onFollow(order) {
      this.navTo(`/pages/route/preview?order_number=${order.order_number}`);
    },
    async onConfirmOrder(order) {
      uni.showModal({
        title: "提示",
        content: "确定要确认收货吗？",
        confirmText: "确定",
        success: async ({ confirm }) => {
          if (confirm) {
            await confirmOrderRes(order.order_number);
            this.getOrders(order.order_status);
          }
        },
      });
    },
    async onNavToAfterSales(order) {
      const data = await getApplyAfterSalesRes(order.order_number);
      if (data && data.after_sale_id) {
        this.navTo(`/pages/order/apply-result?data=${JSON.stringify(data)}`);
      } else {
        this.navTo(
          `/pages/order/after-sales?order_number=${order.order_number}`
        );
      }
    },
  },

  onLoad({ index }) {
    if (index) {
      index = Number(index);
      this.activeOrderIndex = index;
      this.currentOrderStatus = this.orderOptions[index].status;
    }
  },

  onShow() {
    this.getOrders(this.currentOrderStatus || 0);
  },
};
</script>
