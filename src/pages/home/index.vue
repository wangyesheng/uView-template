<style lang="scss" scoped>
.header {
  height: 572rpx;
  background: linear-gradient(
    180deg,
    #148ddc 0%,
    #67c8f9 40%,
    rgba(86, 255, 174, 0) 100%
  );
  padding: 0 30rpx;
  box-sizing: border-box;

  .header-inner {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    ::v-deep {
      .u-search {
        height: 68rpx;
        background: #f6f9fb;
        border-radius: 34rpx;
        padding-right: 22rpx;

        .u-content,
        .u-input {
          background-color: #f6f9fb !important;
        }

        .u-content {
          padding-left: 76rpx;
          padding-right: 0;
          .u-icon__icon {
            color: #babdc3 !important;
          }
        }
      }
    }
    .banner {
      height: 338rpx;
      background: #f5f5f5;
      border-radius: 24rpx;
    }
  }
}
.content {
  margin-top: 40rpx;
  padding: 0 30rpx;
  box-sizing: border-box;

  .order-form-wrap {
    width: 100%;
    background: #fff;
    border-radius: 34px;
    padding-top: 46rpx;
    padding-left: 44rpx;
    padding-right: 44rpx;
    padding-bottom: 40rpx;
    box-sizing: border-box;

    .title {
      display: flex;
      align-items: center;
      margin-bottom: 54rpx;

      img {
        width: 30rpx;
        height: 36rpx;
        margin-right: 16rpx;
      }
      span {
        font-size: 32rpx;
        font-weight: bold;
        color: #383846;
        line-height: 44rpx;
      }
    }

    .order-form-item {
      height: 90rpx;
      background: #f8f9fb;
      border-radius: 8rpx;
      padding-left: 34rpx;
      padding-right: 42rpx;
      margin-bottom: 20rpx;
      display: flex;
      align-items: center;

      .left {
        width: 90%;
        display: flex;
        align-items: center;
        margin-right: auto;

        img {
          width: 44rpx;
          height: 40rpx;
          margin-right: 16rpx;
        }

        span {
          font-size: 26rpx;
          font-weight: bold;
          color: #383846;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          display: inline-block;
          width: calc(100% - 60rpx);
        }
      }
    }

    ::v-deep {
      .u-btn--primary {
        margin-top: 42rpx;
        height: 98rpx;
        background: linear-gradient(180deg, #5bb3ed 0%, #158edc 100%);
      }

      .u-primary-hover {
        background: linear-gradient(
          180deg,
          #55b3f1 0%,
          #0d8ce0 100%
        ) !important;
      }
    }
  }
}

::v-deep {
  .u-mode-center-box {
    width: 80vw !important;
    margin: 0 auto;
    border-radius: 20rpx;
    padding: 40rpx;
    box-sizing: border-box;

    .btn-mobile-inner {
      display: flex;
      align-items: center;
    }

    .title {
      font-size: 32rpx;
      margin-bottom: 30rpx;
      text-align: center;
      color: #666;
      font-weight: 500;
    }
    .tips {
      color: #6b6b6b;
      font-size: 30rpx;
      font-weight: 500;
      margin-bottom: 50rpx;
    }

    .u-btn--success {
      img {
        width: 48rpx;
        height: 48rpx;
      }
      span {
        margin-left: 20rpx;
      }
    }
  }
}
</style>

<template>
  <app-layout>
    <div class="header" :style="{ paddingTop: menuButtonInfo.top + 'px' }">
      <div class="header-inner">
        <u-search
          placeholder="输入关键字"
          placeholder-color="#babdc3"
          v-model="searchKey"
          :excludeWidth="menuButtonInfo.width + 6"
          :action-style="{
            width: '88rpx',
            height: '34rpx',
            background: '#158EDC',
            lineHeight: '34rpx',
            textAlign: 'center',
            borderRadius: '4rpx',
            color: '#FDFEFF',
            fontSize: '18rpx',
          }"
          @custom="onSerchByKey"
          @search="onSerchByKey"
        />
        <div class="banner"></div>
      </div>
    </div>
    <div class="content">
      <div class="order-form-wrap">
        <div class="title">
          <img src="../../static/images/home/icon-title.png" alt="" />
          <span>CDF免费穿梭巴士预约</span>
        </div>
        <div class="order-form-inner">
          <div
            class="order-form-item"
            v-for="item in orderFormItems"
            :key="item.key"
            @click="onFormItemClick(item)"
          >
            <div class="left">
              <img
                :src="require(`../../static/images/home/icon-${item.key}.png`)"
                alt=""
              />
              <span>
                <!-- {{
                  hotelPopup.activeHotelName
                    ? hotelPopup.activeHotelName
                    : "选择免税店"
                }} -->
                {{ item.label }}
              </span>
            </div>
            <u-icon
              color="#000"
              name="arrow-down-fill"
              :custom-style="{ width: '32rpx', height: '16rpx' }"
            />
          </div>
        </div>
        <!-- <u-button
          type="primary"
          shape="circle"
          open-type="getPhoneNumber"
          @getphonenumber="onGetPhoneNumber"
          v-if="!appUser.id"
        >
          立即预约
        </u-button> -->
        <u-button
          type="primary"
          shape="circle"
          open-type="getUserInfo"
          @click="onLogin"
          v-if="!appUser.id"
        >
          立即预约
        </u-button>
        <u-button type="primary" shape="circle" v-else @click="onOrderSubmit">
          立即预约
        </u-button>
      </div>
    </div>
    <Popup v-model="hotelPopup.visible" @getData="getHotelData" />

    <u-popup v-model="applyMobileModal.visible" mode="center">
      <div class="title">提示：</div>
      <div class="tips">为更好的向您提供服务，申请获取您的手机号！</div>
      <u-button
        shape="circle"
        type="success"
        open-type="getPhoneNumber"
        @getphonenumber="onGetPhoneNumber"
      >
        <div class="btn-mobile-inner">
          <img src="../../static/images/home/icon-wechat.png" alt="" />
          <span>获取手机号</span>
        </div>
      </u-button>
    </u-popup>
  </app-layout>
</template>

<script>
import Popup from "@/components/Popup";
import loginMixin from "@/mixins/login";

export default {
  name: "Home",

  data() {
    const appUser = uni.getStorageSync("APP_USER") || {};
    return {
      appUser,
      menuButtonInfo: {},
      searchKey: "",
      orderFormItems: [
        {
          key: "hotel",
          label: "选择免税店",
        },
        {
          key: "station",
          label: "选择乘车站",
        },
        {
          key: "time",
          label: "选择乘车时间",
        },
        {
          key: "appointment",
          label: "选择预约人数",
        },
      ],
      hotelPopup: {
        visible: false,
        currentHotel: {},
      },
      applyMobileModal: {
        visible: false,
      },
    };
  },

  mixins: [loginMixin],

  components: {
    Popup,
  },

  methods: {
    onSerchByKey() {
      console.log(this.searchKey);
    },
    onLogin() {
      this.login((result) => {
        this.applyMobileModal.visible = true;
      });
    },
    onFormItemClick(scope) {
      const popupName = `${scope.key}Popup`;
      this[popupName] && (this[popupName].visible = true);
    },
    getHotelData(hotel) {
      this.hotelPopup.currentHotel = hotel;
    },
    onGetPhoneNumber(e) {
      console.log(e);
    },
    onOrderSubmit() {},
  },
  async onLoad() {
    uni.getSystemInfo({
      success: () => {
        this.menuButtonInfo = uni.getMenuButtonBoundingClientRect();
      },
    });
  },
};
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
