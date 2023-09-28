<style lang="scss" scoped>
.route-wrap {
  position: relative;
  width: 100vw;
  min-height: 100vh;
  box-sizing: border-box;

  ::v-deep {
    u-popup {
      .videoPopup {
        height: 50vh;
        padding: 20rpx;
        box-sizing: border-box;
        video {
          width: 100% !important;
          height: 100% !important;
        }
      }
    }
  }

  .map-wrap {
    width: 100vw;
    height: 50vh;
    overflow: hidden;

    map {
      width: 100vw !important;
      height: 54vh !important;
      border: none !important;
    }
  }

  .logistics {
    width: 90vw;
    position: absolute;
    top: 42vh;
    left: 50%;
    transform: translateX(-50%);
    background: #fff;
    border-radius: 16rpx;

    .header {
      border-bottom: 2rpx solid #eef0f4;
      padding: 30rpx;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;

      .left {
        display: flex;
        align-items: center;
        font-size: 28rpx;
        font-weight: bold;
        color: #333333;
        image {
          width: 50rpx;
          height: 50rpx;
          border-radius: 100%;
          margin-right: 20rpx;
        }
      }

      .right {
        display: flex;
        align-items: center;
        font-size: 26rpx;
        font-weight: 400;
        color: #333333;
        span {
          margin-left: 10rpx;
        }
      }
    }

    .content {
      padding: 30rpx;
      box-sizing: border-box;
      ::v-deep {
        .u-time-axis {
          &::before {
            border-left-color: #00b7af !important;
          }
          .customNode {
            width: 18rpx;
            height: 18rpx;
            background: #00b7af;
            border-radius: 50%;
          }
          .travel-title {
            display: flex;
            justify-content: space-between;
            align-items: center;
            span:first-child {
              font-size: 28rpx;
              font-weight: bold;
              color: #00b7af;
            }
            span:last-child {
              font-size: 24rpx;
              font-weight: 400;
              color: #9b9c9c;
            }
          }

          .travel-attr {
            margin-top: 20rpx;

            .video-and-img {
              display: flex;
              flex-wrap: wrap;
              .videoImg {
                width: 94rpx;
                height: 94rpx;
                margin-right: 20rpx;
                margin-bottom: 20rpx;
              }
              .picImg {
                width: 94rpx;
                height: 94rpx;
                border-radius: 8rpx;
                margin-right: 20rpx;
                margin-bottom: 20px;
              }
            }
          }

          .track-wrap {
            display: flex;
            flex-direction: column;
            font-size: 26rpx;
            font-weight: 400;
            color: #9b9c9c;
            span {
              margin-top: 20rpx;
            }
          }
        }
      }
    }
  }

  .no-data {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-top: 30vh;
    box-sizing: border-box;
    img {
      width: 196rpx;
      height: 128rpx;
    }

    span {
      color: #6e757a;
      font-size: 30rpx;
      margin-top: 50rpx;
    }
  }
}
</style>
<template>
  <div class="route-wrap">
    <div class="route-inner" v-if="haveData">
      <div class="map-wrap">
        <map
          scale="14"
          :latitude="centerLocation.lat"
          :longitude="centerLocation.lng"
          :markers="markers"
          :polyline="polyline"
          @updated="onMapUpdated"
        />
      </div>
      <div class="logistics">
        <div class="header">
          <div class="left">
            <image
              mode="aspectFill"
              :src="travelInfo.transportServiceInfo.transport_image"
              alt=""
            />
            <span>{{ travelInfo.transportServiceInfo.transport_nick }}</span>
          </div>
          <div
            class="right"
            @click="
              onCallPhone(travelInfo.transportServiceInfo.transport_mobile)
            "
          >
            <u-icon name="phone-fill" color="#00B7AF" size="28" />
            <span>{{ travelInfo.transportServiceInfo.transport_mobile }}</span>
          </div>
        </div>
        <div class="content">
          <u-time-line>
            <u-time-line-item
              v-for="item in travelInfo.travelTrackList"
              :key="item.travel_track_id"
            >
              s<template v-slot:node>
                <view class="customNode" />
              </template>
              <template v-slot:content>
                <view>
                  <view class="travel-title">
                    <span>{{ item.track_title }}</span>
                    <span>{{ item.track_time }}</span>
                  </view>
                  <div class="travel-attr">
                    <div class="video-and-img">
                      <image
                        v-if="item.attr.message_video"
                        class="videoImg"
                        mode="aspectFill"
                        src="../../static/images/video.png"
                        @click="onShowVideoPopup(item.attr.message_video)"
                      />
                      <template v-if="item.attr.message_pic">
                        <image
                          class="picImg"
                          v-for="(url, i) in item.attr.message_pic"
                          mode="aspectFill"
                          :src="url"
                          alt=""
                          @click="onPreviewImage(item.attr.message_pic, i)"
                        />
                      </template>
                    </div>

                    <div
                      class="track-wrap"
                      v-if="
                        item.attr.track_rider && item.attr.track_rider_mobile
                      "
                    >
                      <span>派送骑手：{{ item.attr.track_rider }}</span>
                      <span @click="onCallPhone(item.attr.track_rider_mobile)">
                        电话：{{ item.attr.track_rider_mobile }}
                      </span>
                    </div>
                  </div>
                </view>
              </template>
            </u-time-line-item>
          </u-time-line>
        </div>
      </div>
      <u-popup v-model="videoPopup.visible" border-radius="20" mode="center">
        <div class="videoPopup">
          <video :src="videoPopup.url" />
        </div>
      </u-popup>
    </div>
    <div class="no-data" v-else>
      <img src="../../static/images/nodata-large.png" alt="" />
      <span>宠物开始运输后，展示行程哦~</span>
    </div>
  </div>
</template>

<script>
import { getTravelInfoRes } from "@/api";

export default {
  name: "Route",

  data() {
    return {
      markers: [],
      polyline: [],
      travelInfo: {},
      centerLocation: {},
      videoPopup: {
        visible: false,
        url: null,
      },
    };
  },

  computed: {
    haveData() {
      return this.travelInfo && Object.keys(this.travelInfo).length > 0;
    },
  },

  methods: {
    async getTravelInfo() {
      const data = await getTravelInfoRes();
      if (data && data.userOrderInfo) {
        this.travelInfo = data;
        this.centerLocation = {};
        this.markers = [];
        this.polyline = [];
        this.centerLocation = {
          lat: data.userOrderInfo.arrive_lat,
          lng: data.userOrderInfo.arrive_lng,
        };
        this.markers.push({
          id: 1,
          longitude: data.userOrderInfo.start_lng,
          latitude: data.userOrderInfo.start_lat,
          name: "起点",
          iconPath: "../../static/images/startPosition.png",
          width: "24px",
          height: "24px",

          callout: {
            content: "（起）" + data.userOrderInfo.start_city,
            padding: 5,
            fontSize: 12,
            textAlign: "center",
            display: "ALWAYS",
            borderRadius: 5,
            border: "none",
            borderColor: "#fff",
            color: "#00B7AF",
          },
        });
        this.markers.push({
          id: 2,
          longitude: data.userOrderInfo.arrive_lng,
          latitude: data.userOrderInfo.arrive_lat,
          name: "终点",
          iconPath: "../../static/images/endPosition.png",
          width: "24px",
          height: "24px",

          callout: {
            content: "（终）" + data.userOrderInfo.arrive_city,
            padding: 5,
            fontSize: 12,
            textAlign: "center",
            display: "ALWAYS",
            borderRadius: 5,
            border: "none",
            borderColor: "#fff",
            color: "#fd9656",
          },
        });
        this.polyline = [
          {
            points: [
              {
                longitude: data.userOrderInfo.arrive_lng,
                latitude: data.userOrderInfo.arrive_lat,
              },
              {
                longitude: data.userOrderInfo.start_lng,
                latitude: data.userOrderInfo.start_lat,
              },
            ],
            color: "#00B7AF",
            width: 2,
            dottedLine: false,
            arrowLine: false,
          },
        ];
      }
    },
    onPreviewImage(urls, index) {
      uni.previewImage({
        urls,
        current: index,
      });
    },
    onCallPhone(phoneNumber) {
      uni.makePhoneCall({
        phoneNumber,
        success: (_) => {},
      });
    },
    onShowVideoPopup(url) {
      this.videoPopup.visible = true;
      this.videoPopup.url = url;
    },
    onMapUpdated(args) {
      uni.hideLoading();
    },
  },

  onLoad() {
    uni.showLoading({
      title: "数据加载中...",
    });
  },

  onShow() {
    this.getTravelInfo();
  },
};
</script>
