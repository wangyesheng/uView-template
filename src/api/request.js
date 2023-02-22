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
      Vue.prototype.$u.toast(errerData.msg);
      reject(errerData.msg);
    }
  });
};

export default request;
