const install = (Vue, vm) => {
  Vue.prototype.$u.http.setConfig({
    baseUrl: "https://zhonghai.tuomuit.com",
    showLoading: false,
  });

  Vue.prototype.$u.http.interceptor.request = (config) => {
    const appUser = vm.getAppUser();
    appUser.token && (config.header.token = appUser.token);
    return config; // 如果return一个false值，则会取消本次请求
  };

  Vue.prototype.$u.http.interceptor.response = ({ code, data }) => {
    if (code == 1) {
      return data;
    } else {
      return false;
    }
  };
};

export default {
  install,
};
