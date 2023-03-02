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
  .routeName {
    font-size: 36rpx;
    font-weight: 550;
    margin-bottom: 40rpx;
    color: #158edc;
  }
  ::v-deep {
    .u-time-axis::before {
      border-left: 1px solid #158edc;
      border-left-color: #158edc;
    }
    .u-time-axis-item {
      margin-bottom: 42rpx;
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
      font-size: 30rpx;
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

.no-route {
  height: 30vh;
  text-align: center;
  line-height: 30vh;
  font-size: 32rpx;
  font-weight: 550;
  color: #666;
}
</style>

<template>
  <app-layout background="#f9f9fd">
    <div class="store" @click="onTypeClick('store')">
      <div class="store-inner">
        <div class="left">
          <img src="../../static/images/home/icon-store.png" alt="" />
          <span>
            {{
              storePopup.currentStore.name
                ? storePopup.currentStore.name
                : "选择免税店"
            }}
          </span>
        </div>
        <u-icon
          name="arrow-down-fill"
          color="#000"
          :custom-style="{ width: '32rpx', height: '16rpx' }"
        />
      </div>
    </div>
    <div class="store" @click="onTypeClick('hotel')">
      <div class="store-inner">
        <div class="left">
          <img src="../../static/images/home/icon-hotel.png" alt="" />
          <span>
            {{
              hotelPopup.currentHotel.name
                ? hotelPopup.currentHotel.name
                : "选择乘车站"
            }}
          </span>
        </div>
        <u-icon
          name="arrow-down-fill"
          color="#000"
          :custom-style="{ width: '32rpx', height: '16rpx' }"
        />
      </div>
    </div>
    <div v-if="routes.length > 0">
      <div class="timeline" v-for="(route, i) in routes" :key="i">
        <div class="routeName">{{ route.route_name }}</div>
        <u-time-line>
          <u-time-line-item
            v-for="layer in route.items"
            :key="`${layer.id}-${i}`"
          >
            <template v-slot:content>
              <view>
                <view class="u-order-desc">{{ layer.name }}</view>
                <view class="u-order-time">
                  <text>发车时间：</text>
                  <text> {{ layer.traintime.join("、") }} </text>
                </view>
              </view>
            </template>
          </u-time-line-item>
        </u-time-line>
      </div>
    </div>

    <div
      v-else-if="hotelPopup.currentHotel.id && storePopup.currentStore.id"
      class="no-route"
    >
      暂无路线...
    </div>
  </app-layout>
</template>

<script>
import { getRouteInfoListRes } from "@/api";

export default {
  data() {
    return {
      hotelPopup: {
        visible: false,
        currentHotel: {},
      },
      storePopup: {
        visible: false,
        currentStore: {},
      },
      routes: [],
    };
  },

  watch: {
    "storePopup.currentStore.id"(n, o) {
      if (n !== o) {
        this.getRouteInfoList();
      }
    },
    "hotelPopup.currentHotel.id"(n, o) {
      if (n !== o) {
        this.getRouteInfoList();
      }
    },
  },

  methods: {
    onTypeClick(type) {
      const { id: hotel_id, scrollTop: hotelScrollTop } =
        this.hotelPopup.currentHotel;
      const { id: point_id, scrollTop: storeScrollTop } =
        this.storePopup.currentStore;
      if (type === "store") {
        if (point_id) {
          this.navTo(
            `/pages/data/store?id=${point_id}&scrollTop=${storeScrollTop}`
          );
        } else {
          this.navTo(`/pages/data/store`);
        }
      } else {
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
      }
    },
    getCurrentHotelData(hotel) {
      if (hotel.id !== this.hotelPopup.currentHotel.id) {
        this.hotelPopup.currentHotel = hotel;
      }
    },
    getCurrentStoreData(store) {
      if (store.id !== this.storePopup.currentStore.id) {
        this.storePopup.currentStore = store;
        this.hotelPopup.currentHotel = {};
        this.routes = [];
      }
    },
    async getRouteInfoList() {
      const { id: hotel_id } = this.hotelPopup.currentHotel;
      const { id: point_id } = this.storePopup.currentStore;
      if (hotel_id && point_id) {
        const data = await getRouteInfoListRes({
          hotel_id,
          point_id,
        });
        this.routes = data;
      }
    },
  },
};
</script>
