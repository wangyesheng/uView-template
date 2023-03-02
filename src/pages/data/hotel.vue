<style lang="scss" scoped>
._wrap {
  min-height: 100vh;
  padding: 40rpx 20rpx;
  box-sizing: border-box;
  background: #f9f9fd;

  .no-data {
    height: 60vh;
    text-align: center;
    line-height: 60vh;
    font-size: 30rpx;
    font-weight: 400;
    color: #999999;
  }

  ._layer {
    &.active {
      border: 2rpx solid #158edc;
    }

    &-hover {
      background: #f8fdff;
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
  <div class="_wrap">
    <template v-if="dataSource.length > 0">
      <div
        v-for="(item, index) in dataSource"
        :key="item.id"
        :class="[
          '_layer',
          activeId == item.id ? 'active' : '',
          `_layer-${item.id}`,
        ]"
        hover-class="_layer-hover"
        hover-stay-time="150"
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
    </template>
    <div class="no-data" v-else>暂无乘车站数据...</div>
  </div>
</template>

<script>
import { getHotelsRes } from "@/api";

export default {
  name: "Hotel",

  data() {
    return {
      activeId: -1,
      dataSource: [],
    };
  },

  methods: {
    async geHotels() {
      const data = await getHotelsRes({
        point_id: this.pointId,
      });
      this.dataSource = data;
    },
    onHotelItemClick(index) {
      const scope = this.dataSource[index];
      this.activeId = scope.id;
      const pages = getCurrentPages();
      const prvePage = pages[pages.length - 2];
      prvePage.$vm.getCurrentHotelData({
        ...scope,
        scrollTop: this.scrollTop,
      });
      uni.navigateBack();
    },
  },

  async onLoad({ pointId, id, scrollTop }) {
    this.pointId = pointId;
    await this.geHotels();
    if (id && scrollTop) {
      this.point_id = pointId;
      this.activeId = id;
      uni.pageScrollTo({
        duration: 100,
        scrollTop: Number(scrollTop),
      });
    }
  },

  onPageScroll(e) {
    this.scrollTop = e.scrollTop;
  },
};
</script>
