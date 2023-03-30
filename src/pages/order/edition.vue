<style lang="scss" scoped>
.edition-wrap {
  height: 100vh;
  padding: 50rpx 30rpx;
  box-sizing: border-box;

  .order-form-wrap {
    width: 100%;
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
      margin-bottom: 40rpx;
      display: flex;
      align-items: center;

      &.appointment {
        background: #fff;
        justify-content: center;

        ::v-deep {
          .u-numberbox {
            width: 100%;
            display: flex !important;

            input {
              flex: 1 !important;
              width: auto !important;
              height: 80rpx !important;
              font-size: 30rpx !important;
              font-weight: 550 !important;
              color: #383846 !important;
            }

            [class^="u-icon"] {
              height: 80rpx !important;
            }
          }
        }
      }

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
  <div class="edition-wrap">
    <div class="order-form-wrap">
      <div class="order-form-inner">
        <div
          :class="['order-form-item', item.key]"
          hover-class="order-form-item-hover"
          hover-stay-time="150"
          v-for="item in orderFormItems"
          :key="item.key"
          @click="onFormItemClick(item)"
        >
          <template v-if="item.key !== 'appointment'">
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
          </template>
          <u-number-box v-else v-model="item.label" />
        </div>
      </div>
      <div class="canUseTips" v-if="route.id">
        <span>{{ route.route_name }}，</span>
        <span>剩余座位</span>
        <span>{{ route.seat_number }}</span>
      </div>

      <u-button type="primary" shape="circle" @click="onOrderSubmit">
        提交
      </u-button>
    </div>
    <u-select
      v-model="timeSelect.visible"
      :default-value="timeSelect.defaultValue"
      :list="timeSelect.data"
      @confirm="onTimeConfirm"
    />
    <u-select
      v-model="reverseSelect.visible"
      :default-value="reverseSelect.defaultValue"
      :list="reverseSelect.data"
      @confirm="onReverseConfirm"
    />

    <u-toast ref="successToastRef" />
  </div>
</template>

<script>
import {
  getHotelsRes,
  getPointsRes,
  getRoutesRes,
  getRouteNumberRes,
  getReserveByIdRes,
  updateReserveRes,
} from "@/api";
import dayjs from "dayjs";

export default {
  name: "edition",

  data() {
    return {
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
    async getReserveById() {
      const data = await getReserveByIdRes(this.reserve_id);
      const [hotelScrollTop, storeScrollTop] = data.scroll_top.split(",");
      if (data && data.id) {
        this.hotelPopup.currentHotel = {
          ...this.hotelPopup.data.find((x) => x.id === data.hotel_id),
          scrollTop: hotelScrollTop,
        };

        this.storePopup.currentStore = {
          ...this.storePopup.data.find((x) => x.id === data.point_id),
          scrollTop: storeScrollTop,
        };
        this.findOrderItem("store", this.storePopup.currentStore.name);
        this.findOrderItem("hotel", this.hotelPopup.currentHotel.name);
        const ymd = data.reserve_date;
        const time = data.reserve_time.slice(0, 5);
        this.timeSelect.currentTime = [ymd, time];
        this.findOrderItem("time", `${ymd} ${time}`);
        await this.getRouteCanUseNumber();
        this.reverseSelect.defaultValue = [data.number - 1];
        this.reverseSelect.number = data.number;
        this.findOrderItem("appointment", data.number);
      }
    },
    onFormItemClick({ key }) {
      const {
        id: hotel_id,
        scrollTop: hotelScrollTop,
        searchHotelName,
      } = this.hotelPopup.currentHotel;
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
        if (hotel_id) {
          this.navTo(
            `/pages/data/hotel?pointId=${point_id}&id=${hotel_id}&scrollTop=${hotelScrollTop}&searchHotelName=${searchHotelName}`
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
        if (
          this.timeSelect.currentTime.length > 0 &&
          this.timeSelect.data.length > 0
        ) {
          this.timeSelect.visible = true;
        } else {
          this.getRoutes(hotel_id, point_id);
        }
      } else if (key === "appointment") {
        // if (this.timeSelect.currentTime.length === 0) {
        //   this.toast("请选择乘车时间");
        //   return;
        // }
        // if (this.reverseSelect.data.length === 0) {
        //   this.toast("该时间段已无剩余座位");
        //   return;
        // }
        // this.reverseSelect.visible = true;
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

        if (this.timeSelect.currentTime.length > 0) {
          this.timeSelect.defaultValue = [
            this.timeSelect.data.findIndex(
              (x) => x.label === this.timeSelect.currentTime.join(" ")
            ),
          ];
        }

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
    async getStores() {
      const data = await getPointsRes();
      this.storePopup.data = data;
    },
    async getHotels() {
      const data = await getHotelsRes();
      this.hotelPopup.data = data;
    },
    async onOrderSubmit() {
      const { id: hotel_id, scrollTop: hotelScrollTop } =
        this.hotelPopup.currentHotel;
      const { id: point_id, scrollTop: storeScrollTop } =
        this.storePopup.currentStore;
      const [reserve_date, reserve_time] = this.timeSelect.currentTime;
      const appointmentScope = this.orderFormItems.find(
        (x) => x.key === "appointment"
      );
      if (
        !hotel_id ||
        !point_id ||
        !reserve_date ||
        !reserve_time ||
        !appointmentScope.label
      ) {
        if (appointmentScope.label === 0) {
          this.toast("预约人数不可为0");
        } else {
          this.toast("请填写完信息再提交");
        }
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
        number: appointmentScope.label,
        reserve_id: this.reserve_id,
        scroll_top: `${hotelScrollTop || 0},${storeScrollTop || 0}`,
      };
      await updateReserveRes(reqData);
      this.$refs.successToastRef.show({
        title: "编辑成功",
        type: "success",
        duration: "3000",
      });
      this.form == 1
        ? uni.switchTab({
            url: "/pages/me/index",
          })
        : uni.navigateBack({ delta: 1 });
    },
  },

  async onLoad({ reserve_id, from }) {
    this.reserve_id = reserve_id;
    this.form = from;
    await this.getHotels();
    await this.getStores();
    await this.getReserveById();
  },
};
</script>
