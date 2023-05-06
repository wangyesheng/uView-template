<style lang="scss" scoped>
.route-wrap {
  padding: 40rpx 40rpx 100rpx;
  box-sizing: border-box;
  position: relative;
  .select-wrap {
    .select-item {
      height: 90rpx;
      background: #f8f9fb;
      border-radius: 8rpx;
      padding-left: 34rpx;
      padding-right: 42rpx;
      margin-bottom: 20rpx;
      display: flex;
      align-items: center;

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

      &-hover {
        background: #f2f2f3;
      }
    }
  }

  .route-inner {
    .route-header {
      padding: 30rpx 0;
      border-bottom: 2rpx solid #eeeeee;
      font-size: 32rpx;
      font-weight: bold;
      color: #42ba87;
      display: flex;
      align-items: center;
      margin-bottom: 40rpx;

      img {
        width: 30rpx;
        height: 36rpx;
        margin-right: 16rpx;
      }
    }

    .route-content {
      width: 88%;
      display: flex;
      flex-direction: column;
      border-left: 2rpx solid #ccc;
      margin: 40rpx auto 0;
      position: relative;

      &::before {
        content: "";
        position: absolute;
        top: 0;
        left: -10rpx;
        width: 20rpx;
        height: 20rpx;
        background: #158edc;
        border-radius: 50%;
      }

      &_layer {
        width: 100%;
        height: 320rpx;
        padding-left: 50rpx;
        box-sizing: border-box;
        position: relative;
        display: flex;
        flex-direction: column;

        &_title {
          display: flex;
          flex-direction: column;
          position: absolute;
          left: 50rpx;
          bottom: -60rpx;

          span {
            &:first-child {
              font-size: 32rpx;
              font-weight: bold;
              color: #484848;
              margin-bottom: 10rpx;
            }

            &:last-child {
              font-size: 28rpx;
              color: #919191;
            }
          }
        }

        &::before {
          content: "";
          position: absolute;
          left: -10rpx;
          bottom: 0;
          width: 20rpx;
          height: 20rpx;
          background: #ccc;
          border-radius: 50%;
        }

        &.isArrived {
          height: 200rpx !important;
          &::before {
            background: #158edc;
          }
          &::after {
            content: "";
            position: absolute;
            top: 0;
            left: -2rpx;
            width: 4rpx;
            height: 100%;
            background: #158edc;
          }
        }

        .extra-info {
          position: absolute;
          left: 50rpx;
          top: 70rpx;
          font-size: 28rpx;
          font-weight: 400;
          color: #15d6dc;

          .arrive-info {
            .arrive-car {
              display: flex;
              flex-direction: column;
            }
          }

          .next-station {
            margin-top: 10rpx;
          }

          img {
            width: 46rpx;
            height: 46rpx;
            position: absolute;
            top: 20rpx;
            left: -74rpx;
          }
        }
      }
    }
  }
}
</style>

<template>
  <div class="route-wrap">
    <div class="select-wrap">
      <div
        class="select-item"
        hover-class="select-item-hover"
        hover-stay-time="150"
        @click="select.visible = true"
      >
        <div class="left">
          <span>
            {{ select.selectValue ? select.selectValue : "请选择班次" }}
          </span>
        </div>
        <u-icon
          color="#000"
          name="arrow-down-fill"
          :custom-style="{ width: '32rpx', height: '16rpx' }"
        />
      </div>
    </div>
    <div class="route-inner">
      <div class="route-header">
        <img src="../../static/images/home/icon-title.png" alt="" />
        <span>{{ routeInfo.name }}</span>
      </div>
      <div class="route-content">
        <div
          v-for="(station, j) in routeInfo.items"
          :key="`${station.id}_${j}`"
          :class="[
            'route-content_layer',
            station.is_pass === 1 ? 'isArrived' : '',
          ]"
        >
          <div class="route-content_layer_title">
            <span>{{ station.name }}</span>
            <span>{{ station.traintime }}</span>
          </div>
          <div class="extra-info" v-if="station.arrive_time !== 0">
            <img src="../../static/images/route/icon-car.png" alt="" />
            <div class="arrive-info">
              <div class="arrive-car">
                <span>
                  {{
                    station.arrive_time
                  }}（预计到达时间仅供参考，请提前到达车站等候，以发车时刻表为准）
                </span>
                <span>车牌号：{{ station.vehicle_code }}</span>
                <span> </span>
              </div>
            </div>
            <div class="next-station">下一站</div>
          </div>
        </div>
      </div>
    </div>
    <u-select
      v-model="select.visible"
      :default-value="select.defaultIndex"
      :list="select.data"
      @confirm="onSelectConfirm"
    />
  </div>
</template>

<script>
import { getStaffRouteInfoByRouteIdRes } from "@/api";

export default {
  data() {
    return {
      rawRouteInfos: [],
      routeInfo: [],
      select: {
        visible: false,
        defaultIndex: [0],
        selectValue: "",
        data: [],
      },
    };
  },

  methods: {
    async getStaffRouteInfo() {
      const data = await getStaffRouteInfoByRouteIdRes(this.id);
      this.rawRouteInfos = data;
      this.routeInfo = data[0];
      // this.routeInfo.items[3].arrive_time = "预计20min到达下一站";
      // this.routeInfo.items[0].is_pass = 1;
      // this.routeInfo.items[1].is_pass = 1;
      // this.routeInfo.items[2].is_pass = 1;
      this.select.selectValue = this.routeInfo.name;
      this.select.data = data.map((x, i) => ({
        label: x.name,
        value: i,
      }));
    },

    onSelectConfirm([{ label, value }]) {
      this.select.selectValue = label;
      this.select.defaultIndex = [value];
      this.routeInfo = this.rawRouteInfos.find(
        (x, i) => x.name === label && i === value
      );
    },
  },

  onLoad({ id }) {
    this.id = id;
    this.getStaffRouteInfo();
  },
};
</script>
