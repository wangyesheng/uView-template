<style lang="scss">
.home {
  position: relative;
  width: 100vw;
  min-height: 100vh;
  box-sizing: border-box;

  ::v-deep {
    .u-swiper-wrap,
    .u-list-image-wrap {
      border-radius: 0 !important;
    }

    .u-tabs {
      background-color: #4b4f54;
      background: transparent !important;

      .u-tab-bar {
        background-color: #49d2b2 !important;
      }

      .u-tab-item {
        font-weight: 550;
      }
    }

    u-popup {
      .insurePopup {
        height: 50vh;
        padding: 20rpx;
        box-sizing: border-box;
      }
    }
  }

  &-content {
    width: 90%;
    position: absolute;
    top: 520rpx;
    left: 50%;
    transform: translateX(-50%);
    padding-bottom: 150rpx;

    &-tab {
      width: 100%;
      background: linear-gradient(
        180deg,
        #99fff2 0%,
        #feffff 18%,
        #ffffff 100%
      );
      border-radius: 30rpx;
      padding: 30rpx 20rpx;
      box-sizing: border-box;

      .alert {
        margin-top: 20rpx;
        width: 100%;
        height: 62rpx;
        background: #fff8f0;
        border-radius: 4rpx;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 22rpx;
        box-sizing: border-box;

        &-left {
          display: flex;
          align-items: center;
          img {
            width: 36rpx;
            height: 32rpx;
            margin-right: 28rpx;
          }

          span {
            font-size: 22rpx;
            font-weight: bold;
            color: #ff670b;
          }
        }

        ::v-deep {
          .u-icon__icon {
            margin-right: 0;
          }
        }
      }

      .station {
        margin-top: 30rpx;
        border-bottom: 2rpx solid #eff1f5;

        .start,
        .end {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 30rpx;

          .sign {
            width: 60rpx;
            height: 60rpx;
            line-height: 60rpx;
            text-align: center;
            border-radius: 50%;
            background: #49d2b2;
            color: #fff;
          }

          .address {
            display: flex;
            flex-direction: column;
            width: 480rpx;
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

          .addressTips {
            width: 480rpx;
            font-size: 32rpx;
            font-weight: 550;
            color: #6e757a;
          }
        }

        .end {
          .sign {
            background: #fd9656 !important;
          }
        }

        img {
          width: 36rpx;
          height: 36rpx;
        }
      }

      .simple-station {
        padding-top: 10rpx;
        padding-bottom: 20rpx;
        border-bottom: 2rpx solid #eff1f5;
        font-size: 40rpx;
        font-weight: bold;
        color: #3c3c3c;
        display: flex;
        justify-content: space-between;
        align-items: center;

        div {
          width: 45%;
          &:first-child {
            text-align: left;
          }
          &:last-child {
            text-align: right;
          }
          &.none {
            color: #6e757a;
          }
        }

        img {
          width: 36rpx;
          height: 36rpx;
        }

        span {
          display: inline-block;
          width: 60rpx;
          height: 60rpx;
          line-height: 60rpx;
          background: #49d2b2;
          text-align: center;
          font-size: 28rpx;
          color: #fff;
          border-radius: 50%;
        }
      }

      ::v-deep {
        .u-clearfix:after,
        .clearfix:after {
          content: none;
        }
        .u-checkbox-group {
          display: flex;
          justify-content: space-between;
          padding: 20rpx 0;
          border-bottom: 2rpx solid #eff1f5;

          .u-checkbox {
            flex-direction: row-reverse;

            &__label {
              margin-left: 0;
              font-size: 26rpx;
              font-weight: bold;
              color: #3c3c3c;
            }
          }
        }
      }

      .date {
        margin-top: 26rpx;
        color: #3c3c3c;
        padding-bottom: 20rpx;
        border-bottom: 2rpx solid #eff1f5;
        .right {
          span:first-child {
            font-size: 32rpx;
            margin-right: 12rpx;
            color: #303133;
          }
          span:last-child {
            font-size: 26rpx;
            font-weight: 400;
            color: #303133;
          }
        }
      }
    }
    &-pannel {
      padding: 10rpx;
      box-sizing: border-box;
    }

    .insurance-inner,
    .cageSize,
    .date {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .left {
        font-size: 26rpx;
        font-weight: bold;
        color: #3c3c3c;
      }
      .right {
        flex: 1;
        text-align: right;
        span {
          margin-right: 10rpx;
        }
      }
    }

    .insurance {
      margin-top: 26rpx;
      & > div:last-child {
        font-size: 24rpx;
        font-weight: 400;
        color: #ff670b;
        margin-top: 10rpx;
      }
    }

    .cageSize {
      padding: 26rpx 10rpx 20rpx;
      box-sizing: border-box;
      border-bottom: 2rpx solid #eff1f5;
    }

    &-form {
      margin-top: 20rpx;

      ::v-deep {
        .u-form {
          &-item {
            padding: 0 !important;
            margin-bottom: 20rpx;
          }
          .u-form-left {
            width: 0 !important;
          }
          .u-input {
            padding: 6rpx 30rpx !important;
            input {
              font-weight: 550;
            }
          }

          .u-border-bottom:after {
            border: none !important;
          }

          .have-cage-wrap {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 28rpx;
            font-weight: bold;
            color: #3c3c3c;

            .u-radio {
              flex-direction: row-reverse;

              &__label {
                margin-right: 10rpx;
                margin-left: 40rpx;
                font-size: 26rpx;
                font-weight: bold;
                color: #3c3c3c;
              }
            }
          }

          .cage-size-wrap {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 2rpx solid #eff1f5;
            padding-bottom: 20rpx;

            span {
              width: 100%;
              display: inline-block;
              font-size: 28rpx;
              font-weight: bold;
              color: #3c3c3c;
            }

            .u-input {
              margin-left: 10rpx;
            }
          }
        }
      }

      .buyCages {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 10rpx;
        box-sizing: border-box;
        font-size: 26rpx;
        font-weight: bold;
        color: #3c3c3c;
        padding-bottom: 20rpx;
        border-bottom: 2rpx solid #eff1f5;

        ::v-deep {
          .u-radio {
            flex-direction: row-reverse;

            &__label {
              margin-right: 10rpx;
              margin-left: 40rpx;
              font-size: 26rpx;
              font-weight: bold;
              color: #3c3c3c;
            }
          }
        }
      }
    }

    &-extra {
      margin-top: 20rpx;
      width: 100%;
      background: #ffffff;
      border-radius: 16rpx;
      padding: 30rpx;
      box-sizing: border-box;
      .__label {
        font-size: 26rpx;
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

    ::v-deep {
      .u-input--border {
        border-radius: 16rpx !important;
      }
    }

    &-attr {
      margin-top: 50rpx;
      display: flex;
      justify-content: space-around;
      .attr-layer {
        display: flex;
        flex-direction: column;
        img {
          width: 98rpx;
          height: 98rpx;
        }
        span {
          margin-top: 12rpx;
          font-size: 22rpx;
          font-weight: 400;
          color: #2a3331;
        }
      }
    }
  }

  .home-submit {
    position: fixed;
    bottom: 0;
    left: 0;
    height: 114rpx;
    width: 100%;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0rpx -10rpx 20rpx #eeeeee;

    ::v-deep {
      u-button {
        min-width: 80%;
        flex-shrink: 0;
      }
    }
  }
}
</style>

<template>
  <div class="home">
    <u-swiper :list="banners" :height="788" />
    <div class="home-content">
      <div class="home-content-tab">
        <u-tabs
          active-color="#4B4F54"
          inactive-color="#626D7D"
          :font-size="28"
          :bar-width="70"
          :active-item-style="{
            fontSize: '16px',
            fontWeight: 'blod',
          }"
          :list="checkTypes"
          :is-scroll="false"
          :current="activeCheckType"
          @change="onActiveCheckTypeChange"
        />
        <div class="home-content-form">
          <u-form
            ref="uForm"
            :border-bottom="false"
            :error-type="['toast']"
            :model="formData"
          >
            <u-row :gutter="20">
              <u-col :span="6">
                <u-form-item>
                  <u-input
                    border
                    placeholder="宠物名字"
                    v-model="formData.pet_name"
                    :clearable="false"
                  />
                </u-form-item>
              </u-col>
              <u-col :span="6">
                <u-form-item required prop="pet_category">
                  <u-input
                    border
                    type="select"
                    placeholder="宠物品种"
                    :clearable="false"
                    v-model="formData.pet_category"
                    @click="onShowSelect('petTypeSelect')"
                  />
                </u-form-item>
              </u-col>
            </u-row>
            <u-row :gutter="20">
              <u-col :span="6">
                <u-form-item required prop="_pet_number">
                  <u-input
                    border
                    type="select"
                    placeholder="宠物数量"
                    v-model="formData._pet_number"
                    @click="onShowSelect('petNumSelect')"
                  />
                </u-form-item>
              </u-col>
              <u-col :span="6">
                <u-form-item required prop="pet_weight">
                  <u-input
                    border
                    type="select"
                    placeholder="宠物重量"
                    v-model="formData.pet_weight"
                    @click="onShowSelect('petWeightSelect')"
                  />
                </u-form-item>
              </u-col>
            </u-row>
            <u-row :gutter="20">
              <u-col :span="6">
                <u-form-item required prop="_cage_have">
                  <u-input
                    border
                    type="select"
                    placeholder="是否有笼具"
                    v-model="formData._cage_have"
                    @click="onShowSelect('haveCageSelect')"
                  />
                </u-form-item>
              </u-col>
              <u-col :span="6">
                <u-form-item>
                  <u-input
                    border
                    type="select"
                    placeholder="笼具尺寸"
                    v-model="formData.cage_size"
                    @click="onShowSelect('cageSizeSelect')"
                  />
                </u-form-item>
              </u-col>
            </u-row>
          </u-form>
          <div
            class="buyCages"
            v-if="formData.cage_have == 0 && formData.cage_have !== null"
          >
            <span>是否代买笼具</span>
            <u-radio-group v-model="formData.is_buy_cage">
              <u-radio
                v-for="(item, index) in radioOptions"
                :key="index"
                :name="item.name"
                active-color="#49d2b2"
              >
                {{ item.label }}
              </u-radio>
            </u-radio-group>
          </div>
          <div class="cageSize" v-if="formData.is_buy_cage">
            <div class="left">笼具类型</div>
            <div class="right" @click="onShowSelect('cageSelect')">
              <span>{{ formData.cage_category || "请选择" }}</span>
              <u-icon name="arrow-down" color="#6e757a" />
            </div>
          </div>
        </div>
        <div class="home-content-pannel">
          <div class="simple-station">
            <div class="left" @click="onNavToChooseLocation('origin')">
              {{ originLocation.city || "" }}
            </div>
            <!-- <img
            src="../../static/images/transform.png"
            alt=""
            @click="onTransfromLocation"
          /> -->
            <span>到</span>
            <div
              :class="['right', arrivedLocation.city ? '' : 'none']"
              @click="onNavToChooseLocation('arrived')"
            >
              {{ arrivedLocation.city || "请选择目的地" }}
            </div>
          </div>
          <u-checkbox-group
            class="petMethods"
            @change="onPetCheckboxGroupChange"
          >
            <u-checkbox
              shape="circle"
              active-color="#49d2b2"
              v-model="item.checked"
              v-for="(item, index) in petMethodOptions"
              :key="index"
              :name="item.name"
            >
              {{ item.label }}
            </u-checkbox>
          </u-checkbox-group>
          <div class="date" @click="() => (departureCalendar.visible = true)">
            <div class="left">
              <span class="none">请选择出发时间</span>
            </div>
            <div class="right" v-if="departureCalendar.selectedDate.result">
              <span>{{ departureCalendar.selectedDate.result }}</span>
              <span>{{ departureCalendar.selectedDate.week }}</span>
            </div>
          </div>
          <div class="insurance">
            <div class="insurance-inner">
              <div class="left">
                <span>选择保险</span>
              </div>
              <div class="right" @click="onShowSelect('insureSelect')">
                <span>{{ formData._insure_name }}</span>
                <u-icon name="arrow-down" color="#6e757a" />
              </div>
            </div>
            <div @click="onShowInsurePopup">查看相关保单条款</div>
          </div>
        </div>
      </div>

      <div class="home-content-extra">
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
            :before-upload="onBeforeUpload"
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
                :alt="url"
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
      <div class="home-content-attr">
        <div class="attr-layer">
          <img src="../../static/images/home/air.png" alt="" />
          <span>全程空调</span>
        </div>
        <div class="attr-layer">
          <img src="../../static/images/home/food.png" alt="" />
          <span>喂食喂水</span>
        </div>
        <div class="attr-layer">
          <img src="../../static/images/home/insurance.png" alt="" />
          <span>赠送保险</span>
        </div>
      </div>
    </div>
    <div class="home-submit">
      <u-button
        v-if="appUser.id"
        type="primary"
        shape="circle"
        @click="onSubmit"
      >
        免费报价发布
      </u-button>
      <u-button
        v-else
        type="primary"
        shape="circle"
        open-type="getUserInfo"
        @click="login"
      >
        免费报价发布
      </u-button>
    </div>
    <BindMobile
      v-model="bindMobileModal.visible"
      :userProfile="bindMobileModal.userProfile"
      @getUser="getUserHandler"
    />
    <u-calendar
      mode="date"
      max-date="2099-01-01"
      active-bg-color="#49d2b2"
      :min-date="departureCalendar.minDate"
      v-model="departureCalendar.visible"
      @change="onDepartureCalendarConfirm"
    />
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
      :default-value="cageSelect.defaultValue"
      :list="cageSelect.data"
      v-model="cageSelect.visible"
      @confirm="onCageConfirm"
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
    <u-popup v-model="insurePopup.visible" border-radius="20" mode="center">
      <div class="insurePopup">
        <div v-html="insurePopup.content"></div>
      </div>
    </u-popup>
  </div>
</template>

<script>
import BindMobile from "@/components/BindMobile";
import loginMixin from "@/mixins/login";
import locationMixin from "@/mixins/location";
import {
  getCheckTypesRes,
  getPetTypesRes,
  getInsuresRes,
  addOrUpdateOrderRes,
  getCagesRes,
  getBannersRes,
  getInsureClauseRes,
} from "@/api";
import dayjs from "dayjs";

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
  name: "Home",

  mixins: [loginMixin, locationMixin],

  components: {
    BindMobile,
  },

  data() {
    return {
      banners: [],
      checkTypes: [],
      activeCheckType: 0,
      petTypeSelect: {
        visible: false,
        data: [],
        defaultValue: [],
      },
      cageSelect: {
        visible: false,
        data: [],
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
      petMethodOptions: [
        {
          name: "home_start",
          label: "是否上门接宠",
          checked: true,
        },
        {
          name: "home_arrive",
          label: "是否送宠到家",
          checked: true,
        },
      ],

      haveCageSelect: {
        visible: false,
        data: [
          { label: "已有笼具", value: 1 },
          { label: "暂无笼具", value: 0 },
        ],
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
          { label: "60cm以下", value: 0 },
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
      departureCalendar: {
        visible: false,
        minDate: dayjs().format("YYYY-MM-DD"),
        selectedDate: {
          result: "",
          week: "",
        },
      },
      formData: {
        is_home_start: 1, // 上门接宠
        is_home_arrive: 1, // 上门送宠
        start_date: "",
        pet_name: null,
        pet_category: null,
        pet_number: null,
        _pet_number: null,
        pet_weight: null,
        _cage_have: null,
        cage_have: null,
        cage_size: null,
        arrive_country: null,
        arrive_province: null,
        arrive_city: null,
        arrive_area: null,
        arrive_location: null,
        arrive_title: null,
        arrive_lng: null,
        arrive_lat: null,
        start_country: null,
        start_province: null,
        start_city: null,
        start_area: null,
        start_location: null,
        start_title: null,
        start_lng: null,
        start_lat: null,
        is_buy_cage: 0, // 是否代买笼具
        cage_category: null, // 笼具类型
        cage_price: null, // 笼具价格
        is_insurance_add: 1,
        insurance_add_amount: null,
        insurance_add_fee: null,
        _insure_name: null,
        notes: null,
        pet_pic: [],
        check_type: null,
      },
      formRules: {
        pet_category: [
          {
            required: true,
            message: "请选择宠物品种",
            trigger: ["change", "blur"],
          },
        ],
        _pet_number: [
          {
            required: true,
            message: "请选择宠物数量",
            trigger: ["change", "blur"],
          },
        ],
        pet_weight: [
          {
            required: true,
            message: "请选择宠物重量",
            trigger: ["change", "blur"],
          },
        ],
        _cage_have: [
          {
            required: true,
            message: "请选择是否有笼具",
            trigger: ["change", "blur"],
          },
        ],
      },

      radioOptions: [
        { name: 0, label: "否", checked: false },
        { name: 1, label: "是", checked: false },
      ],
      originLocation: {},
      arrivedLocation: {},
      insurePopup: {
        visible: false,
        content: null,
      },
      errorUpload: "",
    };
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
    activeCheckType(n) {
      this.formData.check_type = this.checkTypes[n].name;
    },
    "formData.cage_have"(n) {
      if (n) {
        this.formData.is_buy_cage = 0;
        this.formData.cage_category = null;
        this.formData.cage_price = null;
      } else {
        this.formData.cage_size = null;
      }
    },
  },

  methods: {
    onTransfromLocation() {
      [this.originLocation, this.arrivedLocation] = [
        this.arrivedLocation,
        this.originLocation,
      ];
    },
    onNavToChooseLocation(type) {
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
                  district,
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
                  district,
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

      // this.chooseLocationType = type;
      // const key = `WNQBZ-GCJCC-P4W2B-A5V4D-ITNWZ-KOFSY`; // 使用在腾讯位置服务申请的key
      // const referer = "宠物托运宠小皮"; // 调用插件的app的名称
      // wx.navigateTo({
      //   url: `plugin://chooseLocation/index?key=${key}&referer=${referer}`,
      // });
    },
    onSubmit() {
      this.$refs.uForm.validate(async (valid) => {
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

          if (!arrive_lat && !arrive_lng) {
            return this.toast("请选择目的地");
          }
          if (!start_date) {
            return this.toast("请选择出发时间");
          }
          if (cage_have && !cage_size) {
            return this.toast("请选择笼具尺寸");
          }
          if (is_buy_cage && !cage_category) {
            return this.toast("请选择笼具类型");
          }

          const reqData = {
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
            pet_pic: pet_pic.join(),
            notes,
          };
          if (cage_have) {
            reqData.cage_size = cage_size;
          }
          if (is_buy_cage) {
            reqData.cage_category = cage_category;
            reqData.cage_price = cage_price;
          }
          try {
            const { order_number } = await addOrUpdateOrderRes(reqData);
            this.resetFields();
            this.navTo(`/pages/order/merchant?order_number=${order_number}`);
          } catch (error) {
            if (error && error.code === 401) {
              this.appUser = {};
            }
          }
        }
      });
    },
    async resetFields() {
      this.formData = {
        is_home_start: 1, // 上门接宠
        is_home_arrive: 1, // 上门送宠
        start_date: "",
        pet_name: null,
        pet_category: null,
        pet_number: null,
        _pet_number: null,
        pet_weight: null,
        cage_have: null,
        _cage_have: null,
        cage_size: null,
        arrive_country: null,
        arrive_province: null,
        arrive_city: null,
        arrive_area: null,
        arrive_location: null,
        arrive_title: null,
        arrive_lng: null,
        arrive_lat: null,
        start_country: null,
        start_province: null,
        start_city: null,
        start_area: null,
        start_location: null,
        start_title: null,
        start_lng: null,
        start_lat: null,
        is_buy_cage: 0, // 是否代买笼具
        cage_category: null,
        cage_price: null,
        is_insurance_add: 1,
        notes: null,
        pet_pic: [],
        check_type:
          this.checkTypes && this.checkTypes[0] && this.checkTypes[0].name,
      };
      this.activeCheckType = 0;
      const [first] = this.insureSelect.data;
      this.formData.insurance_add_amount = first.insure_limit;
      this.formData.insurance_add_fee = first.insure_price;
      this.formData._insure_name = first.insure_name;
      this.insureSelect.defaultValue = [];
      this.petTypeSelect.defaultValue = [];
      this.petWeightSelect.defaultValue = [];
      this.cageSelect.defaultValue = [];
      this.haveCageSelect.defaultValue = [];
      this.cageSizeSelect.defaultValue = [];
      this.petNumSelect.defaultValue = [];
      this.departureCalendar.selectedDate = {
        result: "",
        week: "",
      };
      this.petMethodOptions.forEach((x) => (x.checked = true));
      this.originLocation = await this.getCurrentLocation();
      this.arrivedLocation = {};
    },
    onPreviewImage(index) {
      uni.previewImage({
        urls: this.formData.pet_pic,
        current: index,
      });
    },
    async onShowInsurePopup() {
      const data = await getInsureClauseRes();
      this.insurePopup.content = data;
      this.insurePopup.visible = true;
    },
    onPetNumSelectConfirm([scope]) {
      this.formData.pet_number = scope.value;
      this.formData._pet_number = scope.label;
      this.petNumSelect.defaultValue = [scope.value - 1];
    },
    onHaveCageConfirm([scope]) {
      this.formData._cage_have = scope.label;
      this.formData.cage_have = scope.value;
      this.haveCageSelect.defaultValue = [scope.value === 1 ? 0 : 1];
    },
    onCageSizeSelectConfirm([scope]) {
      this.formData.cage_size = scope.label;
      this.cageSizeSelect.defaultValue = [scope.value];
    },
    onDepartureCalendarConfirm({ result, week }) {
      this.departureCalendar.selectedDate = {
        result,
        week,
      };
      this.formData.start_date = result;
    },
    onPetCheckboxGroupChange(e) {
      if (e.some((x) => x === "home_start")) {
        this.formData.is_home_start = 1;
      } else {
        this.formData.is_home_start = 0;
      }
      if (e.some((x) => x === "home_arrive")) {
        this.formData.is_home_arrive = 1;
      } else {
        this.formData.is_home_arrive = 0;
      }
    },
    onUploadSuccess(response) {
      this.formData.pet_pic.push(response.data.fullurl);
    },
    onUploadRemove(url, index) {
      this.formData.pet_pic.splice(index, 1);
    },
    onUploadError(args) {
      console.log(args);
    },
    onBeforeUpload(args) {
      const appUser = uni.getStorageSync("APP_USER");
      if (!appUser && !appUser.token) {
        uni.showToast({
          icon: "none",
          title: `请先授权登录`,
          duration: 3000,
        });
        return false;
      }
    },
    onPetWeightConfirm([scope]) {
      this.formData.pet_weight = scope.label;
      this.petWeightSelect.defaultValue = [scope.value];
    },
    async getPetTypes() {
      const data = await getPetTypesRes();
      this.petTypeSelect.data = data;
    },
    onPetTypeConfirm([parent, child]) {
      const petTypes = this.petTypeSelect.data;
      const index = petTypes.findIndex((x) => x.value === parent.value);
      const petChildren = petTypes[index].children;
      const _index = petChildren.findIndex((x) => x.value === child.value);
      this.petTypeSelect.defaultValue = [index, _index];
      this.formData.pet_category = child.value;
    },
    onShowSelect(key) {
      this[key].visible = true;
    },
    async getCheckTypes() {
      const data = await getCheckTypesRes();
      this.checkTypes = data;
      this.formData.check_type = data && data[0] && data[0].name;
    },
    onActiveCheckTypeChange(value) {
      this.activeCheckType = value;
    },
    onInsureConfirm([{ value }]) {
      const [insure_name, insure_limit, insure_price, index] = value.split(",");
      this.formData.insurance_add_amount = insure_limit;
      this.formData.insurance_add_fee = insure_price;
      this.formData._insure_name = insure_name;
      this.insureSelect.defaultValue = [index];
    },
    async getInsures() {
      const data = await getInsuresRes();
      this.insureSelect.data = data.map((x, i) => {
        if (i == 0) {
          this.formData.insurance_add_amount = x.insure_limit;
          this.formData.insurance_add_fee = x.insure_price;
          this.formData._insure_name = x.insure_name;
        }

        return {
          ...x,
          label: `${x.insure_name}（¥${x.insure_price}）`,
          value: `${x.insure_name},${x.insure_limit},${x.insure_price},${i}`,
        };
      });
    },
    async getCages() {
      const data = await getCagesRes();
      this.cageSelect.data = data.map((x, i) => ({
        value: `${i},${x.cage_name},${x.cage_size},${x.cage_price}`,
        label: `${x.cage_name}（¥${x.cage_price}）`,
      }));
    },
    onCageConfirm([scope]) {
      const [index, name, size, price] = scope.value.split(",");
      this.cageSelect.defaultValue = [index];
      this.formData.cage_category = name;
      this.formData.cage_price = price;
    },
    async getBanners() {
      this.banners = await getBannersRes();
    },
  },
  onReady() {
    this.$refs.uForm.setRules(this.formRules);
  },
  async onLoad() {
    this.getBanners();
    this.getCheckTypes();
    this.getPetTypes();
    this.getInsures();
    this.getCages();
    this.originLocation = await this.getCurrentLocation();
  },
  onShareAppMessage() {
    return {
      title: "宠物托运宠小皮",
      path: "/pages/home/index",
    };
  },

  onShareTimeline() {
    return {
      title: "宠物托运宠小皮",
      path: "/pages/home/index",
    };
  },
};
</script>
