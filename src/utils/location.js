export default function getLocation(callback) {
  uni.authorize({
    scope: "scope.userLocation",
    success: (_) => {
      uni.getLocation({
        success: async (res) => {
          callback({
            latitude: res.latitude,
            longitude: res.longitude,
          });
        },
        fail(...args) {
          console.log(args);
          uni.showToast({
            icon: "none",
            title: "获取失败，请重试",
          });
        },
      });
    },
    fail: (_) => {
      uni.showModal({
        title: "温馨提示",
        content: "将获取您的具体位置信息，便于您更准确的选择托运地点",
        success(res) {
          if (res.confirm) {
            uni.openSetting({
              success(res) {
                if (res.authSetting["scope.userLocation"]) {
                  uni.getLocation({
                    success: async (res) => {
                      callback({
                        latitude: res.latitude,
                        longitude: res.longitude,
                      });
                    },
                  });
                }
              },
            });
          } else {
            uni.showToast({
              icon: "none",
              title: "未授权位置信息",
            });
          }
        },
      });
    },
  });
}
