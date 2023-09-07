<template>
  <div class="result">
    <div class="status">
      <img
        :src="
          require(`../../static/images/${reviewStatus.value || 'wait'}.png`)
        "
        alt=""
      />
      <span>{{ reviewStatus.label || "待审核" }}</span>
    </div>
    <div class="basic" v-if="applyInfo.apply_id">
      <div class="basic-layer">
        <span>是否有营业执照</span>
        <span>{{ applyInfo.is_license == 1 ? "是" : "否" }}</span>
      </div>
      <div class="basic-layer">
        <span>名称</span>
        <span>{{ applyInfo.transport_nick }}</span>
      </div>
      <div class="basic-layer">
        <span>电话</span>
        <span>{{ applyInfo.transport_mobile }}</span>
      </div>
      <div class="basic-layer">
        <span>省市区</span>
        <span>
          {{
            `${applyInfo.transport_province}-${applyInfo.transport_city}-${applyInfo.transport_area}`
          }}
        </span>
      </div>
      <div class="basic-layer">
        <span>{{ applyInfo.is_license == 1 ? "营业执照" : "驾驶证" }}</span>
        <image
          mode="aspectFill"
          :src="applyInfo.transport_license_image"
          alt=""
        />
      </div>
      <div class="basic-layer">
        <span>身份证</span>
        <image
          mode="aspectFill"
          :src="applyInfo.transport_idcard_image"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "review-result",

  data() {
    return {
      applyInfo: {},
    };
  },

  computed: {
    reviewStatus() {
      let scope = {};
      if (this.applyInfo.is_check == 0) {
        scope.value = "wait";
        scope.label = "待审核";
      } else if (this.applyInfo.is_check == 1) {
        scope.value = "success";
        scope.label = "已通过";
      } else if (this.applyInfo.is_check == 2) {
        scope.value = "reject";
        scope.label = "已拒绝";
      }
      return scope;
    },
  },

  async onLoad({ data }) {
    if (data) {
      data = JSON.parse(data);
      this.applyInfo = data;
    }
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
  .status {
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 30rpx;
    box-sizing: border-box;

    img {
      width: 176rpx;
      height: 176rpx;
    }

    span {
      color: #6e757a;
      font-size: 30rpx;
      margin-top: 20rpx;
    }
  }

  .basic {
    margin-top: 30rpx;
    background: #fff;
    border-radius: 16rpx;

    &-layer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 30rpx 20rpx;
      box-sizing: border-box;

      &:not(:last-child) {
        border-bottom: 2rpx solid #eff1f5;
      }

      span:nth-child(1) {
        font-size: 24rpx;
        font-weight: 400;
        color: #999a9e;
        display: inline-block;
      }

      span:nth-child(2) {
        font-size: 28rpx;
        color: #333333;
        display: inline-block;
        width: 480rpx;
        text-align: right;
      }

      image {
        width: 120rpx;
        height: 120rpx;
        border-radius: 10rpx;
      }
    }
  }
}
</style>
