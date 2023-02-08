import Vue from "vue";
import uView from "uview-ui";
import App from "./App";
import Layout from "./layout";

Vue.component("app-layout", Layout);

Vue.use(uView);

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

Vue.config.productionTip = false;

App.mpType = "app";

const app = new Vue({
  ...App,
});
app.$mount();
