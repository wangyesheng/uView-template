<style lang="scss" scoped>
.store {
  padding-top: 54rpx;
  padding-left: 34rpx;
  padding-right: 30rpx;
  &-inner {
    background: #f0f1f3;
    border-radius: 8rpx;
    display: flex;
    align-items: center;
    height: 90rpx;
    padding-left: 38rpx;
    padding-right: 56rpx;

    .left {
      width: 90%;
      display: flex;
      align-items: center;
      margin-right: auto;

      img {
        width: 44rpx;
        height: 40rpx;
        margin-right: 16rpx;
      }

      span {
        font-size: 26rpx;
        font-weight: bold;
        color: #383846;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        display: inline-block;
        width: calc(100% - 60rpx);
      }
    }
  }
}

.timeline {
  margin-top: 54rpx;
  padding: 0 90rpx;
  box-sizing: border-box;

  ::v-deep {
    .u-time-axis::before {
      border-left: 1px solid #158edc;
      border-left-color: #158edc;
    }
    .u-time-axis-node {
      background-color: #158edc;
      .u-dot {
        width: 20rpx;
        height: 20rpx;
        background: #158edc;
      }
    }

    .u-order-desc {
      font-size: 32rpx;
      font-weight: bold;
      color: #484848;
    }

    .u-order-time {
      font-size: 26rpx;
      font-weight: 400;
      color: #868686;
      margin-top: 8rpx;
    }
  }
}
</style>

<template>
  <app-layout background="#f9f9fd">
    <div class="store">
      <div class="store-inner">
        <div class="left">
          <img src="../../static/images/home/icon-store.png" alt="" />
          <span> 选择免税店 </span>
        </div>
        <u-icon
          name="arrow-down-fill"
          color="#000"
          :custom-style="{ width: '32rpx', height: '16rpx' }"
        />
      </div>
    </div>
    <div class="timeline">
      <u-time-line>
        <u-time-line-item v-for="i in 5" :key="i">
          <template v-slot:content>
            <view>
              <view class="u-order-desc">海口亚特国际会议中心酒店</view>
              <view class="u-order-time">时间：09:20</view>
            </view>
          </template>
        </u-time-line-item>
      </u-time-line>
    </div>
  </app-layout>
</template>

<script>
export default {
  data() {
    return {};
  },

  computed: {
    sysHeight() {
      console.log(this.getSysHeight());
      return this.getSysHeight();
    },
  },

  onLoad() {},
};
</script>
