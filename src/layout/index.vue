<style lang="scss" scoped>
.layout-wrap {
  width: 100%;
  min-height: 100vh;
  position: relative;
}
</style>

<template>
  <div
    class="layout-wrap"
    :style="{
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
};
</script>
