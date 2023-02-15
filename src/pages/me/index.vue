<style lang="scss" scoped>
.content {
  width: 100%;
  background: linear-gradient(
    189deg,
    #2398e1 0%,
    #8ee2e9 33%,
    rgba(213, 236, 221, 0.27) 54%,
    rgba(207, 230, 222, 0) 100%,
    rgba(216, 207, 230, 0) 100%
  );
  padding: 0 30rpx;
  box-sizing: border-box;
  .content-inner {
    .user {
      display: flex;
      align-items: center;
      margin-bottom: 68rpx;

      .avatar {
        width: 136rpx;
        height: 136rpx;
        border-radius: 50%;
        background: #fff;
      }

      .right {
        margin-left: 26rpx;
        display: flex;
        flex-direction: column;
        .mobile {
          margin-bottom: 14rpx;
          font-size: 36rpx;
          font-weight: bold;
          color: #373741;
        }

        .role {
          width: 106rpx;
          height: 28rpx;
          background-image: url(https://zhonghai.tuomuit.com/assets/wechat/img/banner-bg.jpg);
          background-repeat: no-repeat;
          background-size: 100% 100%;
          font-size: 20rpx;
          font-weight: 400;
          color: #dbdde7;
          text-align: center;
          line-height: 28rpx;
        }
      }
    }
  }

  .my-order {
    background: #ffffff;
    border-radius: 34rpx;
    padding: 38rpx 36rpx 16rpx;
    box-sizing: border-box;
    position: relative;
    min-height: 372rpx;

    &-header {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .left {
        display: flex;
        align-items: center;
        img {
          width: 32rpx;
          height: 32rpx;
          margin-right: 20rpx;
        }
        span {
          font-size: 32rpx;
          font-weight: bold;
          color: #383846;
        }
      }

      .right {
        display: flex;
        align-items: center;
        span {
          font-size: 26rpx;
          font-weight: 400;
          color: #868686;
          line-height: 32rpx;
          margin-right: 10rpx;
        }

        ::v-deep {
          .u-icon,
          .u-icon__icon {
            font-size: 26rpx;
          }
        }
      }
    }

    &-content {
      margin-top: 76rpx;

      .layer {
        font-size: 26rpx;
        font-weight: 400;
        margin-bottom: 16rpx;

        .label {
          color: #3e3e4b;
        }

        .value {
          color: #84848c;
        }
      }
    }

    &-footer {
      margin-top: 30rpx;
      overflow: hidden;
      .action {
        float: right;
        display: flex;
      }
      ::v-deep {
        [class^="u-btn"] {
          width: 128rpx;
          height: 50rpx;
          font-size: 22rpx;
        }
        .u-btn--primary {
          background: #3199e2;
          margin-left: 16rpx;
        }

        .u-primary-hover {
          background: #0e7bc9 !important;
        }

        .u-btn--default {
          background: #f2f2f2;
          color: #3e3e4b;
          &::after {
            border-color: #f2f2f2 !important;
          }
        }

        .u-default-hover {
          background: #e0e0e0 !important;
          color: #3e3e4b !important;
        }
      }
    }

    &-status {
      font-size: 24rpx;
      font-weight: bold;
      color: #1fae8e;
      position: absolute;
      right: 46rpx;
      top: 158rpx;
    }

    .no-data {
      display: flex;
      flex-direction: column;
      align-items: center;
      position: absolute;
      top: 60%;
      left: 50%;
      transform: translate(-50%, -60%);
      img {
        width: 68rpx;
        height: 68rpx;
        margin-bottom: 20rpx;
      }
      span {
        font-size: 26rpx;
        font-weight: 400;
        color: #bebebe;
      }
    }
  }

  .functions {
    margin-top: 40rpx;
    background: #ffffff;
    border-radius: 16rpx;
    padding-top: 40rpx;
    padding-bottom: 20rpx;
    box-sizing: border-box;

    .title {
      font-size: 28rpx;
      font-weight: bold;
      color: #373741;
      margin-bottom: 30rpx;
      padding: 0 32rpx;
    }

    .cell-wrap {
      .cell {
        padding: 40rpx 36rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .left {
          display: flex;
          align-items: center;

          img {
            width: 42rpx;
            height: 42rpx;
            margin-right: 38rpx;
          }

          span {
            font-size: 28rpx;
            font-weight: bold;
            color: #373741;
          }
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
}
</style>

<template>
  <app-layout background="#f9faff">
    <div
      class="content"
      :style="{
        paddingTop: menuButtonInfo.top + menuButtonInfo.height + 26 + 'px',
      }"
    >
      <div class="content-inner">
        <div class="user">
          <div class="avatar" />
          <div class="right">
            <span class="mobile">188928938</span>
            <div class="role">游客</div>
          </div>
        </div>
        <div class="my-order">
          <div class="my-order-header">
            <div class="left">
              <img :src="require('@/static/images/me/icon-order.png')" alt="" />
              <span>我的预约</span>
            </div>
            <div class="right">
              <span>历史预约</span>
              <u-icon name="arrow-right" color="#868686" />
            </div>
          </div>
          <!-- <div>
            <div class="my-order-content">
              <div class="layer">
                <span class="label">酒店：</span>
                <span class="value">无锡希尔顿五星级大酒店</span>
              </div>
              <div class="layer">
                <span class="label">班次：</span>
                <span class="value">708 大巴车</span>
              </div>
              <div class="layer">
                <span class="label">时间：</span>
                <span class="value">2022-12-23 12:34</span>
              </div>
            </div>
            <div class="my-order-footer">
              <div class="action">
                <u-button shape="circle">取消预约</u-button>
                <u-button shape="circle" type="primary">修改</u-button>
              </div>
            </div>
            <div class="my-order-status">等待中...</div>
          </div> -->
          <div class="no-data">
            <img src="../../static/images/me/icon-no-data.png" alt="" />
            <span>暂无预约...</span>
          </div>
        </div>
        <div class="functions">
          <div class="title">常用功能</div>
          <div class="cell-wrap">
            <div
              class="cell"
              hover-class="cell-hover"
              hover-stay-time="150"
              v-for="func in functions"
              :key="func.icon"
              @click="onFunctionClick(func.icon)"
            >
              <div class="left">
                <img
                  :src="require(`@/static/images/me/icon-${func.icon}.png`)"
                  alt=""
                />
                <span>{{ func.label }}</span>
              </div>
              <u-icon name="arrow-right" color="#D8DBDC" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </app-layout>
</template>

<script>
export default {
  data() {
    return {
      functions: [
        {
          icon: "opinion",
          label: "意见反馈",
        },
        {
          icon: "customer-service",
          label: "联系客服",
        },
        {
          icon: "setting",
          label: "设置",
        },
      ],
    };
  },

  computed: {
    menuButtonInfo() {
      return uni.getMenuButtonBoundingClientRect();
    },
  },

  methods: {
    onFunctionClick(key) {
      switch (key) {
        case "setting":
          this.navTo("/pages/me/setting");
          break;

        default:
          break;
      }
    },
  },

  onLoad() {},
};
</script>
