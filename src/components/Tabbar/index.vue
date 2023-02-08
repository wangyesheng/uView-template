<style lang="scss" scoped>
.tabbar-wrap {
  height: 100%ss;
  ::v-deep {
    .u-tabbar__content {
      .u-tabbar__content__item__button {
        .u-icon {
          .u-icon__img {
            width: 68rpx !important;
            height: 60rpx !important;
          }
        }
      }
    }
  }
}
</style>

<template>
  <div class="tabbar-wrap">
    <u-tabbar :list="options" height="136" iconHeight="60" iconWidth="64" />
  </div>
</template>

<script>
export default {
  name: "Tabbar",

  data() {
    return {
      options: [
        {
          iconPath: "/static/tabbar/home.png",
          selectedIconPath: "/static/tabbar/home-selected.png",
          text: "首页",
          pagePath: "/pages/home/index",
        },
        {
          iconPath: "/static/tabbar/route.png",
          selectedIconPath: "/static/tabbar/route-selected.png",
          text: "路线查询",
          pagePath: "/pages/route/index",
        },
        {
          iconPath: "/static/tabbar/me.png",
          selectedIconPath: "/static/tabbar/me-selected.png",
          text: "我的",
          pagePath: "/pages/me/index",
        },
      ],
    };
  },
};
</script>
