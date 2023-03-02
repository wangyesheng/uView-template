<style lang="scss" scoped>
.order-wrap {
  min-height: 100vh;
  position: relative;
  background: #f9f9fd;
  padding: 30rpx;
  box-sizing: border-box;

  .order-content {
    width: 100%;
    background: #fff;
    border-radius: 34rpx;
    padding: 48rpx 36rpx 18rpx;
    margin-bottom: 30rpx;
    position: relative;

    &_inner {
      .status {
        position: absolute;
        top: 20rpx;
        right: 36rpx;
        color: #aaa;
        font-weight: bold;
        font-size: 24rpx;
      }
    }

    &_layer {
      font-size: 30rpx;
      font-weight: 400;
      margin-bottom: 16rpx;

      .__label {
        color: #3e3e4b;
      }
      .__value {
        color: #84848c;
      }
    }

    &-footer {
      margin-top: 38rpx;
      overflow: hidden;
      .action {
        float: right;
        display: flex;
      }
      ::v-deep {
        [class^="u-btn"] {
          width: 128rpx;
          height: 50rpx;
          font-size: 22rpx;
        }
        .u-btn--primary {
          background: #3199e2;
          margin-left: 16rpx;
        }

        .u-primary-hover {
          background: #0e7bc9 !important;
        }

        .u-btn--default {
          background: #f2f2f2;
          color: #3e3e4b;
          &::after {
            border-color: #f2f2f2 !important;
          }
        }

        .u-default-hover {
          background: #e0e0e0 !important;
          color: #3e3e4b !important;
        }
      }
    }
  }
}
</style>

<template>
  <div class="order-wrap">
    <div class="order-content" v-for="item in orders" :key="item.id">
      <div :class="['order-content_inner']">
        <div class="order-content_layer">
          <span class="__label">免税店：</span>
          <span class="__value">{{ item.point_name }}</span>
        </div>
        <div class="order-content_layer">
          <span class="__label">乘车站：</span>
          <span class="__value">{{ item.start_station }}</span>
        </div>
        <div class="order-content_layer">
          <span class="__label">时间：</span>
          <span class="__value">
            {{ item.reserve_date }} {{ item.reserve_time }}
          </span>
        </div>
        <div class="order-content_layer">
          <span class="__label">预约人数：</span>
          <span class="__value">{{ item.number }}</span>
        </div>
        <div class="order-content_layer">
          <span class="__label">班次：</span>
          <span class="__value">{{ item.schedule_name }}</span>
        </div>
        <span class="status" :style="{ color: item._statusMap.color }">
          {{ item._statusMap.label }}
        </span>
      </div>
      <div class="order-content-footer" v-if="item.status == 0">
        <div class="action">
          <u-button shape="circle" @click="cancelReserve(item.id)">
            取消预约
          </u-button>
          <u-button
            shape="circle"
            type="primary"
            @click="navTo(`/pages/order/edition?reserve_id=${item.id}&from=2`)"
          >
            修改
          </u-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getReservesRes, cancelReserveRes } from "@/api";

export default {
  name: "Order",

  data() {
    return {
      orders: [],
    };
  },

  methods: {
    async getReserves() {
      const data = await getReservesRes();
      this.orders = data.map((x) => ({
        ...x,
        _statusMap: {
          label:
            x.status == 0 ? "等待中..." : x.status == 1 ? "已完成" : "已取消",
          color: x.status == 0 ? "#1FAE8E" : "#AAA",
        },
      }));
    },
    async cancelReserve(reserve_id) {
      uni.showModal({
        title: "提示",
        content: `确定要取消预约吗？`,
        success: async (res) => {
          if (res.confirm) {
            await cancelReserveRes(reserve_id);
            this.getReserves();
          }
        },
      });
    },
  },

  onShow() {
    this.getReserves();
  },
};
</script>
