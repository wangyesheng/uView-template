<style lang="scss" scoped>
.me {
  width: 100vw;
  min-height: 100vh;
  position: relative;

  &-header {
    width: 100%;
    height: 728rpx;
    background-image: url(https://cxp.tuomuit.com/assets/img/wechat/my-bg.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }

  &-inner {
    width: 90vw;
    height: 70vh;
    position: absolute;
    top: 190rpx;
    left: 50%;
    transform: translateX(-50%);

    .user {
      display: flex;
      align-items: center;
      margin-bottom: 60rpx;

      .avatar {
        margin: 0;
        padding: 0;
        width: 136rpx;
        height: 136rpx;
        border-radius: 50%;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        &::after {
          border: none;
        }
      }

      .right {
        margin-left: 26rpx;
        display: flex;
        flex-direction: column;
        .mobile {
          font-size: 28rpx;
          font-weight: 400;
          color: #b4afbd;
        }

        input {
          font-size: 36rpx;
          font-weight: bold;
          color: #373741;
          margin-bottom: 10rpx;
        }
      }
    }

    .order {
      background: #fff;
      border-radius: 20rpx;
      padding: 30rpx 25rpx 40rpx;
      box-sizing: border-box;
      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 35rpx;

        span {
          font-size: 28rpx;
          font-weight: 550;
          color: #363636;
        }
      }

      .status {
        display: flex;
        justify-content: space-around;
        align-items: center;

        &-layer {
          display: flex;
          flex-direction: column;
          justify-content: centers;
          img {
            width: 68rpx;
            height: 68rpx;
            margin-bottom: 20rpx;
          }

          span {
            font-size: 24rpx;
            font-weight: 400;
            color: #363636;
          }
        }
      }
    }

    .merchant {
      width: 100%;
      background: #fff;
      border-radius: 16rpx;
      margin-top: 40rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 40rpx 36rpx;
      box-sizing: border-box;

      &-hover {
        background: #f7f8f9;
      }

      .left {
        display: flex;
        align-items: center;
        img {
          width: 40rpx;
          height: 40rpx;
          margin-right: 38rpx;
        }

        span {
          font-size: 28rpx;
          font-weight: bold;
          color: #373741;
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
              width: 40rpx;
              height: 40rpx;
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

    .noLoginUser {
      width: 50vw;
      margin: 100rpx auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      .avatar-wrap {
        width: 180rpx;
        height: 180rpx;
        background: #fff;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 20rpx;

        img {
          width: 100rpx;
          height: 100rpx;
        }
      }

      span {
        font-size: 32rpx;
        font-weight: 550;
        color: #666;
      }
    }
  }
}
</style>

<template>
  <div class="me">
    <div class="me-header"></div>
    <div class="me-inner">
      <div v-if="appUser.id">
        <div class="user">
          <button
            class="avatar"
            open-type="chooseAvatar"
            :style="{
              backgroundImage: `url(${appUser.avatar})`,
            }"
            @chooseavatar="onChooseAvatar"
          />
          <div class="right">
            <input
              type="nickname"
              placeholder="请输入用户名"
              maxlength="14"
              :value="appUser.nickname"
              @change="onNicknameChange"
            />
            <span class="mobile">{{ appUser.mobile }}</span>
          </div>
        </div>
        <div class="order">
          <h3 class="header" @click="navTo('/pages/order/index')">
            <span>我的订单</span>
            <u-icon name="arrow-right"></u-icon>
          </h3>
          <div class="status">
            <div
              class="status-layer"
              v-for="(status, index) in orderStatusList"
              :key="status.key"
              @click="navTo(`/pages/order/index?index=${index}`)"
            >
              <img
                :src="require(`../../static/images/me/${status.key}.png`)"
                alt=""
              />
              <span>{{ status.label }}</span>
            </div>
          </div>
        </div>
        <div
          class="merchant"
          hover-class="merchant-hover"
          hover-stay-time="150"
          @click="onBeMerchant"
        >
          <div class="left">
            <img :src="require(`@/static/images/me/merchant.png`)" alt="" />
            <span>成为商家</span>
          </div>
          <u-icon name="arrow-right" color="#D8DBDC" />
        </div>
      </div>
      <div v-else class="noLoginUser" open-type="getUserInfo" @click="login">
        <div class="avatar-wrap">
          <img src="../../static/images/me/noLoginUser.png" alt="" />
        </div>
        <span>请登录</span>
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
              <u-tag
                v-if="func.icon == 'opinion' && isRead == 1"
                text="已回复"
                type="error"
                size="mini"
                shape="circle"
              />
            </div>
            <u-icon name="arrow-right" color="#D8DBDC" />
          </div>
        </div>
      </div>
    </div>

    <BindMobile
      v-model="bindMobileModal.visible"
      :userProfile="bindMobileModal.userProfile"
      @getUser="getUserHandler"
    />
  </div>
</template>

<script>
import BindMobile from "@/components/BindMobile";
import loginMixin from "@/mixins/login";
import {
  getServiceMobileRes,
  getMerchantReviewStatusRes,
  updateUserProfileRes,
} from "@/api";

export default {
  name: "Me",

  components: {
    BindMobile,
  },

  mixins: [loginMixin],

  data() {
    return {
      orderStatusList: [
        {
          key: "quoted",
          label: "待报价",
        },
        {
          key: "collected",
          label: "待揽收",
        },
        {
          key: "ship",
          label: "待发货",
        },
        {
          key: "receipt",
          label: "待收货",
        },
        {
          key: "complete",
          label: "已完成",
        },
      ],
      functions: [
        {
          icon: "question",
          label: "常见问题",
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
    async onFunctionClick(key) {
      if (!this.appUser.id) {
        this.toast("请先授权登录");
        return;
      }
      switch (key) {
        case "setting":
          this.navTo("/pages/me/setting");
          break;
        case "question":
          this.navTo("/pages/me/common?type=3");
          break;
        case "customer-service":
          const phoneNumber = await getServiceMobileRes();
          uni.makePhoneCall({
            phoneNumber,
            success: (_) => {},
          });
          break;
      }
    },
    async onBeMerchant() {
      const data = await getMerchantReviewStatusRes();
      if (data && data.apply_id) {
        this.navTo(`/pages/me/review-result?data=${JSON.stringify(data)}`);
      } else {
        this.navTo("/pages/me/merchant");
      }
    },
    async onChooseAvatar(e) {
      const {
        detail: { avatarUrl },
      } = e;
      this.appUser.avatar =
        "data:image/jpeg;base64," +
        uni.getFileSystemManager().readFileSync(avatarUrl, "base64");
      await updateUserProfileRes({ avatar: this.appUser.avatar });
      uni.setStorageSync("APP_USER", this.appUser);
    },
    async onNicknameChange(e) {
      const value = e.detail.value;
      if (value) {
        this.appUser.nickname = this.appUser.username = value;
        await updateUserProfileRes({ nickname: value, username: value });
        uni.setStorageSync("APP_USER", this.appUser);
      }
    },
  },
};
</script>
