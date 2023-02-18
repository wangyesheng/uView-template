import Vue from "vue";
import uView from "uview-ui";
import App from "./App";
import Layout from "./layout";
import httpInterceptor from "@/utils/http.interceptor.js";

Vue.component("app-layout", Layout);

Vue.prototype.navTo = function (url) {
  uni.navigateTo({
    url,
  });
};

Vue.prototype.getSysHeight = function () {
  return uni.getSystemInfoSync().windowHeight;
};

Vue.prototype.getSysWidth = function () {
  return uni.getSystemInfoSync().windowWidth;
};

Vue.prototype.toast = function (message) {
  uni.showToast({
    icon: "none",
    title: message,
    duration: 3000,
  });
};

Vue.prototype.getAppUser = function () {
  return uni.getStorageSync("APP_USER");
};

Vue.config.productionTip = false;

App.mpType = "app";

const app = new Vue({
  ...App,
});

Vue.use(uView);
Vue.use(httpInterceptor, app);

app.$mount();
