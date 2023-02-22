<style lang="scss" scoped>
.my-opinion-wrap {
  min-height: 100vh;
  background: #f9f9fd;
  padding: 30rpx;
  box-sizing: border-box;

  .opinion-layer {
    background: #ffffff;
    border-radius: 34rpx;
    margin-bottom: 20rpx;

    &-header {
      height: 92rpx;
      padding-left: 34rpx;
      padding-right: 20rpx;
      border-bottom: 2rpx solid #f0f0f0;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .mobile {
        font-size: 32rpx;
        font-weight: bold;
        color: #30303b;
      }

      .time {
        font-size: 24rpx;
        font-weight: 400;
        color: #30303b;
      }
    }

    &-content {
      box-sizing: border-box;
      padding: 28rpx 34rpx 30rpx 28rpx;

      .cont {
        font-size: 30rpx;
        font-weight: 400;
        color: #30303b;
        line-height: 32rpx;
      }

      .images-wrap {
        margin-top: 20rpx;
        display: flex;
        flex-wrap: wrap;
        img {
          width: 150rpx;
          height: 150rpx;
          margin-right: 20rpx;
        }
      }
    }
  }
}
</style>

<template>
  <div class="my-opinion-wrap">
    <div class="opinion-layer" v-for="item in opinions" :key="item.id">
      <div class="opinion-layer-header">
        <span class="mobile">{{ item.mobile }}</span>
        <span class="time"> {{ item._time }} </span>
      </div>
      <div class="opinion-layer-content">
        <p class="cont">
          {{ item.content }}
        </p>
        <div class="images-wrap">
          <img
            v-for="(src, i) in item._images"
            :key="i"
            :src="src"
            alt=""
            @click="onPreview(src)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getOpinionsRes } from "@/api";
import dayjs from "dayjs";

export default {
  name: "my-opinion",

  data() {
    return {
      opinions: [],
    };
  },

  methods: {
    async getOpinions() {
      const data = await getOpinionsRes();
      this.opinions = data.map((x) => ({
        ...x,
        _time: dayjs(x.createtime * 1000).format("YYYY-MM-DD HH:mm:ss"),
        _images: x.images ? x.images.split(",") : [],
      }));
    },
    onPreview(url) {
      uni.previewImage({
        current: 0,
        urls: [url],
      });
    },
  },

  onLoad() {
    this.getOpinions();
  },
};
</script>
