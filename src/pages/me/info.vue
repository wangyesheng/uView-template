<style lang="scss" scoped>
.header {
  text-align: center;
  font-size: 30rpx;
  font-weight: 550;
}

.cont {
  padding: 20rpx;
}
</style>

<template>
  <div class="info-wrap">
    <div class="cont" v-html="info"></div>
  </div>
</template>

<script>
import { getAgreementRes, getAboutRes } from "@/api";

export default {
  name: "Info",

  data() {
    return { menuButtonInfo: {}, type: "", info: "" };
  },

  async onLoad({ type }) {
    this.type = type;
    uni.setNavigationBarTitle({
      title: type === "about" ? "关于平台" : "服务协议",
    });
    uni.getSystemInfo({
      success: () => {
        this.menuButtonInfo = uni.getMenuButtonBoundingClientRect();
      },
    });
    const data =
      type === "about" ? await getAboutRes() : await getAgreementRes();
    this.info = data;
  },
};
</script>
