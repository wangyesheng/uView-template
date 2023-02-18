<style lang="scss" scoped>
.hotel-wrap {
  height: 68vh;
  padding: 40rpx 20rpx;
  box-sizing: border-box;
  background: #f9f9fd;
  .pois-layer {
    &.active {
      border: 2rpx solid #158edc;
    }
    background: #fff;
    padding: 20rpx;
    margin-bottom: 20rpx;
    border-radius: 20rpx;
    border: 2rpx solid #fff;
    display: flex;
    align-items: center;

    .left {
      width: 120rpx;
      height: 120rpx;
      margin-right: 20rpx;

      img {
        border-radius: 10rpx;
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
      }
    }

    .right {
      width: 80%;
      .title {
        font-size: 28rpx;
        color: #383846;
        margin-bottom: 10rpx;
        font-weight: bold;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }

      .address {
        font-size: 24rpx;
        color: #54545a;
      }
    }
  }
}
</style>

<template>
  <u-popup
    mode="bottom"
    border-radius="30"
    :value="value"
    @close="$emit('input', false)"
  >
    <div class="hotel-wrap">
      <div
        v-for="(item, index) in hotels"
        :key="item.id"
        :class="['pois-layer', activeHotelId == item.id ? 'active' : '']"
        @click="onHotelItemClick(index)"
      >
        <div class="left">
          <img :src="item.image" alt="" />
        </div>
        <div class="right">
          <div class="title">
            {{ item.name }}
          </div>
          <div class="address">{{ item.address }}</div>
        </div>
      </div>
    </div>
  </u-popup>
</template>

<script>
import { getHotelsRes } from "@/api";

export default {
  name: "Popup",

  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      hotels: [],
      activeHotelId: -1,
      activeHotelName: "",
    };
  },

  methods: {
    async getHotels() {
      const data = await getHotelsRes();
      this.hotels = data;
    },
    onHotelItemClick(index) {
      const hotel = this.hotels[index];
      this.activeHotelId = hotel.id;
      this.activeHotelName = hotel.name;
      this.$emit("getData", hotel);
      this.$emit("input", false);
    },
  },

  mounted() {
    this.getHotels();
  },
};
</script>
