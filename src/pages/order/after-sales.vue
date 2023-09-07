<template>
  <div class="wrap">
    <u-form>
      <u-form-item
        required
        label="售后原因"
        label-width="auto"
        label-position="top"
      >
        <u-input type="textarea" v-model="notes" placeholder="请输入售后原因">
        </u-input>
      </u-form-item>
    </u-form>
    <u-button class="submitBtn" type="primary" shape="circle" @click="onSubmit">
      提交申请
    </u-button>
  </div>
</template>

<script>
import { applyAfterSalesRes } from "@/api";

export default {
  name: "after-sales",

  data() {
    return {
      notes: null,
    };
  },

  methods: {
    async onSubmit() {
      if (!this.notes) {
        this.toast("请输入售后原因");
        return;
      }
      await applyAfterSalesRes({
        order_number: this.order_number,
        notes: this.notes,
      });
    },
  },

  onLoad({ order_number }) {
    this.order_number = order_number;
  },
};
</script>

<style lang="scss" scoped>
.wrap {
  width: 100vw;
  min-height: 100vh;
  padding: 30rpx 50rpx;
  box-sizing: border-box;
  position: relative;

  ::v-deep {
    .u-form-item--left {
      width: auto !important;
    }

    .u-form-item--left__content--required {
      left: -25rpx !important;
      font-size: 30rpx;
      font-weight: 550;
    }

    .u-btn {
      margin-top: 50rpx;
    }
  }
}
</style>
