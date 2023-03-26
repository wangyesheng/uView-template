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
      .u-search {
        height: 68rpx;
        background: #f6f9fb;
        border-radius: 34rpx;
        padding-right: 22rpx;

        .u-content,
        .u-input {
          background-color: #f6f9fb !important;
        }

        .u-content {
          padding-left: 76rpx;
          padding-right: 0;
          .u-icon__icon {
            color: #babdc3 !important;
          }
        }
      }

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
    border-radius: 34px;
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

    .canUseTips {
      margin-top: 40rpx;
      text-align: center;
      font-size: 24rpx;
      font-weight: bold;
      color: #383846;

      span:first-child {
        color: #158edc;
      }
      span:last-child {
        color: #ee0000;
      }
    }

    ::v-deep {
      .u-btn--primary {
        margin-top: 40rpx;
        height: 98rpx;
        background: linear-gradient(180deg, #5bb3ed 0%, #158edc 100%);
      }

      .u-primary-hover {
        background: linear-gradient(
          180deg,
          #55b3f1 0%,
          #0d8ce0 100%
        ) !important;
      }
    }
  }
}
</style>

<template>
  <app-layout>
    <div class="header" :style="{ paddingTop: menuButtonInfo.top + 'px' }">
      <div class="header-inner">
        <!-- <u-search
          placeholder="输入关键字"
          placeholder-color="#babdc3"
          v-model="searchKey"
          :excludeWidth="menuButtonInfo.width + 6"
          :action-style="{
            width: '88rpx',
            height: '34rpx',
            background: '#158EDC',
            lineHeight: '34rpx',
            textAlign: 'center',
            borderRadius: '4rpx',
            color: '#FDFEFF',
            fontSize: '18rpx',
          }"
          @custom="onSerchByKey"
          @search="onSerchByKey"
        /> -->
        <div class="banner">
          <u-swiper :list="banners" height="338" @click="onNavToMP" />
        </div>
      </div>
    </div>
    <div class="content">
      <div class="order-form-wrap">
        <div class="title">
          <img src="../../static/images/home/icon-title.png" alt="" />
          <span>cdf免费穿梭巴士预约</span>
        </div>
        <div class="order-form-inner">
          <div
            class="order-form-item"
            hover-class="order-form-item-hover"
            hover-stay-time="150"
            v-for="item in orderFormItems"
            :key="item.key"
            @click="onFormItemClick(item)"
          >
            <div class="left">
              <img
                :src="require(`../../static/images/home/icon-${item.key}.png`)"
                alt=""
              />
              <span>
                {{ item.label }}
              </span>
            </div>
            <u-icon
              color="#000"
              name="arrow-down-fill"
              :custom-style="{ width: '32rpx', height: '16rpx' }"
            />
          </div>
        </div>
        <div class="canUseTips" v-if="route.id">
          <span>{{ route.route_name }}，</span>
          <span>剩余座位</span>
          <span>{{ route.seat_number }}</span>
        </div>
        <u-button
          type="primary"
          shape="circle"
          open-type="getUserInfo"
          @click="login"
          v-if="!appUser.id"
        >
          立即登录
        </u-button>
        <u-button type="primary" shape="circle" v-else @click="onOrderSubmit">
          立即预约
        </u-button>
      </div>
    </div>
    <!-- <Popup
      ref="hotelPopupRef"
      v-model="hotelPopup.visible"
      :dataSource="hotelPopup.data"
      @getData="getCurrentHotelData"
    /> -->
    <!-- <Popup
      v-model="storePopup.visible"
      :dataSource="storePopup.data"
      @getData="getCurrentStoreData"
    /> -->
    <u-select
      v-model="timeSelect.visible"
      :default-value="timeSelect.defaultValue"
      :list="timeSelect.data"
      @confirm="onTimeConfirm"
    />
    <!-- <view
      class="u-line-1"
      :style="{ color: item1.disabled ? '#cacaca' : '#303133' }"
    >
      {{ item1[labelName] }}
    </view> -->
    <u-select
      v-model="reverseSelect.visible"
      :default-value="reverseSelect.defaultValue"
      :list="reverseSelect.data"
      @confirm="onReverseConfirm"
    />
    <BindMobile
      v-model="bindMobileModal.visible"
      :userProfile="bindMobileModal.userProfile"
      @getUser="getUserHandler"
    />
    <u-toast ref="successToastRef" />
  </app-layout>
</template>

<script>
// import Popup from "@/components/Popup";
import BindMobile from "@/components/BindMobile";
import loginMixin from "@/mixins/login";
import {
  getRoutesRes,
  getBannersRes,
  getRouteNumberRes,
  createReserveRes,
} from "@/api";
import dayjs from "dayjs";

export default {
  name: "Home",

  mixins: [loginMixin],

  components: {
    // Popup,
    BindMobile,
  },

  data() {
    return {
      searchKey: "",
      menuButtonInfo: {},
      banners: [],
      orderFormItems: [
        {
          key: "store",
          label: "选择免税店",
        },
        {
          key: "hotel",
          label: "选择乘车站",
        },
        {
          key: "time",
          label: "选择乘车时间",
        },
        {
          key: "appointment",
          label: "选择预约人数",
        },
      ],
      hotelPopup: {
        visible: false,
        data: [],
        currentHotel: {},
      },
      storePopup: {
        visible: false,
        data: [],
        currentStore: {},
      },
      timeSelect: {
        visible: false,
        data: [],
        currentTime: [],
        defaultValue: [],
      },
      reverseSelect: {
        visible: false,
        data: [],
        defaultValue: [],
        number: 0,
      },
      route: {},
    };
  },

  methods: {
    onNavToMP(index) {
      const current = this.banners[index];
      if (current.appid && current.url) {
        uni.navigateToMiniProgram({
          appId: current.appid,
          path: current.url,
          envVersion: "release",
          fail: (error) => {
            console.log("navigateToMiniProgram", error);
          },
        });
      }
    },
    onFormItemClick({ key }) {
      if (!this.appUser.id) {
        this.toast("请先授权登录");
        return;
      }
      const { id: hotel_id, scrollTop: hotelScrollTop } =
        this.hotelPopup.currentHotel;
      const { id: point_id, scrollTop: storeScrollTop } =
        this.storePopup.currentStore;
      if (key === "store") {
        if (point_id) {
          this.navTo(
            `/pages/data/store?id=${point_id}&scrollTop=${storeScrollTop}`
          );
        } else {
          this.navTo(`/pages/data/store`);
        }
      } else if (key === "hotel") {
        if (!point_id) {
          this.toast("请选择免税店");
          return;
        }
        if (hotel_id) {
          this.navTo(
            `/pages/data/hotel?pointId=${point_id}&id=${hotel_id}&scrollTop=${hotelScrollTop}`
          );
        } else {
          this.navTo(`/pages/data/hotel?pointId=${point_id}`);
        }
      } else if (key === "time") {
        if (!point_id) {
          this.toast("请选择免税店");
          return;
        }
        if (!hotel_id) {
          this.toast("请选择乘车站");
          return;
        }
        if (this.timeSelect.currentTime.length > 0) {
          this.timeSelect.visible = true;
        } else {
          this.getRoutes(hotel_id, point_id);
        }
      } else if (key === "appointment") {
        if (this.timeSelect.currentTime.length === 0) {
          this.toast("请选择乘车时间");
          return;
        }
        if (this.reverseSelect.data.length === 0) {
          this.toast("该时间段已无剩余座位");
          return;
        }
        this.reverseSelect.visible = true;
      }
    },
    getCurrentHotelData(hotel) {
      if (hotel.id !== this.hotelPopup.currentHotel.id) {
        this.hotelPopup.currentHotel = hotel;
        this.findOrderItem("hotel", hotel.name);
        this.initSelectData();
      }
    },
    getCurrentStoreData(store) {
      if (store.id !== this.storePopup.currentStore.id) {
        this.storePopup.currentStore = store;
        this.findOrderItem("store", store.name);
        this.hotelPopup.currentHotel = {};
        this.findOrderItem("hotel", "选择乘车站");
        this.initSelectData();
      }
    },
    async getRoutes(hotel_id, point_id) {
      const data = await getRoutesRes({
        hotel_id, // 乘车站
        point_id, // 免税店
      });
      if (data && data.length > 0) {
        const currentDay = dayjs().format("YYYY-MM-DD");
        const nextDay = dayjs().add(1, "day").format("YYYY-MM-DD");

        const currentDates = [];
        const nextDates = [];

        data.forEach((x) => {
          const currentDate = `${currentDay} ${x}`;
          const comparedDate = dayjs(currentDate).unix();
          const now = dayjs().unix();
          if (comparedDate > now) {
            currentDates.push(currentDate);
          }
          nextDates.push(`${nextDay} ${x}`);
        });

        this.timeSelect.data = currentDates.concat(nextDates).map((x, i) => {
          return {
            label: x,
            value: i,
          };
        });
        this.timeSelect.visible = true;
      } else {
        this.toast("暂无可预约时间");
      }
    },
    onTimeConfirm([date]) {
      this.timeSelect.currentTime = date.label.split(" ");
      this.timeSelect.defaultValue = [date.value];
      this.findOrderItem("time", date.label);
      this.getRouteCanUseNumber();
    },
    async getRouteCanUseNumber() {
      const { id: hotel_id } = this.hotelPopup.currentHotel;
      const { id: point_id } = this.storePopup.currentStore;
      const [reserve_date, reserve_time] = this.timeSelect.currentTime;
      const data = await getRouteNumberRes({
        hotel_id,
        point_id,
        reserve_date,
        reserve_time,
      });
      this.route = data;

      this.reverseSelect.data = [];
      this.reverseSelect.defaultValue = [];
      this.reverseSelect.number = 0;
      this.findOrderItem("appointment", `选择预约人数`);

      for (let i = 1; i <= data.seat_number; i++) {
        this.reverseSelect.data.push({
          label: i,
          value: i,
        });
      }
    },
    onReverseConfirm([args]) {
      this.findOrderItem("appointment", args.value);
      this.reverseSelect.defaultValue = [args.value - 1];
      this.reverseSelect.number = args.value;
    },
    findOrderItem(key, label) {
      const scope = this.orderFormItems.find((x) => x.key === key);
      scope.label = label;
    },
    initSelectData() {
      this.timeSelect.data = [];
      this.timeSelect.currentTime = [];
      this.timeSelect.defaultValue = [];
      this.route = {};
      this.reverseSelect.data = [];
      this.reverseSelect.defaultValue = [];
      this.reverseSelect.number = 0;
      this.findOrderItem("time", `选择乘车时间`);
      this.findOrderItem("appointment", `选择预约人数`);
    },
    async onOrderSubmit() {
      const { id: hotel_id, scrollTop: hotelScrollTop } =
        this.hotelPopup.currentHotel;
      const { id: point_id, scrollTop: pointScrollTop } =
        this.storePopup.currentStore;
      const [reserve_date, reserve_time] = this.timeSelect.currentTime;
      const { number } = this.reverseSelect;
      if (!hotel_id || !point_id || !reserve_date || !reserve_time || !number) {
        this.toast("请填写完信息再提交");
        return;
      }
      const { route_id, id: schedule_id } = this.route;
      const reqData = {
        hotel_id,
        point_id,
        reserve_date,
        reserve_time,
        route_id,
        schedule_id,
        number,
        scroll_top: `${hotelScrollTop || 0},${pointScrollTop || 0}`,
      };
      try {
        await createReserveRes(reqData);
        this.$refs.successToastRef.show({
          title: "预约成功",
          type: "success",
          duration: "3000",
        });
        this.reverseSelect.data = [];
        this.reverseSelect.number = 0;
        this.reverseSelect.defaultValue = [];
        this.findOrderItem("appointment", `选择预约人数`);
        this.getRouteCanUseNumber();
      } catch (error) {
        if (error.code === 401) {
          uni.setStorageSync("APP_USER", {});
          this.appUser = {};
        }
      }
    },
    async getBanners() {
      const data = await getBannersRes();
      this.banners = data;
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

  onShareAppMessage() {
    return {
      title: "cdf免费穿梭巴士预约",
      path: "/pages/home/index",
      imageUrl: "../../static/images/home/share.jpg",
    };
  },

  onShareTimeline() {
    return {
      title: "cdf免费穿梭巴士预约",
      path: "/pages/home/index",
      imageUrl: "../../static/images/home/share.jpg",
    };
  },
};
</script>
