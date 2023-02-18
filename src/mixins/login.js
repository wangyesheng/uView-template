export default {
  data() {
    return {};
  },

  methods: {
    async login(cb) {
      uni.showLoading({
        title: "授权登录中...",
        mask: true,
      });
      try {
        const [{ userInfo }, code] = await Promise.all([
          new Promise((resolve, reject) => {
            uni.getUserProfile({
              provider: "weixin",
              desc: "用于完善用户资料",
              success: (response) => {
                resolve(response);
              },
              fail: (err) => {
                reject(err);
              },
            });
          }),
          new Promise((resolve, reject) => {
            uni.login({
              provider: "weixin",
              success: ({ code }) => {
                resolve(code);
              },
              fail: (err) => {
                reject(err);
              },
            });
          }),
        ]);

        if (userInfo && code) {
          uni.setStorageSync("APP_USER", userInfo);
          cb({
            userInfo,
            code,
          });
        }

        // const { openid } = await getOpenIdRes(code);
        // const result = await checkLoginRes({
        //   openid,
        //   nickname: userInfo.nickName,
        //   avatar: userInfo.avatarUrl,
        // });
        // this.appUser = result.userinfo;
        // uni.setStorageSync("APP_USER", this.appUser);
        // this.getLastestOrder();
      } catch (error) {
        console.log("debugger::error_login", error);
        uni.showToast({
          title: "微信登录授权失败",
          icon: "none",
        });
      } finally {
        uni.hideLoading();
      }
    },
  },
};
