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
      .u-form-item {
        padding: 20rpx;
        border-radius: 10rpx;
        border: 2rpx solid #f9f9fd;
      }
      u-form-item.active {
        .u-form-item {
          border: 2rpx solid #ff0000;
        }
      }

      .u-input__input {
        font-weight: 550;
        font-size: 32rpx;
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
      <u-form-item
        label="姓名："
        :class="hadNotWriteDriverName ? 'active' : ''"
        :label-style="{
          fontSize: '32rpx',
          fontWeight: 550,
        }"
      >
        <u-input placeholder="请输入司机姓名" v-model="driver_name" />
      </u-form-item>
      <u-form-item
        label="实际达到时间："
        :class="hadNotWriteArrivedTime ? 'active' : ''"
        :label-style="{ fontSize: '32rpx', fontWeight: 550 }"
      >
        <u-input
          disabled
          v-model="arrivedTimePicker.selectedTime"
          placeholder="请选择实际到达时间"
          @click="onShowDatePicker"
        />
      </u-form-item>
      <u-form-item
        label="日期："
        :label-style="{ fontSize: '32rpx', fontWeight: 550 }"
      >
        <u-input disabled v-model="reportDatePicker.selectedTime" />
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
      v-model="arrivedTimePicker.visible"
      :default-time="arrivedTimePicker.selectedTime"
      :params="{
        hour: true,
        minute: true,
      }"
      @confirm="onDatePickerConfirm"
    />
    <div class="submit-wrap">
      <u-button type="primary" shape="circle" @click="onSubmit">提交</u-button>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import {
  getRouteInfoRes,
  createReportDataRes,
  getReportByIdRes,
  updateReportDataRes,
} from "@/api";

export default {
  name: "Form",

  data() {
    return {
      driver_name: "",
      routeInfo: {},
      reportDatePicker: {
        visible: false,
        selectedTime: dayjs().format("YYYY-MM-DD"),
      },
      arrivedTimePicker: {
        visible: false,
        selectedTime: "",
      },
      report: {},
      hadNotWriteDriverName: false,
      hadNotWriteArrivedTime: false,
    };
  },

  methods: {
    async getReport() {
      const data = await getReportByIdRes(this.report_id);
      this.report = data;
    },
    async getRouteInfo() {
      const data = await getRouteInfoRes({
        group_id: this.group_id,
        schedule_id: this.schedule_id,
      });
      if (this.report.info) {
        this.driver_name = this.report.info.driver_name;
        this.reportDatePicker.selectedTime = this.report.info.report_date;
        this.arrivedTimePicker.selectedTime = dayjs(
          this.report.info.arrived_time
        ).format("HH:mm");
      }

      if (data.list) {
        data.list = data.list.map((x) => {
          const target = {
            ...x,
            value: 0,
          };
          if (this.report.items) {
            const scope = this.report.items.find(
              (y) => y.station_id === x.data_id
            );
            target.value = scope.report_num || 0;
          }
          return target;
        });
      }
      this.routeInfo = data;
    },
    onShowDatePicker() {
      this.arrivedTimePicker.visible = true;
    },
    onDatePickerConfirm({ hour, minute }) {
      const _time = `${hour}:${minute}`;
      this[`arrivedTimePicker`].selectedTime = _time;
    },
    async onSubmit() {
      if (!this.driver_name) {
        this.hadNotWriteDriverName = true;
        setTimeout(() => {
          this.hadNotWriteDriverName = false;
        }, 3000);
        this.toast("请输入司机姓名");
        uni.vibrateShort();
        return;
      }

      if (!this.arrivedTimePicker.selectedTime) {
        this.hadNotWriteArrivedTime = true;
        setTimeout(() => {
          this.hadNotWriteArrivedTime = false;
        }, 3000);
        this.toast("请选择实际到达时间");
        uni.vibrateShort();
        return;
      }
      uni.showModal({
        title: "确认要提交吗？",
        success: async ({ confirm }) => {
          if (confirm) {
            const data_info = {};
            this.routeInfo.list.forEach((x) => {
              data_info[x.data_id] = x.value;
            });

            const reqData = {
              driver_name: this.driver_name,
              report_date: this.reportDatePicker.selectedTime,
              arrived_time: this.arrivedTimePicker.selectedTime,
              data_info: JSON.stringify(data_info),
            };
            if (this.report_id) {
              reqData.report_id = this.report_id;
            } else {
              reqData.group_id = this.group_id;
              reqData.schedule_id = this.schedule_id;
            }

            const data = this.report_id
              ? await updateReportDataRes(reqData)
              : await createReportDataRes(reqData);
            if (!this.report_id) {
              this.navTo(`/pages/form/success?report_id=${data.report_id}`);
            } else {
              this.toast("编辑成功");
              uni.navigateBack();
            }
          }
        },
      });
    },
  },

  async onLoad({ group_id, schedule_id, report_id }) {
    this.group_id = group_id;
    this.schedule_id = schedule_id;
    if (report_id) {
      this.report_id = report_id;
      uni.setNavigationBarTitle({
        title: "编辑",
      });
      await this.getReport();
    }

    await this.getRouteInfo();
  },
};
</script>
