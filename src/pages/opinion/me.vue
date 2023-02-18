<style lang="scss" scoped>
.my-opinion-wrap {
  height: 100vh;
  background: #f9f9fd;
  padding: 48rpx 30rpx 0;
  box-sizing: border-box;

  .opinion-layer {
    height: 354rpx;
    background: #ffffff;
    border-radius: 34rpx;

    &-header {
      height: 92rpx;
      padding-left: 34rpx;
      padding-right: 20rpx;
      border-bottom: 2rpx solid #f0f0f0;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .mobile {
        font-size: 32rpx;
        font-weight: bold;
        color: #30303b;
      }

      .time {
        font-size: 24rpx;
        font-weight: 400;
        color: #30303b;
      }
    }

    &-content {
      box-sizing: border-box;
      padding: 28rpx 34rpx 30rpx 28rpx;

      .cont {
        font-size: 22rpx;
        font-weight: 400;
        color: #30303b;
        line-height: 32rpx;
      }
    }
  }
}
</style>

<template>
  <div class="my-opinion-wrap">
    <div class="opinion-layer">
      <div class="opinion-layer-header">
        <span class="mobile">18816200821</span>
        <span class="time"> 2022-02-23 15:30 </span>
      </div>
      <div class="opinion-layer-content">
        <p class="cont">
          晚上看撒开手机卡健身卡就是卡健身卡家备份晚上看撒开手机卡健身卡就是卡健身卡家备份晚上看撒开手机卡健身卡就是卡健身卡
        </p>
        <div class="images-wrap"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "my-opinion",
};
</script>
