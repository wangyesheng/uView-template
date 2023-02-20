<style lang="scss"></style>

<template>
  <u-popup mode="center" :value="value" @close="$emit('input', false)">
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
</template>

<script>
import { decryUserPhoneRes, checkLoginRes } from "@/api";

export default {
  name: "BindMobile",

  props: {
    value: {
      type: Boolean,
      default: false,
    },
    userProfile: {
      type: Object,
      default: () => ({}),
    },
  },

  methods: {
    async onGetPhoneNumber({ detail: { encryptedData: encrypted_data, iv } }) {
      const { data, openid } = await decryUserPhoneRes({
        encrypted_data,
        iv,
        code: this.userProfile.code,
      });
      await this.checkLogin(JSON.parse(data), openid);
    },
    async checkLogin(phoneInfo, openid) {
      const reqData = {
        openid,
        nickname: this.userProfile.current.nickName,
        avatar: this.userProfile.current.avatarUrl,
        mobile: phoneInfo.phoneNumber,
      };
      const { userinfo } = await checkLoginRes(reqData);
      uni.setStorageSync("APP_USER", userinfo);
      this.$emit("getUser", userinfo);
      this.$emit("input", false);
    },
  },
};
</script>
