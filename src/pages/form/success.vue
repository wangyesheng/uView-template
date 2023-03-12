<style lang="scss" scoped>
.success-wrap {
  padding: 200rpx 40rpx 40rpx;
  min-height: 100vh;
  box-sizing: border-box;
  background: #f9f9fd;

  .success-tips {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 100rpx;

    img {
      width: 176rpx;
      height: 176rpx;
      margin-bottom: 30rpx;
    }
    span {
      font-size: 32rpx;
      font-weight: bold;
      color: #2b2b2b;
    }
  }

  ::v-deep {
    .u-btn {
      width: 80%;
    }
  }
}
</style>

<template>
  <div class="success-wrap">
    <div class="success-tips">
      <img src="../../static/images/success.png" alt="" />
      <span>填写完成</span>
    </div>
    <u-button
      plain
      type="primary"
      @click="navTo(`/pages/form/details?report_id=${report_id}`)"
    >
      查看填报内容
    </u-button>
  </div>
</template>

<script>
export default {
  name: "Success",

  data() {
    return {
      report_id: "",
    };
  },

  onLoad({ report_id = 2 }) {
    console.log(report_id);
    this.report_id = report_id;
  },
};
</script>
