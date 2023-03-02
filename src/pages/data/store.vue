<style lang="scss" scoped>
._wrap {
  min-height: 100vh;
  padding: 40rpx 20rpx;
  box-sizing: border-box;
  background: #f9f9fd;
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
  </div>
</template>

<script>
import { getPointsRes } from "@/api";

export default {
  name: "Store",

  data() {
    return {
      activeId: -1,
      dataSource: [],
    };
  },

  methods: {
    async getStores() {
      const data = await getPointsRes();
      this.dataSource = data;
    },
    onHotelItemClick(index) {
      const scope = this.dataSource[index];
      this.activeId = scope.id;
      const pages = getCurrentPages();
      const prvePage = pages[pages.length - 2];
      prvePage.$vm.getCurrentStoreData({
        ...scope,
        scrollTop: this.scrollTop,
      });
      uni.navigateBack();
    },
  },

  onLoad({ id, scrollTop }) {
    this.getStores();
    if (id && scrollTop) {
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
