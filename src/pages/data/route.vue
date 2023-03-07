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
    padding: 40rpx 20rpx;
    margin-bottom: 20rpx;
    border-radius: 20rpx;
    border: 2rpx solid #fff;
    display: flex;
    align-items: center;

    .title {
      font-size: 28rpx;
      color: #383846;
      font-weight: bold;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
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
        @click="onItemClick(index)"
      >
        <div class="title">{{ item.code }}（{{ item.name }}）</div>
      </div>
    </template>
    <div class="no-data" v-else>暂无路线数据...</div>
  </div>
</template>

<script>
import { getStaffRoutesRes } from "@/api";

export default {
  name: "RouteData",

  data() {
    return {
      activeId: -1,
      dataSource: [],
    };
  },

  methods: {
    async getStaffRoutes() {
      const data = await getStaffRoutesRes();
      this.dataSource = data;
    },

    onItemClick(index) {
      const scope = this.dataSource[index];
      this.activeId = scope.id;
      const pages = getCurrentPages();
      const prvePage = pages[pages.length - 2];
      prvePage.$vm.getCurrentRouteData({
        ...scope,
        scrollTop: this.scrollTop,
      });
      uni.navigateBack();
    },
  },

  async onLoad({ id, scrollTop }) {
    await this.getStaffRoutes();
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
