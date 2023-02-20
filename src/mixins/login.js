export default {
  data() {
    return {
      appUser: {},
      bindMobileModal: {
        visible: false,
        userProfile: {},
      },
    };
  },

  methods: {
    async login() {
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
          this.bindMobileModal.userProfile = {
            current: userInfo,
            code,
          };
          this.bindMobileModal.visible = true;
        }
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
    getUserHandler(appUser) {
      this.appUser = appUser;
    },
  },

  onShow() {
    this.appUser = this.getAppUser();
  },
};
