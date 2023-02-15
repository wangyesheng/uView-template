<style lang="scss" scoped>
.layout-wrap {
  position: relative;
  width: 100%;
}
</style>

<template>
  <div
    class="layout-wrap"
    :style="{
      minHeight: sysHeight + 'px',
      background: background,
    }"
  >
    <slot />
    <Tabbar />
  </div>
</template>

<script>
import Tabbar from "../components/Tabbar";

export default {
  name: "layout",

  props: {
    background: {
      type: String,
      default: "#f7f9fb",
    },
  },

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
