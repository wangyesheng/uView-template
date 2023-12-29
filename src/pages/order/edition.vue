<style lang="scss" scoped>
.order-edition {
  width: 100vw;
  min-height: 100vh;
  position: absolute;
  padding: 30rpx;
  box-sizing: border-box;

  ::v-deep {
    .u-btn {
      width: 90%;
      margin-top: 30rpx;
    }
  }

  .station {
    background: #fff;
    border-radius: 16rpx;
    padding: 30rpx 20rpx;
    box-sizing: border-box;
    margin-bottom: 20rpx;
    .station-layer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      &:nth-child(1) {
        margin-bottom: 30rpx;
      }

      .address {
        display: flex;
        flex-direction: column;
        width: 570rpx;
        margin-left: 30rpx;
        position: relative;

        &::before {
          content: "";
          width: 10rpx;
          height: 10rpx;
          border-radius: 50%;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          left: -30rpx;
        }

        &.start::before {
          background: #49d2b2;
        }

        &.end::before {
          background: #fd9656;
        }
        span {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        span:first-child {
          font-size: 28rpx;
          color: #333;
          margin-bottom: 10rpx;
        }
        span:last-child {
          font-size: 24rpx;
          color: #6e757a;
        }
      }

      &-hover {
        background: #f7f8f9;
      }
    }
  }

  .form-data {
    background: #fff;
    border-radius: 16rpx;
    padding: 20rpx 20rpx 20rpx 55rpx;
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
          left: -35rpx !important;
          font-size: 30rpx;
          font-weight: 550;
        }

        .u-radio-group {
          float: right;
          margin-right: 30rpx;

          .u-radio__label {
            font-weight: 550 !important;
            font-size: 28rpx !important;
            color: #000 !important;
          }
        }

        .cageSizeWrap {
          display: flex;
          justify-content: space-around;

          .u-input {
            margin-left: 10rpx;

            input {
              text-align: center;
            }

            .u-input__right-icon {
              min-width: auto;
            }
          }
        }
      }
    }

    .insurance {
      padding: 30rpx 15rpx 30rpx 0;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .left {
        span:first-child {
          font-size: 28rpx;
          color: #303133;
        }

        span:last-child {
          font-size: 24rpx;
          font-weight: 400;
          color: #ff670b;
          margin-left: 20rpx;
        }
      }
      .right {
        flex: 1;
        text-align: right;
        span {
          margin-right: 10rpx;
          font-weight: 550;
          color: #000;
        }
      }

      ::v-deep {
        .u-icon__icon {
          color: #c0c4cc !important;
        }
      }
    }
  }
  .extra {
    background: #fff;
    border-radius: 16rpx;
    padding: 20rpx 20rpx 20rpx 55rpx;
    box-sizing: border-box;
    margin-top: 20rpx;
    .__label {
      font-size: 28rpx;
      font-weight: bold;
      color: #3c3c3c;
      margin-bottom: 30rpx;
    }
    .takephoto {
      margin-bottom: 30rpx;
      ::v-deep {
        .u-upload {
          img {
            width: 104rpx;
            height: 104rpx;
            margin-left: 10rpx;
            margin-bottom: 20rpx;
          }

          .u-preview-wrap {
            overflow: initial !important;
            margin-bottom: 36rpx !important;
          }

          .u-delete-icon {
            background: transparent !important;
            bottom: -42rpx !important;
            top: initial !important;
            right: initial !important;
            width: auto !important;
            height: auto !important;

            .u-icon__icon {
              color: #686868 !important;
              font-size: 36rpx !important;
            }
          }
        }
      }

      .preview-photos {
        display: flex;
        flex-wrap: wrap;
        .photo-layer {
          position: relative;
          display: inline-block;
          margin-left: 10rpx;
          margin-bottom: 40rpx;

          image {
            width: 120rpx;
            height: 120rpx;
            border-radius: 8rpx;
          }

          ::v-deep {
            .u-icon {
              position: absolute;
              top: 130rpx;
              left: 50%;
              transform: translateX(-50%);
            }
          }
        }
      }
    }
  }
}
</style>

<template>
  <div class="order-edition">
    <div class="station">
      <div class="station-layer" @click="onNavToChooseLocation('origin')">
        <div class="address start">
          <span>{{ formData.start_title }}</span>
          <span>{{ formData.start_location }}</span>
        </div>
        <u-icon name="arrow-right" color="#6e757a" />
      </div>
      <div class="station-layer" @click="onNavToChooseLocation('arrived')">
        <div class="address end">
          <span>{{ formData.arrive_title }}</span>
          <span>{{ formData.arrive_location }}</span>
        </div>
        <u-icon name="arrow-right" color="#6e757a" />
      </div>
    </div>

    <div class="form-data">
      <u-form
        ref="orderFormRef"
        label-width="200"
        :error-type="['toast']"
        :border-bottom="false"
        :model="formData"
      >
        <u-form-item required label="托运方式" prop="check_type">
          <u-input
            type="select"
            placeholder="托运方式"
            v-model="formData.check_type"
            @click="onShowSelect('checkTypeSelect')"
          />
        </u-form-item>
        <u-form-item required label="是否上门接宠">
          <u-input
            type="select"
            placeholder="是否上门接宠"
            v-model="formData._is_home_start"
            @click="onShowSelect('homeStartSelect')"
          />
        </u-form-item>
        <u-form-item required label="是否送宠到家">
          <u-input
            type="select"
            placeholder="是否送宠到家"
            v-model="formData._is_home_arrive"
            @click="onShowSelect('homeArriveSelect')"
          />
        </u-form-item>
        <u-form-item required label="出发时间" prop="start_date">
          <u-input
            type="select"
            placeholder="出发时间"
            v-model="formData.start_date"
            @click="onShowSelect('startDate')"
          />
        </u-form-item>
        <u-form-item label="宠物名称">
          <u-input placeholder="宠物名称" v-model="formData.pet_name" />
        </u-form-item>
        <u-form-item required label="宠物品种" prop="pet_category">
          <u-input
            type="select"
            placeholder="宠物品种"
            v-model="formData.pet_category"
            @click="onShowSelect('petTypeSelect')"
          />
        </u-form-item>
        <u-form-item required label="宠物数量" prop="pet_number">
          <u-input
            type="select"
            placeholder="宠物数量"
            v-model="formData._pet_number"
            @click="onShowSelect('petNumSelect')"
          />
        </u-form-item>
        <u-form-item required label="托运重量" prop="pet_weight">
          <u-input
            type="select"
            placeholder="宠物重量"
            v-model="formData.pet_weight"
            @click="onShowSelect('petWeightSelect')"
          />
        </u-form-item>
        <u-form-item label="是否有笼具" prop="_cage_have">
          <u-input
            type="select"
            placeholder="是否有笼具"
            v-model="formData._cage_have"
            @click="onShowSelect('haveCageSelect')"
          />
        </u-form-item>
        <u-form-item
          label="笼具尺寸"
          prop="cage_size"
          v-if="formData.cage_have == 1"
        >
          <u-input
            type="select"
            placeholder="笼具尺寸"
            v-model="formData.cage_size"
            @click="onShowSelect('cageSizeSelect')"
          />
        </u-form-item>
        <u-form-item label="是否代买笼具" v-if="formData.cage_have == 0">
          <u-input
            type="select"
            placeholder="是否有笼具"
            v-model="formData._is_buy_cage"
            @click="onShowSelect('buyCageSelect')"
          />
        </u-form-item>
        <u-form-item label="笼具类型" v-if="formData.is_buy_cage == 1">
          <u-input
            type="select"
            placeholder="笼具类型"
            v-model="formData.cage_category"
            @click="onShowSelect('cageCategorySelect')"
          />
        </u-form-item>
      </u-form>
      <div class="insurance">
        <div class="left">选择保险</div>
        <div class="right" @click="onShowSelect('insureSelect')">
          <span>{{ formData.insure_name }}</span>
          <u-icon name="arrow-down" color="#6e757a" />
        </div>
      </div>
    </div>

    <div class="extra">
      <div class="takephoto">
        <h3 class="__label">宠物照片</h3>
        <u-upload
          ref="uploadRef"
          custom-btn
          width="140"
          height="140"
          del-icon="trash"
          action="https://cxp.tuomuit.com/api/common/upload"
          :header="{
            token: appUser.token,
          }"
          :show-upload-list="false"
          @on-success="onUploadSuccess"
          @on-error="onUploadError"
        >
          <img
            src="../../static/images/home/upload.png"
            alt="petsUpload"
            slot="addBtn"
          />
        </u-upload>
        <div class="preview-photos">
          <div
            class="photo-layer"
            v-for="(url, index) in formData.pet_pic"
            :key="index"
          >
            <image
              mode="aspectFill"
              :src="url"
              alt=""
              @click="onPreviewImage(index)"
            />
            <u-icon name="trash" @click="onUploadRemove(url, index)" />
          </div>
        </div>
      </div>
      <div class="remark">
        <h3 class="__label">备注内容</h3>
        <u-input type="textarea" border v-model="formData.notes" />
      </div>
    </div>

    <u-button shape="circle" type="primary" @click="onSubmit">
      确认提交
    </u-button>

    <u-select
      confirm-color="#49d2b2"
      mode="mutil-column-auto"
      :default-value="petTypeSelect.defaultValue"
      :list="petTypeSelect.data"
      v-model="petTypeSelect.visible"
      @confirm="onPetTypeConfirm"
    />
    <u-select
      confirm-color="#49d2b2"
      :default-value="petWeightSelect.defaultValue"
      :list="petWeightSelect.data"
      v-model="petWeightSelect.visible"
      @confirm="onPetWeightConfirm"
    />
    <u-select
      confirm-color="#49d2b2"
      :default-value="insureSelect.defaultValue"
      :list="insureSelect.data"
      v-model="insureSelect.visible"
      @confirm="onInsureConfirm"
    />
    <u-select
      confirm-color="#49d2b2"
      :default-value="checkTypeSelect.defaultValue"
      :list="checkTypeSelect.data"
      v-model="checkTypeSelect.visible"
      @confirm="onCheckTypeConfirm"
    />
    <u-select
      confirm-color="#49d2b2"
      :default-value="haveCageSelect.defaultValue"
      :list="haveCageSelect.data"
      v-model="haveCageSelect.visible"
      @confirm="onHaveCageConfirm"
    />
    <u-select
      confirm-color="#49d2b2"
      :default-value="buyCageSelect.defaultValue"
      :list="buyCageSelect.data"
      v-model="buyCageSelect.visible"
      @confirm="onBuyCageConfirm"
    />
    <u-select
      confirm-color="#49d2b2"
      :default-value="cageCategorySelect.defaultValue"
      :list="cageCategorySelect.data"
      v-model="cageCategorySelect.visible"
      @confirm="onCageConfirm"
    />
    <u-calendar
      mode="date"
      max-date="2099-01-01"
      active-bg-color="#49d2b2"
      :default-date="formData._startDate"
      :min-date="departureCalendar.minDate"
      v-model="departureCalendar.visible"
      @change="onDepartureCalendarConfirm"
    />
    <u-select
      confirm-color="#49d2b2"
      :default-value="homeStartSelect.defaultValue"
      :list="homeStartSelect.data"
      v-model="homeStartSelect.visible"
      @confirm="(e) => onHomeConfirm('start', e)"
    />
    <u-select
      confirm-color="#49d2b2"
      :default-value="homeArriveSelect.defaultValue"
      :list="homeArriveSelect.data"
      v-model="homeArriveSelect.visible"
      @confirm="(e) => onHomeConfirm('arrive', e)"
    />
    <u-select
      confirm-color="#49d2b2"
      :default-value="cageSizeSelect.defaultValue"
      :list="cageSizeSelect.data"
      v-model="cageSizeSelect.visible"
      @confirm="onCageSizeSelectConfirm"
    />
    <u-select
      confirm-color="#49d2b2"
      :default-value="petNumSelect.defaultValue"
      :list="petNumSelect.data"
      v-model="petNumSelect.visible"
      @confirm="onPetNumSelectConfirm"
    />
  </div>
</template>

<script>
import {
  getOrderInfoRes,
  getCheckTypesRes,
  getPetTypesRes,
  getInsuresRes,
  addOrUpdateOrderRes,
  getCagesRes,
} from "@/api";
import dayjs from "dayjs";
const chooseLocation = requirePlugin("chooseLocation");
const weekMap = {
  0: "星期日",
  1: "星期一",
  2: "星期二",
  3: "星期三",
  4: "星期四",
  5: "星期五",
  6: "星期六",
};

export default {
  name: "OrderEdition",

  data() {
    const appUser = this.getAppUser();
    return {
      appUser,
      formData: {},
      departureCalendar: {
        visible: false,
        minDate: dayjs().format("YYYY-MM-DD"),
        selectedDate: {
          result: dayjs().format("YYYY-MM-DD"),
          week: weekMap[dayjs().day()],
        },
      },
      petTypeSelect: {
        visible: false,
        data: [],
        defaultValue: [],
      },
      haveCageSelect: {
        visible: false,
        data: [
          { label: "否", value: 0 },
          { label: "是", value: 1 },
        ],
        defaultValue: [],
      },
      homeStartSelect: {
        visible: false,
        data: [
          { label: "否", value: 0 },
          { label: "是", value: 1 },
        ],
        defaultValue: [],
      },
      homeArriveSelect: {
        visible: false,
        data: [
          { label: "否", value: 0 },
          { label: "是", value: 1 },
        ],
        defaultValue: [],
      },
      buyCageSelect: {
        visible: false,
        data: [
          { label: "否", value: 0 },
          { label: "是", value: 1 },
        ],
        defaultValue: [],
      },
      cageCategorySelect: {
        visible: false,
        data: [],
        defaultValue: [],
      },
      petNumSelect: {
        visible: false,
        data: (() => {
          const result = [];
          for (let i = 1; i < 21; i++) {
            result.push({
              label: `${i}只`,
              value: i,
              index: i - 1,
            });
          }
          return result;
        })(),
        defaultValue: [],
      },
      cageSizeSelect: {
        visible: false,
        data: [
          { label: "60cm以下(含3号航空箱)", value: 0 },
          { label: "60-75cm", value: 1 },
          { label: "75-85cm", value: 2 },
          { label: "85-95cm", value: 3 },
          { label: "95-105cm", value: 4 },
          { label: "105-115cm", value: 5 },
          { label: "115-130cm", value: 6 },
          { label: "130-150cm", value: 7 },
        ],
        defaultValue: [],
      },
      petWeightSelect: {
        visible: false,
        data: [
          { label: "小于5公斤", value: 0 },
          { label: "5-10公斤", value: 1 },
          { label: "10-15公斤", value: 2 },
          { label: "16-20公斤", value: 3 },
          { label: "21-25公斤", value: 4 },
          { label: "26-30公斤", value: 5 },
          { label: "31-35公斤", value: 6 },
          { label: "36-40公斤", value: 7 },
          { label: "41-45公斤", value: 8 },
          { label: "大于45公斤", value: 9 },
        ],
        defaultValue: [],
      },
      insureSelect: {
        visible: false,
        data: [],
        defaultValue: [],
      },
      checkTypeSelect: {
        visible: false,
        data: [],
        defaultValue: [],
      },
      buyOptions: [
        { name: 0, label: "否", checked: false },
        { name: 1, label: "是", checked: false },
      ],
      formRules: {
        pet_category: [
          {
            required: true,
            message: "请选择宠物品种",
            trigger: ["change", "blur"],
          },
        ],
        pet_number: [
          {
            type: "number",
            required: true,
            message: "请输入宠物数量",
            trigger: ["change", "blur"],
          },
        ],
        pet_weight: [
          {
            required: true,
            message: "请选择托运重量",
            trigger: ["change", "blur"],
          },
        ],
      },
      originLocation: {},
      arrivedLocation: {},
    };
  },

  computed: {
    renderInsuranceLabel() {
      return this.formData.insurance_add_amount === "-"
        ? "不需要"
        : this.formData.insurance_add_amount || "请选择";
    },
  },

  watch: {
    originLocation(n) {
      const { province, city, district, address, name, longitude, latitude } =
        n;
      this.formData.start_country = "中国";
      this.formData.start_province = province;
      this.formData.start_city = city;
      this.formData.start_area = district;
      this.formData.start_location = address;
      this.formData.start_title = name;
      this.formData.start_lng = longitude;
      this.formData.start_lat = latitude;
    },
    arrivedLocation(n) {
      const { province, city, district, address, name, longitude, latitude } =
        n;
      this.formData.arrive_country = "中国";
      this.formData.arrive_province = province;
      this.formData.arrive_city = city;
      this.formData.arrive_area = district;
      this.formData.arrive_location = address;
      this.formData.arrive_title = name;
      this.formData.arrive_lng = longitude;
      this.formData.arrive_lat = latitude;
    },
    "formData.cage_have"(n) {
      if (n == 1) {
        this.formData.is_buy_cage = 0;
        this.formData._is_buy_cage = "否";
        this.buyCageSelect.defaultValue = [0];
        this.formData.cage_category = null;
        this.formData.cage_price = null;
      } else {
        this.formData.cage_size = null;
        this.haveCageSelect.defaultValue = [0];
      }
    },
  },

  methods: {
    onNavToChooseLocation(type) {
      // this.chooseLocationType = type;
      // const key = `WNQBZ-GCJCC-P4W2B-A5V4D-ITNWZ-KOFSY`; // 使用在腾讯位置服务申请的key
      // const referer = "宠物托运宠小皮"; // 调用插件的app的名称
      // wx.navigateTo({
      //   url: `plugin://chooseLocation/index?key=${key}&referer=${referer}`,
      // });

      uni.chooseLocation({
        success: ({ latitude, longitude, address, name }) => {
          this.$qqmapsdk.reverseGeocoder({
            location: `${latitude},${longitude}`,
            success: ({
              result: {
                ad_info: { nation, province, city, district },
              },
            }) => {
              if (type === "origin") {
                this.originLocation = {
                  nation,
                  province,
                  city,
                  district: district || city,
                  address,
                  name,
                  longitude,
                  latitude,
                };
              } else if (type === "arrived") {
                this.arrivedLocation = {
                  nation,
                  province,
                  city,
                  district: district || city,
                  address,
                  name,
                  longitude,
                  latitude,
                };
              }
            },
          });
        },
      });
    },
    onSubmit() {
      this.$refs.orderFormRef.validate(async (valid) => {
        if (valid) {
          const {
            is_home_start, // 上门接宠
            is_home_arrive, // 上门送宠
            start_date,
            pet_name,
            pet_category,
            pet_number,
            pet_weight,
            cage_have,
            cage_size,
            arrive_country,
            arrive_province,
            arrive_city,
            arrive_area,
            arrive_location,
            arrive_title,
            arrive_lng,
            arrive_lat,
            start_country,
            start_province,
            start_city,
            start_area,
            start_location,
            start_title,
            start_lng,
            start_lat,
            is_buy_cage, // 是否代买笼具
            cage_category,
            cage_price,
            is_insurance_add,
            insurance_add_amount,
            insurance_add_fee,
            notes,
            pet_pic,
            check_type,
          } = this.formData;

          if (cage_have == 1 && !cage_size) {
            return this.toast("请选择笼具尺寸");
          }

          if (is_buy_cage == 1 && !cage_category) {
            return this.toast("请选择笼具类型");
          }

          const reqData = {
            order_number: this.order_number,
            check_type,
            arrive_country,
            arrive_province,
            arrive_city,
            arrive_area,
            arrive_location,
            arrive_title,
            arrive_lng,
            arrive_lat,
            start_country,
            start_province,
            start_city,
            start_area,
            start_location,
            start_title,
            start_lng,
            start_lat,
            is_home_start, // 上门接宠
            is_home_arrive, // 上门送宠
            start_date,
            pet_name,
            pet_category,
            pet_number,
            pet_weight,
            cage_have,
            is_buy_cage,
            is_insurance_add,
            insurance_add_amount,
            insurance_add_fee,
            pet_pic: pet_pic && pet_pic.join(),
            notes,
          };
          if (cage_have) {
            reqData.cage_size = cage_size;
          }
          if (is_buy_cage) {
            reqData.cage_category = cage_category;
            reqData.cage_price = cage_price;
          }
          await addOrUpdateOrderRes(reqData);
          uni.navigateBack({
            delta: 1,
          });
        }
      });
    },
    async getOrderInfo() {
      const data = await getOrderInfoRes(this.order_number);
      this.formData = {
        ...data,
        _pet_number: data.pet_number + "只",
        _cage_have: data.cage_have == 1 ? "是" : "否",
        _is_buy_cage: data.is_buy_cage == 1 ? "是" : "否",
        _is_home_start: data.is_home_start == 1 ? "是" : "否",
        _is_home_arrive: data.is_home_arrive == 1 ? "是" : "否",
        _startDate: dayjs(data.start_date).format("YYYY-M-D"),
      };

      this.petNumSelect.defaultValue = [Number(data.pet_number) - 1];
      this.cageSizeSelect.defaultValue = [
        this.cageSizeSelect.data.findIndex((x) => x.label === data.cage_size),
      ];

      this.cageCategorySelect.defaultValue = [
        this.cageCategorySelect.data.findIndex((x) =>
          x.label.includes(data.cage_category)
        ),
      ];
      this.homeStartSelect.defaultValue = [Number(data.is_home_start)];
      this.homeArriveSelect.defaultValue = [Number(data.is_home_arrive)];
      this.buyCageSelect.defaultValue = [Number(data.is_buy_cage)];
      this.haveCageSelect.defaultValue = [Number(data.cage_have)];
      this.checkTypeSelect.defaultValue = [
        this.checkTypeSelect.data.findIndex((x) => x.label === data.check_type),
      ];
      this.petWeightSelect.defaultValue = [
        this.petWeightSelect.data.findIndex((x) => x.label === data.pet_weight),
      ];
      this.insureSelect.defaultValue = [
        this.insureSelect.data.findIndex(
          (x) => x.insure_limit === data.insurance_add_amount
        ),
      ];
    },
    onDepartureCalendarConfirm({ result, week }) {
      this.departureCalendar.selectedDate = {
        result,
        week,
      };
      this.formData.start_date = result;
    },
    onPreviewImage(index) {
      uni.previewImage({
        urls: this.formData.pet_pic,
        current: index,
      });
    },
    onShowSelect(key) {
      if (key == "startDate") {
        this.departureCalendar.visible = true;
      } else {
        this[key].visible = true;
      }
    },
    onPetNumSelectConfirm([scope]) {
      this.formData.pet_number = scope.value;
      this.formData._pet_number = scope.label;
      this.petNumSelect.defaultValue = [scope.value - 1];
    },
    onCageSizeSelectConfirm([scope]) {
      this.formData.cage_size = scope.label;
      this.cageSizeSelect.defaultValue = [scope.value];
    },
    onHomeConfirm(flag, [scope]) {
      if (flag === "start") {
        this.formData.is_home_start = scope.value;
        this.formData._is_home_start = scope.label;
        this.homeStartSelect.defaultValue = [scope.value];
      } else {
        this.formData.is_home_arrive = scope.value;
        this.formData._is_home_arrive = scope.label;
        this.homeArriveSelect.defaultValue = [scope.value];
      }
    },
    onPetTypeConfirm([parent, child]) {
      const petTypes = this.petTypeSelect.data;
      const index = petTypes.findIndex((x) => x.value === parent.value);
      const petChildren = petTypes[index].children;
      const _index = petChildren.findIndex((x) => x.value === child.value);
      this.petTypeSelect.defaultValue = [index, _index];
      this.formData.pet_category = child.value;
    },
    onPetWeightConfirm([scope]) {
      this.formData.pet_weight = scope.label;
      this.petWeightSelect.defaultValue = [scope.value];
    },
    onHaveCageConfirm([scope]) {
      this.formData._cage_have = scope.label;
      this.formData.cage_have = scope.value;
      this.haveCageSelect.defaultValue = [scope.value];
    },
    onInsureConfirm([{ value }]) {
      const [insure_name, insure_limit, insure_price, index] = value.split(",");
      this.formData.insurance_add_amount = insure_limit;
      this.formData.insurance_add_fee = insure_price;
      this.formData.insure_name = insure_name;
      this.insureSelect.defaultValue = [index];
    },
    async getInsures() {
      const data = await getInsuresRes();
      this.insureSelect.data = data.map((x, i) => ({
        ...x,
        label: `${x.insure_name}（¥${x.insure_price}）`,
        value: `${x.insure_name},${x.insure_limit},${x.insure_price},${i}`,
      }));
    },
    onCheckTypeConfirm([scope]) {
      this.formData.check_type = scope.label;
      this.checkTypeSelect.defaultValue = [scope.value];
    },
    async getCheckTypes() {
      const data = await getCheckTypesRes();
      this.checkTypeSelect.data = data.map((x, i) => ({
        ...x,
        label: x.name,
        value: i,
      }));
    },
    async getPetTypes() {
      const data = await getPetTypesRes();
      this.petTypeSelect.data = data;
    },
    onUploadSuccess(response) {
      this.formData.pet_pic.push(response.data.fullurl);
    },
    onUploadRemove(url, index) {
      this.formData.pet_pic.splice(index, 1);
    },
    onUploadError(...args) {
      console.log(args);
    },
    onBuyCageConfirm([scope]) {
      this.buyCageSelect.defaultValue = [scope.value];
      this.formData.is_buy_cage = scope.value;
      this.formData._is_buy_cage = scope.label;
    },
    async getCages() {
      const data = await getCagesRes();
      this.cageCategorySelect.data = data.map((x, i) => ({
        value: `${i},${x.cage_name},${x.cage_size},${x.cage_price}`,
        label: `${x.cage_name}（¥${x.cage_price}）`,
      }));
    },
    onCageConfirm([scope]) {
      const [index, name, size, price] = scope.value.split(",");
      this.cageCategorySelect.defaultValue = [index];
      this.formData.cage_category = name;
      this.formData.cage_price = price;
    },
  },

  onReady() {
    this.$refs.orderFormRef.setRules(this.formRules);
  },

  async onLoad(options) {
    this.order_number = options.order_number;
    Promise.all([
      await this.getCheckTypes(),
      await this.getPetTypes(),
      await this.getInsures(),
      await this.getCages(),
      await this.getOrderInfo(),
    ]);
  },
};
</script>
