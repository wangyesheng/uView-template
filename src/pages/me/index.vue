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
          margin-bottom: 14rpx;
          font-size: 36rpx;
          font-weight: bold;
          color: #373741;
        }

        .tags {
          ::v-deep {
            .u-tag {
              margin-right: 20rpx;
            }
          }
          // width: 106rpx;
          // height: 28rpx;
          // background: ;
          // background-image: url(https://zhonghai.tuomuit.com/assets/wechat/img/banner-bg.jpg);
          // background-repeat: no-repeat;
          // background-size: 100% 100%;
          // font-size: 20rpx;
          // font-weight: 400;
          // color: #dbdde7;
          // text-align: center;
          // line-height: 28rpx;
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
      margin-top: 56rpx;

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
      position: absolute;
      right: 46rpx;
      top: 138rpx;
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
        <div class="user" v-if="appUser.id">
          <button
            class="avatar"
            open-type="chooseAvatar"
            :style="{
              backgroundImage: `url(${appUser.avatar})`,
            }"
            @chooseavatar="onChooseAvatar"
          />
          <div class="right">
            <span class="mobile">{{ appUser.mobile }}</span>
            <div class="tags">
              <u-tag :text="appUser.role" mode="dark" />
              <u-tag
                mode="light"
                :text="
                  appUser.is_check == 0
                    ? '待审核'
                    : appUser.is_check == 1
                    ? '已审核'
                    : '审核不通过'
                "
                :type="
                  appUser.is_check == 0
                    ? 'info'
                    : appUser.is_check == 1
                    ? 'success'
                    : 'error'
                "
              />
            </div>
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
  </app-layout>
</template>

<script>
import BindMobile from "@/components/BindMobile";
import loginMixin from "@/mixins/login";
import { getCustomerPhoneRes, updateUserProfileRes } from "@/api";

export default {
  name: "Me",

  components: {
    BindMobile,
  },

  mixins: [loginMixin],

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
      if (!this.appUser.id) {
        this.toast("请先授权登录");
        return;
      }
      switch (key) {
        case "setting":
          this.navTo("/pages/me/setting");
          break;
        case "opinion":
          this.navTo("/pages/opinion/index");
          break;
        case "customer-service":
          this.processCustomer();
          break;
      }
    },
    async processCustomer() {
      const data = await getCustomerPhoneRes();
      uni.makePhoneCall({
        phoneNumber: data,
        success: (_) => {},
      });
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
  },
};
</script>
