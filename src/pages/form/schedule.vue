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
    display: flex;
    justify-content: space-between;
    width: 100%;

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
      width: 80%;
    }
  }
}
</style>

<template>
  <div class="_wrap">
    <template v-if="schedules.length > 0">
      <div
        v-for="item in schedules"
        :key="item.id"
        :class="[
          '_layer',
          activeId == item.id ? 'active' : '',
          `_layer-${item.id}`,
        ]"
        hover-class="_layer-hover"
        hover-stay-time="150"
      >
        <div class="title">{{ item.name }}</div>
        <u-button type="primary" size="mini" @click="onNavTo(item)"
          >填写</u-button
        >
      </div>
    </template>
    <div class="no-data" v-else>暂无路线数据...</div>
  </div>
</template>

<script>
import { getSchedulesRes } from "@/api";

export default {
  name: "Route",

  data() {
    return {
      activeId: -1,
      schedules: [],
    };
  },

  methods: {
    async getSchedules() {
      this.schedules = await getSchedulesRes({
        group_id: this.group_id,
        route_id: this.route_id,
      });
    },

    onNavTo(scope) {
      this.activeId = scope.id;
      this.navTo(
        `/pages/form/index?group_id=${scope.group_id}&schedule_id=${scope.id}`
      );
    },
  },

  onLoad({ group_id, route_id }) {
    this.group_id = group_id;
    this.route_id = route_id;
    this.getSchedules();
  },
};
</script>
