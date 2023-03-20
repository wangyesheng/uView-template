<style lang="scss" scoped>
.report-wrap {
  padding: 40rpx;
  min-height: 100vh;
  box-sizing: border-box;
  background: #f9f9fd;

  .report-layer {
    padding: 42rpx 36rpx 20rpx;
    box-sizing: border-box;
    background: #fff;
    border-radius: 34rpx;
    margin-bottom: 20rpx;

    .report-layer_inner {
      display: flex;
      margin-bottom: 20rpx;

      .label {
        font-size: 28rpx;
        font-weight: 400;
        color: #666;
      }

      .value {
        font-size: 30rpx;
        font-weight: 400;
        color: #3e3e4b;
      }
    }

    &_footer {
      border-top: 2rpx solid #eaeaea;
      padding-top: 20rpx;
      overflow: hidden;

      .action {
        float: right;
        display: flex;
      }
      ::v-deep {
        [class^="u-btn"] {
          width: 128rpx;
          height: 50rpx;
          font-size: 22rpx;
        }
        .u-btn--primary {
          background: #3199e2;
          margin-left: 16rpx;
        }
        .u-primary-hover {
          background: #0e7bc9 !important;
        }
        .u-btn--default {
          background: #f2f2f2;
          color: #3e3e4b;
          &::after {
            border-color: #f2f2f2 !important;
          }
        }
        .u-default-hover {
          background: #e0e0e0 !important;
          color: #3e3e4b !important;
        }
      }
    }
  }
}
</style>

<template>
  <div class="report-wrap">
    <div class="report-layer" v-for="item in reports" :key="item.report_id">
      <div class="report-layer_inner">
        <span class="label">线路：</span>
        <span class="value">{{ item.route_name }}</span>
      </div>
      <div class="report-layer_inner">
        <span class="label">班次：</span>
        <span class="value">{{ item.schedule_name }}</span>
      </div>
      <div class="report-layer_inner">
        <span class="label">日期：</span>
        <span class="value">{{ item.report_date }}</span>
      </div>
      <div class="report-layer_inner">
        <span class="label">司机：</span>
        <span class="value">{{ item.driver_name }}</span>
      </div>
      <!-- <div class="report-layer_inner">
        <span class="label">车牌：</span>
        <span class="value">{{ item.vehicle_name }}</span>
      </div> -->
      <div class="report-layer_footer">
        <div class="action">
          <u-button
            shape="circle"
            @click="navTo(`/pages/form/details?report_id=${item.report_id}`)"
          >
            详情
          </u-button>
          <u-button
            shape="circle"
            type="primary"
            @click="
              navTo(
                `/pages/form/index?report_id=${item.report_id}&group_id=${item.group_id}&schedule_id=${item.schedule_id}`
              )
            "
          >
            修改
          </u-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getReportsRes } from "@/api";
export default {
  name: "ReportList",

  data() {
    return {
      reports: [],
    };
  },

  methods: {
    async getReports() {
      const data = await getReportsRes();
      this.reports = data;
    },
  },

  onShow() {
    this.getReports();
  },
};
</script>
