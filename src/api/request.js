import Vue from "vue";

const request = ({ url, method, payload = {} }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await Vue.prototype.$u[method.toLowerCase()](url, payload);
      resolve(data);
    } catch (error) {
      let errerData = error;
      if (error.statusCode) {
        // http 网络请求报错
        errerData = error.data;
      } else {
        // 后台接口请求报错
      }
      if (errerData.code === 401) {
        Vue.prototype.$u.toast("凭证过期，请重新授权");
        uni.setStorageSync("APP_USER", {});
      } else {
        // Vue.prototype.$u.toast(errerData.msg, 300000);
        uni.showModal({
          title: "提示",
          content: errerData.msg,
          confirmText: "确定",
          showCancel: false,
          success: (res) => {},
        });
      }
      reject(errerData);
    }
  });
};

export default request;
