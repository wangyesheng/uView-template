<style lang="scss" scoped>
.header {
  height: 540rpx;
  background: linear-gradient(
    180deg,
    #148ddc 0%,
    #67c8f9 40%,
    rgba(86, 255, 174, 0) 100%
  );
  padding: 0 30rpx;
  box-sizing: border-box;

  .header-inner {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    ::v-deep {
      .u-swiper-wrap {
        border-radius: 24rpx !important;
      }
    }
    .banner {
      height: 338rpx;
      border-radius: 24rpx;
    }
  }
}
.content {
  margin-top: 40rpx;
  padding: 0 30rpx;
  box-sizing: border-box;

  .order-form-wrap {
    width: 100%;
    background: #fff;
    border-radius: 24rpx;
    padding-top: 46rpx;
    padding-left: 44rpx;
    padding-right: 44rpx;
    padding-bottom: 40rpx;
    box-sizing: border-box;

    .title {
      display: flex;
      align-items: center;
      margin-bottom: 54rpx;

      img {
        width: 30rpx;
        height: 36rpx;
        margin-right: 16rpx;
      }
      span {
        font-size: 32rpx;
        font-weight: bold;
        color: #383846;
        line-height: 44rpx;
      }
    }

    .order-form-item {
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

    .route {
      margin-top: 80rpx;
      &-header {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .left {
          font-size: 28rpx;
          font-weight: bold;
          color: #383846;
        }

        .right {
          font-size: 24rpx;
          font-weight: 400;
          color: #868686;
          display: flex;
          align-items: center;
        }
      }

      &-content {
        margin-top: 80rpx;
        display: flex;
        border-top: 2rpx solid #158edc;

        &_layer {
          width: 33.333%;
          padding: 20rpx;
          box-sizing: border-box;
          position: relative;
          text-align: center;
          font-size: 24rpx;
          font-weight: 400;
          color: #383846;

          &::before {
            content: "";
            position: absolute;
            top: -10rpx;
            left: 50%;
            transform: translateX(-50%);
            width: 20rpx;
            height: 20rpx;
            background: #158edc;
            border-radius: 50%;
          }

          &.isArrived {
            &::after {
              content: "";
              position: absolute;
              top: -2rpx;
              left: 0;
              width: 100%;
              height: 4rpx;
              background: #158edc;
            }
          }
        }
      }
    }
  }
}
</style>

<template>
  <app-layout>
    <div class="header" :style="{ paddingTop: menuButtonInfo.top + 'px' }">
      <div class="header-inner">
        <div class="banner">
          <u-swiper :list="banners" height="338" />
        </div>
      </div>
    </div>
    <div class="content">
      <div class="order-form-wrap">
        <div class="title">
          <img src="../../static/images/home/icon-title.png" alt="" />
          <span>查看路线</span>
        </div>
        <div class="order-form-inner">
          <div
            class="order-form-item"
            hover-class="order-form-item-hover"
            hover-stay-time="150"
            @click="onFormItemClick(item)"
          >
            <div class="left">
              <span>
                {{
                  currentRoute.id
                    ? `${currentRoute.code}（${currentRoute.name}）`
                    : "请选择路线"
                }}
              </span>
            </div>
            <u-icon
              color="#000"
              name="arrow-down-fill"
              :custom-style="{ width: '32rpx', height: '16rpx' }"
            />
          </div>
        </div>
        <div class="route" v-if="currentRoute.id">
          <div class="route-header">
            <div class="left">途径路线：</div>
            <div class="right" v-if="appUser.id" @click="onNavTo">
              <span>查看详细站点</span>
              <u-icon name="arrow-right" color="#868686" size="28" />
            </div>
            <div class="right" v-else open-type="getUserInfo" @click="login">
              <span>查看详细站点</span>
              <u-icon name="arrow-right" color="#868686" size="28" />
            </div>
          </div>
          <div class="route-content">
            <div
              v-for="(s, i) in stations"
              :key="i"
              :class="[
                'route-content_layer',
                s.is_pass === 1 ? 'isArrived' : '',
                s.arrive_time !== 0 ? 'isIn' : '',
              ]"
            >
              <span>{{ s.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <BindMobile
      v-model="bindMobileModal.visible"
      :userProfile="bindMobileModal.userProfile"
      @getUser="getUserHandler"
    />
  </app-layout>
</template>

<script>
import BindMobile from "@/components/BindMobile";
import loginMixin from "@/mixins/login";
import { getBannersRes, getStaffStationsByRouteIdRes } from "@/api";

export default {
  name: "Home",

  mixins: [loginMixin],

  components: {
    BindMobile,
  },

  data() {
    return {
      menuButtonInfo: {},
      banners: [],
      staffRoutes: [],
      currentRoute: {},
      stations: [],
    };
  },

  watch: {
    "currentRoute.id"(n, o) {
      if (n && n !== o) {
        this.getStaffStations();
      }
    },
  },

  methods: {
    async getBanners() {
      const data = await getBannersRes();
      this.banners = data;
    },

    async getStaffRoutes() {
      const data = await getStaffRoutesRes();
      this.staffRoutes = data;
    },

    async getStaffStations() {
      const { stationList } = await getStaffStationsByRouteIdRes(
        this.currentRoute.id
      );
      this.stations = stationList.slice(0, 3);
    },

    onFormItemClick() {
      const { id, scrollTop } = this.currentRoute;
      if (id) this.navTo(`/pages/data/route?id=${id}&scrollTop=${scrollTop}`);
      else this.navTo("/pages/data/route");
    },

    getCurrentRouteData(scope) {
      this.currentRoute = scope;
    },

    onNavTo() {
      this.navTo("/pages/route/index?id=" + this.currentRoute.id);
    },
  },

  onLoad() {
    uni.getSystemInfo({
      success: () => {
        this.menuButtonInfo = uni.getMenuButtonBoundingClientRect();
      },
    });
    this.getBanners();
  },
};
</script>
