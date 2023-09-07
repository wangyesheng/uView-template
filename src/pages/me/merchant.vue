<style lang="scss" scoped>
.merchant {
  width: 100vw;
  min-height: 100vh;
  padding: 50rpx 30rpx;
  box-sizing: border-box;
  position: relative;

  .choose-license {
    width: 100%;
    background: #ffffff;
    border-radius: 16rpx;
    padding: 30rpx 50rpx;
    box-sizing: border-box;

    .header {
      display: flex;
      align-items: center;
      img {
        width: 32rpx;
        height: 32rpx;
        margin-right: 20rpx;
      }
      span {
        font-size: 28rpx;
        font-weight: 400;
        color: #333333;
      }
    }

    .radio-group {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 38rpx;
      .radio {
        width: 230rpx;
        height: 74rpx;
        border: 2rpx solid #d4d4d4;
        border-radius: 12rpx;
        font-size: 24rpx;
        font-weight: 400;
        color: #5c5c5c;
        text-align: center;
        line-height: 74rpx;

        &.active {
          background: #18afc8;
          border: 2rpx solid #18afc8;
          color: #fff;
        }
      }
    }
  }

  .form-wrap {
    margin-top: 30rpx;
    width: 100%;
    background: #ffffff;
    border-radius: 16rpx;
    padding: 30rpx 0 30rpx 50rpx;
    box-sizing: border-box;

    ::v-deep {
      .u-form {
        input {
          text-align: right;
          font-weight: 550;
          color: #333 !important;
        }

        .u-input__right-icon {
          min-width: 50rpx;
        }

        .u-border-bottom:after {
          border-width: 0;
        }

        .u-form-item--left__content--required {
          left: -25rpx !important;
          font-size: 30rpx;
          font-weight: 550;
        }

        .u-form-item--left {
          width: auto !important;
        }

        .u-upload {
          margin-top: 30rpx;
          img {
            width: 468rpx;
            height: 290rpx;
            margin-left: 50rpx;
          }
        }
      }
    }
  }
  ::v-deep {
    .submitBtn {
      .u-btn {
        margin-top: 50rpx;
        width: 90%;
      }
    }
  }
}
</style>
<template>
  <div class="merchant">
    <div class="choose-license">
      <div class="header">
        <img src="../../static/images/merchant-sign.png" alt="" />
        <span>是否有营业执照</span>
      </div>
      <div class="radio-group" @click="onRadioChange">
        <div
          v-for="item in licenseOptions"
          :key="item.value"
          :id="item.value"
          :class="['radio', item.value == formData.is_license ? 'active' : '']"
        >
          {{ item.label }}
        </div>
      </div>
    </div>
    <div class="form-wrap">
      <u-form
        ref="formRef"
        label-width="200"
        :label-style="{
          fontSize: '28rpx',
          fontWeight: '550',
          color: '#3c3c3c',
        }"
        :error-type="['toast']"
        :border-bottom="false"
        :model="formData"
      >
        <u-form-item required label="名称" prop="transport_nick">
          <u-input
            placeholder="名称"
            :clearable="false"
            v-model="formData.transport_nick"
          />
        </u-form-item>
        <u-form-item required label="电话" prop="transport_mobile">
          <u-input
            placeholder="电话"
            :clearable="false"
            v-model="formData.transport_mobile"
          />
        </u-form-item>
        <u-form-item required label="省市区" prop="_region">
          <u-input
            placeholder="省市区"
            :clearable="false"
            v-model="formData._region"
            type="select"
            @click="onShowRegionSelect"
          />
        </u-form-item>
        <u-form-item required label="详细地址" prop="transport_location">
          <u-input
            placeholder="详细地址"
            :clearable="false"
            v-model="formData.transport_location"
          />
        </u-form-item>
        <u-form-item
          required
          label="上传营业执照"
          label-position="top"
          prop="transport_license_image"
          v-if="formData.is_license == 1"
        >
          <u-upload
            ref="uploadRef"
            custom-btn
            del-icon="trash"
            action="https://cxp.tuomuit.com/api/common/upload"
            :max-count="1"
            :multiple="false"
            :header="{
              token: appUser.token,
            }"
            @on-success="(e) => onUploadSuccess(e, 'transport_license_image')"
            @on-remove="onUploadRemove('transport_license_image')"
          >
            <img
              src="../../static/images/upload-license.png"
              alt="upload-license"
              slot="addBtn"
            />
          </u-upload>
        </u-form-item>
        <u-form-item
          required
          label="上传驾驶证"
          label-position="top"
          prop="transport_license_image"
          v-else
        >
          <u-upload
            ref="uploadRef"
            custom-btn
            del-icon="trash"
            action="https://cxp.tuomuit.com/api/common/upload"
            :max-count="1"
            :multiple="false"
            :header="{
              token: appUser.token,
            }"
            @on-success="(e) => onUploadSuccess(e, 'transport_license_image')"
            @on-remove="onUploadRemove('transport_license_image')"
          >
            <img
              src="../../static/images/upload-drive.png"
              alt="upload-license"
              slot="addBtn"
            />
          </u-upload>
        </u-form-item>
        <u-form-item
          required
          label="上传身份证"
          label-position="top"
          prop="transport_idcard_image"
        >
          <u-upload
            ref="uploadRef"
            custom-btn
            del-icon="trash"
            action="https://cxp.tuomuit.com/api/common/upload"
            :max-count="1"
            :multiple="false"
            :header="{
              token: appUser.token,
            }"
            @on-success="(e) => onUploadSuccess(e, 'transport_idcard_image')"
            @on-remove="onUploadRemove('transport_idcard_image')"
          >
            <img
              src="../../static/images/upload-idcard.png"
              alt="upload-license"
              slot="addBtn"
            />
          </u-upload>
        </u-form-item>
      </u-form>
    </div>
    <u-button class="submitBtn" type="primary" shape="circle" @click="onSubmit">
      提交审核
    </u-button>
    <u-picker
      confirm-color="#75e3de"
      v-model="regionVisible"
      mode="region"
      @confirm="onRegionConfirm"
    />
  </div>
</template>

<script>
import { merchantApplyRes } from "@/api";
export default {
  name: "TobeMerchant",

  data() {
    const appUser = this.getAppUser();
    return {
      appUser,
      licenseOptions: [
        { label: "有营业执照", value: 1 },
        { label: "没有营业执照", value: 0 },
      ],
      regionVisible: false,
      formData: {
        transport_nick: null,
        transport_mobile: null,
        transport_location: null,
        transport_license_image: null, //营业执照
        transport_idcard_image: null, // 身份证
        transport_country: "中国",
        transport_province: null,
        transport_city: null,
        transport_area: null,
        is_license: 1,
        _region: null,
      },
      formRules: {
        transport_nick: [
          {
            required: true,
            message: "请输入名称",
            trigger: ["change", "blur"],
          },
        ],
        transport_mobile: [
          {
            required: true,
            message: "请输入电话",
            trigger: ["change", "blur"],
          },
        ],
        _region: [
          {
            required: true,
            message: "请选择省市区",
            trigger: ["change", "blur"],
          },
        ],
        transport_location: [
          {
            required: true,
            message: "请输入详细地址",
            trigger: ["change", "blur"],
          },
        ],
        transport_license_image: [
          {
            required: true,
            message: "请上传营业执照",
            trigger: ["change", "blur"],
          },
        ],
        transport_idcard_image: [
          {
            required: true,
            message: "请上传身份证",
            trigger: ["change", "blur"],
          },
        ],
      },
    };
  },

  watch: {
    "formData.is_license"(n) {
      if (n == 1) {
        this.formRules.transport_license_image[0].message = "请上传营业执照";
      } else {
        this.formRules.transport_license_image[0].message = "请上传驾驶证";
      }
    },
  },

  methods: {
    onSubmit() {
      this.$refs.formRef.validate(async (valid) => {
        if (valid) {
          const reqData = {
            ...this.formData,
          };
          delete reqData._region;
          await merchantApplyRes(reqData);
          this.navTo("/pages/me/review-result");
        }
      });
    },
    onRadioChange(e) {
      const id = e.target.id;
      if (id) {
        this.formData.is_license = Number(id);
      }
    },
    onUploadSuccess(result, type) {
      this.formData[type] = result.data.fullurl;
    },
    onUploadRemove(type) {
      this.formData[type] = null;
    },
    onShowRegionSelect() {
      this.regionVisible = true;
    },
    onRegionConfirm({ area, city, province }) {
      this.formData._region = province.label + city.label + area.label;
      this.formData.transport_province = province.label;
      this.formData.transport_city = city.label;
      this.formData.transport_area = area.label;
    },
  },

  onReady() {
    this.$refs.formRef.setRules(this.formRules);
  },
};
</script>
