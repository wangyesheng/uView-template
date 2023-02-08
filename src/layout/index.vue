<style lang="scss" scoped>
.layout-wrap {
  width: 100%;
  background: #f7f9fb;
  padding: 0 30rpx;
  box-sizing: border-box;
}
</style>

<template>
  <div class="layout-wrap" :style="{ minHeight: sysHeight + 'px' }">
    <slot />
    <Tabbar />
  </div>
</template>

<script>
import Tabbar from "../components/Tabbar";
export default {
  name: "layout",

  components: {
    Tabbar,
  },

  computed: {
    sysHeight() {
      return this.getSysHeight();
    },
  },
};
</script>
