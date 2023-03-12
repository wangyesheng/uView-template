<style lang="scss" scoped>
.details-wrap {
  padding: 40rpx;
  min-height: 100vh;
  box-sizing: border-box;
  position: relative;
  background: #f9f9fd;

  .report-wrap {
    .title {
      font-size: 36rpx;
      font-weight: bold;
      color: #296ac9;
      margin-bottom: 20rpx;
    }

    .report-layer {
      margin-bottom: 20rpx;
      .label {
        font-size: 30rpx;
        font-weight: 400;
        color: #868686;
      }

      .value {
        font-size: 32rpx;
        font-weight: bold;
        color: #363636;
      }
    }
  }

  .back {
    position: fixed;
    right: 40rpx;
    bottom: 200rpx;
    width: 120rpx;
    height: 120rpx;
    background: #fff;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 10rpx 20rpx #d6d6d6;

    &-hover {
      background: #e9f1fc;
    }

    img {
      width: 64rpx;
      height: 64rpx;
    }
  }
}
</style>

<template>
  <div class="details-wrap">
    <div class="report-wrap">
      <div class="report-layer">
        <span class="label">司机：</span>
        <span class="value">{{ report.info.driver_name }}</span>
      </div>
      <div class="report-layer">
        <span class="label">车牌：</span>
        <span class="value">{{ report.info.vehicle_name }}</span>
      </div>
      <div class="report-layer">
        <span class="label">日期：</span>
        <span class="value">{{ report.info.report_date }}</span>
      </div>
      <div class="title">
        {{ report.info.route_name }}
      </div>

      <div class="report-layer" v-for="(item, i) in report.items" :key="i">
        <span class="label">{{ item.station_name }}：</span>
        <span class="value">{{ item.report_num }}人</span>
      </div>
    </div>
    <div
      class="back"
      hover-class="back-hover"
      hover-stay-time="150"
      @click="navTo('/pages/home/index')"
    >
      <img src="../../static/images/home.png" alt="" />
    </div>
  </div>
</template>

<script>
import { getReportByIdRes } from "@/api";

export default {
  name: "ReportInfo",

  data() {
    return {
      report: {},
    };
  },

  async onLoad({ report_id = 5 }) {
    const data = await getReportByIdRes(report_id);
    this.report = data;
  },
};
</script>
