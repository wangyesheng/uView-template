<template>
  <div class="__wrap">
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
    <div class="basic">
      <div class="basic-layer" v-if="orderInfo.transport_nick">
        <span>商家名称</span>
        <span>{{ orderInfo.transport_nick }}</span>
      </div>
      <div class="basic-layer" v-if="orderInfo.transport_mobile">
        <span>商家电话</span>
        <span @click="onCallPhone(orderInfo.transport_mobile)">
          {{ orderInfo.transport_mobile }}
        </span>
      </div>
      <div class="basic-layer">
        <span>托运类型</span>
        <span>{{ orderInfo.check_type }}</span>
      </div>
      <div class="basic-layer">
        <span>是否上门接宠</span>
        <span>{{ orderInfo.is_home_start == 1 ? "是" : "否" }}</span>
      </div>
      <div class="basic-layer">
        <span>是否送宠到家</span>
        <span>{{ orderInfo.is_home_arrive == 1 ? "是" : "否" }}</span>
      </div>
      <div class="basic-layer">
        <span>出发时间</span>
        <span>{{ orderInfo.start_date }}</span>
      </div>
      <div class="basic-layer">
        <span>宠物名称</span>
        <span>{{ orderInfo.pet_name }}</span>
      </div>
      <div class="basic-layer">
        <span>宠物品种</span>
        <span>{{ orderInfo.pet_category }}</span>
      </div>
      <div class="basic-layer">
        <span>宠物数量</span>
        <span>{{ orderInfo.pet_number }}</span>
      </div>
      <div class="basic-layer">
        <span>是否有笼具</span>
        <span>{{ orderInfo._cage_have }}</span>
      </div>
      <div class="basic-layer" v-if="orderInfo.cage_have == 1">
        <span>笼具尺寸</span>
        <span>{{ orderInfo.cage_size }}</span>
      </div>
      <div class="basic-layer" v-if="orderInfo.cage_have == 0">
        <span>是否代买笼具</span>
        <span>{{ orderInfo._is_buy_cage }}</span>
      </div>
      <div class="basic-layer" v-if="orderInfo.is_buy_cage == 1">
        <span>笼具类型</span>
        <span>{{ orderInfo.cage_category }}</span>
      </div>
      <div class="basic-layer">
        <span>保险</span>
        <span>{{ renderInsuranceLabel }}</span>
      </div>
      <div class="basic-layer">
        <span>备注</span>
        <span>{{ orderInfo.notes || "-" }}</span>
      </div>
    </div>
    <div class="photo">
      <h3>宠物照片</h3>
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
</template>

<script>
import { getOrderInfoRes } from "@/api";
export default {
  name: "BasicOrderInfo",

  props: {
    orderNumber: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      orderInfo: {},
    };
  },

  watch: {
    orderNumber(n) {
      n && this.getOrderInfo(n);
    },
  },

  computed: {
    renderInsuranceLabel() {
      return this.orderInfo.insurance_add_amount === "-"
        ? "不需要"
        : this.orderInfo.insurance_add_amount;
    },
  },

  methods: {
    async getOrderInfo(orderNumber) {
      const data = await getOrderInfoRes(orderNumber);
      this.orderInfo = {
        ...data,
        _cage_have: data.cage_have == 1 ? "是" : "否",
        _is_buy_cage: data.is_buy_cage == 1 ? "是" : "否",
      };
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

<style lang="scss" scoped>
.__wrap {
  .station {
    margin-top: 30rpx;
    background: #fff;
    border-radius: 16rpx;
    padding: 20rpx;
    box-sizing: border-box;
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

  .basic {
    margin-top: 30rpx;
    background: #fff;
    border-radius: 16rpx;

    &-layer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 30rpx 20rpx;
      box-sizing: border-box;

      &:not(:last-child) {
        border-bottom: 2rpx solid #eff1f5;
      }

      span:nth-child(1) {
        font-size: 24rpx;
        font-weight: 400;
        color: #999a9e;
        display: inline-block;
      }

      span:nth-child(2) {
        font-size: 28rpx;
        color: #333333;
        display: inline-block;
        width: 500rpx;
        text-align: right;
      }
    }
  }

  .photo {
    margin-top: 30rpx;
    background: #fff;
    border-radius: 16rpx;
    padding: 20rpx;
    box-sizing: border-box;
    h3 {
      font-size: 28rpx;
      font-weight: 400;
      color: #b5b6b8;
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
</style>
