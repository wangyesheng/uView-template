<style lang="scss" scoped>
.header {
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

  .header-inner {
    height: 100%;
    display: flex;
    flex-direction: column;

    &_title {
      font-size: 44rpx;
      font-weight: bold;
      color: #252828;

      p {
        margin-bottom: 20rpx;
        width: 176rpx;
        position: relative;
        z-index: 1;

        &::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          height: 14rpx;
          background: #c3eeeb;
          z-index: -1;
        }
      }
    }

    .select-wrap {
      margin-top: 100rpx;
      .select-item {
        height: 120rpx;
        background: #f8f9fb;
        border-radius: 8rpx;
        padding-left: 34rpx;
        padding-right: 42rpx;
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
            font-size: 32rpx;
            font-weight: bold;
            color: #383846;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            display: inline-block;
            width: calc(100% - 60rpx);
          }
        }

        &-hover {
          background: #f2f2f3;
        }
      }
    }
  }
}
.content {
  padding: 0 30rpx;
  box-sizing: border-box;

  .btn-history {
    margin-top: 80rpx;
    width: 100%;
    height: 120rpx;
    border-radius: 12rpx;
    border: 2rpx solid #326cbc;
    font-size: 36rpx;
    font-weight: bold;
    color: #326cbc;
    line-height: 120rpx;
    text-align: center;

    &-hover {
      background: #ebf1f8;
    }
  }
}

.role-type {
  width: 100%;
  height: 120rpx;
  background: linear-gradient(130deg, #6db2e7 0%, #306abb 100%);
  border-radius: 12rpx;
  margin-top: 80rpx;
  display: flex;
  align-items: center;

  &-hover {
    background: linear-gradient(130deg, #51a1df 0%, #2260b6 100%);
  }

  img.staff {
    width: 58rpx;
    height: 44rpx;
    margin-left: 76rpx;
  }

  img {
    width: 40rpx;
    height: 48rpx;
    margin-left: 92rpx;
  }

  span {
    font-size: 36rpx;
    font-weight: bold;
    color: #ffffff;
    margin-left: 128rpx;
  }
}

.content.noLogin {
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  .role-type {
    width: 100%;
    display: flex;
    justify-content: center;

    span {
      margin-left: 0;
    }
  }
}
</style>

<template>
  <app-layout>
    <div class="header" :style="{ paddingTop: headerPaddingTop + 'px' }">
      <div class="header-inner">
        <div class="header-inner_title">
          <p>乘车数据</p>
          <p>报告平台</p>
        </div>
        <div class="select-wrap" v-if="appUser.id">
          <div
            class="select-item"
            hover-class="select-item-hover"
            hover-stay-time="150"
            @click="onFormItemClick"
          >
            <div class="left">
              <span>
                {{ currentRegion.name ? currentRegion.name : "请选择班次" }}
              </span>
            </div>
            <u-icon
              color="#000"
              name="arrow-down-fill"
              :custom-style="{ width: '32rpx', height: '16rpx' }"
            />
          </div>
        </div>
        <div
          v-if="appUser.id"
          class="role-type"
          hover-class="role-type-hover"
          hover-stay-time="150"
          @click="onNavTo(2)"
        >
          <img
            class="staff"
            src="../../static/images/home/icon-staff.png"
            alt=""
          />
          <span>员工班车</span>
        </div>
      </div>
    </div>
    <div class="content" v-if="appUser.id">
      <div
        class="role-type"
        hover-class="role-type-hover"
        hover-stay-time="150"
        @click="onNavTo(1)"
      >
        <img src="../../static/images/home/icon-tourist.png" alt="" />
        <span>游客巴士</span>
      </div>

      <div
        class="btn-history"
        hover-class="btn-history-hover"
        hover-stay-time="150"
        @click="onNavTo(3)"
      >
        查看历史数据
      </div>
    </div>

    <div class="content noLogin" v-if="!appUser.id">
      <div
        class="role-type"
        hover-class="role-type-hover"
        hover-stay-time="150"
        @click="login"
      >
        <span>立即登录</span>
      </div>
    </div>
    <u-select
      v-model="select.visible"
      :default-value="select.defaultIndex"
      :list="select.data"
      @confirm="onSelectConfirm"
    />

    <BindMobile
      v-model="bindMobileModal.visible"
      :userProfile="bindMobileModal.userProfile"
      @getUser="getUserHandler"
    />
  </app-layout>
</template>

<script>
import BindMobile from "@/components/BindMobile";
import loginMixin from "@/mixins/login";
import { getUserInfoRes } from "@/api";

export default {
  name: "Home",

  mixins: [loginMixin],

  components: {
    BindMobile,
  },

  data() {
    return {
      menuButtonInfo: {},
      currentRegion: {},
    };
  },

  computed: {
    headerPaddingTop() {
      return this.menuButtonInfo.top + this.menuButtonInfo.height + 30;
    },
  },

  watch: {
    "currentRegion.id"(n, o) {
      if (n && n !== o) {
      }
    },
  },

  methods: {
    onFormItemClick() {
      if (this.appUser.is_check != 1) {
        this.toast("账号暂未通过审核，请联系管理员");
        return;
      }
      const { id, scrollTop } = this.currentRegion;
      if (id) this.navTo(`/pages/data/region?id=${id}&scrollTop=${scrollTop}`);
      else this.navTo("/pages/data/region");
    },

    getCurrentRegionData(scope) {
      this.currentRegion = scope;
    },

    onNavTo(id) {
      if (this.appUser.is_check != 1) {
        this.toast("账号暂未通过审核，请联系管理员");
        return;
      }
      if (id === 3) {
        this.navTo(`/pages/data/report`);
        return;
      }
      if (!this.currentRegion.id) {
        this.toast("请先选择地区");
        return;
      }
      this.navTo(
        `/pages/data/route?group_id=${id}&region_id=${this.currentRegion.id}`
      );
    },
  },

  async onLoad() {
    uni.getSystemInfo({
      success: () => {
        this.menuButtonInfo = uni.getMenuButtonBoundingClientRect();
      },
    });
    const _appUser = this.getAppUser();
    if (_appUser.id) {
      const data = await getUserInfoRes();
      const newUser = {
        ..._appUser,
        is_check: data.is_check,
      };
      uni.setStorageSync("APP_USER", newUser);
      this.appUser = newUser;
    }
  },
};
</script>
