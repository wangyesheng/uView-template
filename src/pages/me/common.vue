<template>
  <div class="result">
    <div class="content" v-html="content"></div>
  </div>
</template>

<script>
import {
  getCommonQuestionRes,
  getAboutUSRes,
  getServiceAgreementRes,
} from "@/api";
export default {
  name: "Question",

  data() {
    return {
      content: "",
    };
  },
  methods: {},
  async onLoad({ type }) {
    uni.setNavigationBarTitle({
      title: type == "1" ? "关于平台" : type == 2 ? "服务协议" : "常见问题",
    });
    const data =
      type == 1
        ? await getAboutUSRes()
        : type == 2
        ? await getServiceAgreementRes()
        : await getCommonQuestionRes();
    this.content = data;
  },
};
</script>

<style lang="scss" scoped>
.result {
  width: 100vw;
  min-height: 100vh;
  padding: 30rpx;
  box-sizing: border-box;
  position: relative;
  .content {
    width: 100%;
    padding: 20rpx;
    box-sizing: border-box;
    background-color: #fff;
  }
}
</style>
