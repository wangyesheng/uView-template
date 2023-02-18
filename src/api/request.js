import Vue from "vue";

const request = async ({ url, method, payload = {} }) => {
  try {
    const data = await Vue.prototype.$u[method.toLowerCase()](url, payload);
    return data;
  } catch (error) {
    let errerData = error;
    if (error.statusCode) {
      // http 网络请求报错
      errerData = error.data;
    } else {
      // 自定义接口请求报错
    }
    Vue.prototype.$u.toast(errerData.msg);
  }
};

export default request;
