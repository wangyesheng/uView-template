<style lang="scss" scoped>
.form-wrap {
  min-height: 100vh;
  padding: 20rpx 40rpx 150rpx;
  box-sizing: border-box;
  background: #f9f9fd;
  position: relative;
  z-index: 9;

  ::v-deep {
    .u-form {
      .u-input__input {
        font-weight: 550;
      }
    }

    .u-numberbox {
      width: 100%;
      display: flex !important;
      input {
        flex: 1 !important;
        width: auto !important;
        height: 80rpx !important;
        font-size: 30rpx !important;
        font-weight: 550 !important;
        color: #383846 !important;
      }
      [class^="u-icon"] {
        height: 80rpx !important;
      }
    }
  }

  .car-number-wrap {
    .car-number-inner {
      display: flex;
      justify-content: space-between;

      .car-number-inner_layer {
        width: 64rpx;
        height: 66rpx;
        line-height: 68rpx;
        text-align: center;
        background: #f2f2f2;
        border-radius: 4rpx;
        border: 2rpx solid #353535;
        font-weight: 550;
      }
    }
  }

  .route-wrap {
    padding: 30rpx 20rpx;
    box-sizing: border-box;

    .title {
      margin-bottom: 30rpx;
      font-size: 36rpx;
      font-weight: 550;
      color: $u-type-primary;
    }

    .station-wrap {
      .station-layer {
        border-bottom: 2rpx solid #e8e8e8;
        padding-bottom: 20rpx;
        margin-bottom: 20rpx;
        display: flex;
        flex-direction: column;

        .name-time {
          display: flex;
          justify-content: space-between;
          font-size: 32rpx;
          color: #353535;
          margin-bottom: 20rpx;

          span:first-child {
            display: inline-block;
            width: 80%;
          }

          span:last-child {
            color: #ff9900;
            font-weight: 550;
          }
        }
      }
    }
  }
  .submit-wrap {
    width: 100%;
    height: 150rpx;
    // border-top: 2rpx solid #c4c4c4;
    box-shadow: 0rpx -5rpx 20rpx #e0e0e0;
    background-color: #fff;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 10;

    ::v-deep {
      .u-btn {
        width: 80%;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
}
</style>

<template>
  <div class="form-wrap">
    <u-form ref="formRef" label-width="auto" :model="formData">
      <u-form-item label="姓名：">
        <u-input disabled v-model="routeInfo.scheduleInfo.driver_name"
      /></u-form-item>
      <u-form-item label="车牌：">
        <div class="car-number-wrap">
          <div class="car-number-inner">
            <div
              class="car-number-inner_layer"
              v-for="(item, i) in routeInfo.scheduleInfo._vehicleNames"
              :key="i"
            >
              {{ item }}
            </div>
          </div>
        </div>
      </u-form-item>
      <u-form-item label="日期：">
        <u-input
          disabled
          type="select"
          v-model="reportDatePicker.selectedTime"
          @click="reportDatePicker.visible = true"
        />
      </u-form-item>
    </u-form>
    <div class="route-wrap">
      <div class="title">{{ routeInfo.scheduleInfo.route_name }}</div>
      <div class="station-wrap">
        <div
          class="station-layer"
          v-for="item in routeInfo.list"
          :key="item.data_id"
        >
          <div class="name-time">
            <span>{{ item.data_name }}</span>
            <span>
              {{ item.traintime }}
            </span>
          </div>
          <u-number-box v-model="item.value" />
        </div>
      </div>
    </div>
    <u-picker
      mode="time"
      v-model="reportDatePicker.visible"
      :default-time="reportDatePicker.selectedTime"
      :params="{
        year: true,
        month: true,
        day: true,
      }"
      :end-year="new Date().getFullYear()"
      @confirm="onDatePickerConfirm"
    />
    <div class="submit-wrap">
      <u-button type="primary" shape="circle" @click="onSubmit">提交</u-button>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import { getRouteInfoRes, createReportDataRes } from "@/api";

export default {
  name: "Form",

  data() {
    return {
      routeInfo: {},
      reportDatePicker: {
        visible: false,
        selectedTime: dayjs().format("YYYY-MM-DD"),
      },
    };
  },

  methods: {
    async getRouteInfo() {
      const data = await getRouteInfoRes({
        group_id: this.group_id,
        schedule_id: this.schedule_id,
      });
      if (data.scheduleInfo) {
        data.scheduleInfo = {
          ...data.scheduleInfo,
          _vehicleNames: data.scheduleInfo.vehicle_name.split(""),
        };
      }

      if (data.list) {
        data.list = data.list.map((x) => ({
          ...x,
          value: 0,
        }));
      }
      this.routeInfo = data;
    },
    onDatePickerConfirm({ year, month, day }) {
      const _time = `${year}-${month}-${day}`;
      this[`reportDatePicker`].selectedTime = dayjs(_time).format("YYYY-MM-DD");
    },
    async onSubmit() {
      uni.showModal({
        title: "确认要提交吗？",
        success: async ({ confirm }) => {
          if (confirm) {
            const data_info = {};
            this.routeInfo.list.forEach((x) => {
              data_info[x.data_id] = x.value;
            });
            const reqData = {
              group_id: this.group_id,
              schedule_id: this.schedule_id,
              report_date: this.reportDatePicker.selectedTime,
              data_info: JSON.stringify(data_info),
            };
            const data = await createReportDataRes(reqData);
            console.log(data);
            this.navTo(`/pages/form/success?report_id=${data.report_id}`);
          }
        },
      });
    },
  },

  onLoad({ group_id = 1, schedule_id = 53 }) {
    this.group_id = group_id;
    this.schedule_id = schedule_id;
    this.getRouteInfo();
  },
};
</script>
