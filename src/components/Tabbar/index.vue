<style lang="scss" scoped></style>

<template>
  <!-- iconHeight、iconWidth 为自定义在 node_modules 中的属性，需要手动添加至 node_modules 中的 u-tabbar 组件属性中 -->
  <u-tabbar :list="options" height="136" iconHeight="60" iconWidth="64" />
</template>

<script>
export default {
  name: "Tabbar",

  data() {
    return {
      options: [
        {
          iconPath: "/static/images/tabbar/home.png",
          selectedIconPath: "/static/images/tabbar/home-selected.png",
          text: "首页",
          pagePath: "/pages/home/index",
        },
        {
          iconPath: "/static/images/tabbar/me.png",
          selectedIconPath: "/static/images/tabbar/me-selected.png",
          text: "我的",
          pagePath: "/pages/me/index",
        },
      ],
    };
  },
};
</script>
