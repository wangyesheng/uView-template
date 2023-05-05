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
      padding: 20rpx 38rpx;

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

    &-expand {
      padding: 0 30rpx 20rpx;
      box-sizing: border-box;

      &_header {
        display: flex;
        align-items: center;
        justify-content: center;
        color: #158edc;
        font-size: 26rpx;

        span {
          margin-left: 10rpx;
        }
      }

      &_content {
        display: flex;
        flex-direction: column;
        color: #30303b;
        & > div {
          font-size: 28rpx;
          padding: 20rpx 0;

          &:not(:last-child) {
            border-bottom: 2rpx dashed #dfdfdf;
          }

          div:nth-child(1) {
            margin-bottom: 20rpx;
          }

          div:nth-child(2) {
            color: #666;
            font-size: 26rpx;
            display: flex;
            justify-content: space-between;
          }
        }
      }
    }
  }

  .isread {
    width: 100%;
    overflow: hidden;
    margin-bottom: 20rpx;

    ::v-deep {
      .u-btn {
        float: right;
      }
    }
  }
}
</style>

<template>
  <div class="my-opinion-wrap">
    <div class="isread">
      <u-button size="mini" type="primary" @click="onSetRead">
        一键已读
      </u-button>
    </div>
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
      <div class="opinion-layer-expand" v-if="item.reply_list.length > 0">
        <div class="opinion-layer-expand_header" @click="onShowReply(item)">
          <u-icon :name="item._expand ? 'arrow-up' : 'arrow-down'" />
          <span>{{ item._expand ? "收起回复" : "展开回复" }}</span>
        </div>
        <div class="opinion-layer-expand_content" v-if="item._expand">
          <div v-for="(reply, i) in item.reply_list" :key="i">
            <div>{{ reply.content }}</div>
            <div>
              <span>{{ reply.contact }}</span>
              <span>{{ reply.createtime }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getOpinionsRes, setIsReadRes } from "@/api";
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
        _expand: false,
      }));
    },
    onPreview(url) {
      uni.previewImage({
        current: 0,
        urls: [url],
      });
    },
    async onShowReply(item) {
      item._expand = !item._expand;
      if (item.is_read == 1) {
        await setIsReadRes({
          help_id: item.id,
        });
      }
    },

    async onSetRead() {
      await setIsReadRes();
      this.toast("操作成功");
    },
  },

  onLoad() {
    this.getOpinions();
  },
};
</script>
