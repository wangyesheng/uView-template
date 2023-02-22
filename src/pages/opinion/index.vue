<style lang="scss" scoped>
.opinion-wrap {
  min-height: 100vh;
  background: #f9f9fd;
  padding: 50rpx 30rpx 0;
  box-sizing: border-box;

  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;

    & > div {
      display: flex;
      align-items: center;

      & :first-child {
        margin-right: 14rpx;
      }
    }
    .left {
      font-size: 32rpx;
      font-weight: bold;
      color: #383846;
      img {
        width: 34rpx;
        height: 34rpx;
      }
    }

    .right {
      font-size: 26rpx;
      font-weight: 400;
      color: #383846;
      img {
        width: 12rpx;
        height: 16rpx;
      }
    }
  }

  .form-wrap {
    .form-item {
      position: relative;
      margin-top: 36rpx;

      .tips {
        position: absolute;
        top: 360rpx;
        right: 24rpx;
        font-size: 24rpx;
        font-weight: 400;
        color: #383846;
      }

      .mobile {
        width: 20rpx;
        height: 28rpx;
        position: absolute;
        top: 52rpx;
        left: 26rpx;
      }
    }
  }

  ::v-deep {
    .u-input__textarea {
      height: 420rpx !important;
      background: #f5f5f6;
      border-radius: 8rpx;
      padding: 38rpx 24rpx !important;
      box-sizing: border-box;
    }

    .u-input__input {
      height: 82rpx;
      background: #f5f5f6;
      border-radius: 4rpx;
      padding: 24rpx 62rpx;
      font-size: 30rpx;
    }

    .u-upload {
      .custom-upload {
        display: flex;
        flex-direction: column;
        align-items: center;

        .icon-upload {
          width: 66rpx;
          height: 48rpx;
          margin-bottom: 14rpx;
        }

        span {
          font-size: 26rpx;
          font-weight: 400;
          color: #868686;
        }
      }
    }

    .u-btn--primary {
      width: 90%;
      margin: 100rpx auto 0;
      height: 100rpx;
    }
  }
}
</style>

<template>
  <div class="opinion-wrap">
    <div class="title">
      <div class="left">
        <span>反馈问题</span>
        <img src="../../static/images/me/icon-question.png" alt="" />
      </div>
      <div class="right" @click="navTo(`/pages/opinion/me`)">
        <span>我的反馈</span>
        <img src="../../static/images/me/icon-arrow-right.png" alt="" />
      </div>
    </div>
    <div class="form-wrap">
      <div class="form-item">
        <u-input
          type="textarea"
          maxlength="200"
          placeholder="请输入200字以内的意见"
          v-model="formData.content"
        />
        <span class="tips">0/200</span>
      </div>
      <div class="form-item">
        <u-input
          maxlength="11"
          placeholder="请输入手机号"
          v-model="formData.mobile"
        />
        <img
          class="mobile"
          src="../../static/images/me/icon-mobile.png"
          alt=""
        />
      </div>
      <div class="form-item">
        <u-upload
          ref="uploadRef"
          custom-btn
          action="https://zhonghai.tuomuit.com/api/common/upload"
          :header="{
            token: appUser.token,
          }"
          @on-success="onUploadSuccess"
          @on-remove="onUploadRemove"
          @on-error="onUploadError"
        >
          <div class="custom-upload" slot="addBtn">
            <img
              class="icon-upload"
              src="../../static/images/me/icon-upload.png"
              alt=""
            />
            <span>选择图片</span>
          </div>
        </u-upload>
      </div>
      {{ error }}
      <u-button type="primary" shape="circle" @click="onSubmit">提交</u-button>
    </div>
  </div>
</template>

<script>
import { createOpinionRes } from "@/api";

export default {
  name: "opinion",

  data() {
    return {
      appUser: this.getAppUser(),
      formData: {
        content: "",
        mobile: "",
        images: [],
      },
      error: "",
    };
  },

  methods: {
    onUploadSuccess(response) {
      this.formData.images.push(response.data.fullurl);
    },
    onUploadRemove(index, result) {
      this.formData.images = result.map((x) => x.response.data.fullurl);
    },
    onUploadError(...args) {
      this.error = JSON.stringify(args);
    },
    async onSubmit() {
      const { content, mobile, images } = this.formData;
      if (!content) {
        this.toast("请输入反馈意见");
        return;
      }
      if (!mobile) {
        this.toast("请输入手机号");
        return;
      }
      const reqData = { content, mobile, images: images.join(",") };
      await createOpinionRes(reqData);
      this.formData = {
        content: "",
        mobile: "",
        images: [],
      };
      this.$refs.uploadRef && this.$refs.uploadRef.clear();
      this.toast("反馈成功");
    },
  },
};
</script>
