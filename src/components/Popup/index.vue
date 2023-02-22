<style lang="scss" scoped>
._wrap {
  height: 50vh;
  padding: 40rpx 20rpx;
  box-sizing: border-box;
  background: #f9f9fd;
  ._layer {
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
    <div class="_wrap">
      <div
        v-for="(item, index) in dataSource"
        :key="item.id"
        :class="['_layer', activeId == item.id ? 'active' : '']"
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
export default {
  name: "Popup",

  props: {
    value: {
      type: Boolean,
      default: false,
    },
    dataSource: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      activeId: -1,
    };
  },

  methods: {
    onHotelItemClick(index) {
      const scope = this.dataSource[index];
      this.activeId = scope.id;
      this.$emit("getData", scope);
      this.$emit("input", false);
    },
  },
};
</script>
