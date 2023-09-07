<style lang="scss" scoped>
.setting-wrap {
  min-height: 100vh;
  background: #f9f9fd;
  padding: 44rpx 30rpx 0;

  .setting-inner {
    background: #ffffff;
    border-radius: 34rpx;
    padding: 36rpx 0;

    .cell-group {
      .cell {
        padding: 34rpx 38rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;

        span {
          font-size: 28rpx;
          font-weight: bold;
          color: #383846;
        }

        &:not(:last-child) {
          border-bottom: 2rpx solid #f6f6f6;
        }
      }

      .cell-hover {
        background: #f7f8f9;
      }
    }
  }

  ::v-deep {
    .u-btn {
      margin: 150rpx auto 0;
      width: 90%;
      height: 100rpx;
    }
  }
}
</style>

<template>
  <div class="setting-wrap">
    <div class="setting-inner">
      <div class="cell-group">
        <div
          class="cell"
          hover-class="cell-hover"
          hover-stay-time="150"
          @click="onCellClick('1')"
        >
          <span>关于平台</span>
          <u-icon name="arrow-right" color="#D8DBDC" />
        </div>
        <div
          class="cell"
          hover-class="cell-hover"
          hover-stay-time="150"
          @click="onCellClick('2')"
        >
          <span>服务协议</span>
          <u-icon name="arrow-right" color="#D8DBDC" />
        </div>
        <div
          class="cell"
          hover-class="cell-hover"
          hover-stay-time="150"
          @click="onCellClick('cache')"
        >
          <span>清除缓存</span>
          <u-icon name="arrow-right" color="#D8DBDC" />
        </div>
      </div>
    </div>
    <u-button type="primary" shape="circle" @click="onLogout">
      退出登录
    </u-button>
  </div>
</template>

<script>
export default {
  name: "setting",

  data() {
    return {};
  },

  methods: {
    onCellClick(key) {
      if (key === "cache") {
        uni.clearStorageSync();
        this.toast("缓存清除成功");
      } else {
        this.navTo(`/pages/me/common?type=${key}`);
      }
    },
    onLogout() {
      uni.setStorageSync("APP_USER", {});
      uni.switchTab({
        url: "/pages/home/index",
      });
    },
  },
};
</script>
