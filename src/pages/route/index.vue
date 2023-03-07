<style lang="scss" scoped>
.route-wrap {
  padding: 40rpx;
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
      margin: 50rpx auto 0;

      &_layer {
        width: 100%;
        height: 300rpx;
        padding-left: 50rpx;
        box-sizing: border-box;
        position: relative;
        display: flex;
        flex-direction: column;

        &_title {
          display: flex;
          flex-direction: column;
          height: 150rpx;

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
          top: 0;
          width: 20rpx;
          height: 20rpx;
          background: #ccc;
          border-radius: 50%;
        }

        &.isArrived {
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

        &.isIn {
          &::before {
            background: #158edc;
          }
        }

        .extra-info {
          flex: 1;
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
            margin-top: 20rpx;
          }

          img {
            width: 46rpx;
            height: 46rpx;
            position: absolute;
            top: 170rpx;
            left: -25rpx;
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
            j < 2 ? 'isArrived' : '',
            j === 2 ? 'isIn' : '',
          ]"
        >
          <div class="route-content_layer_title">
            <span>{{ station.name }}</span>
            <span>{{ station.traintime }}</span>
          </div>
          <div class="extra-info" v-if="j === 2">
            <img src="../../static/images/route/icon-car.png" alt="" />
            <div class="arrive-info">
              <div class="arrive-car">
                <span>预计10分钟到达下一站</span>
                <span>车牌号：苏B 23893</span>
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
      const data = await getStaffRouteInfoByRouteIdRes(1);
      this.rawRouteInfos = data;
      this.routeInfo = data[0];
      console.log(this.routeInfo);
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
    this.getStaffRouteInfo();
  },
};
</script>
