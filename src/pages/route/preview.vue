<style scoped lang="scss">
.route-preview-wrap {
  width: 100%;
  height: 100%;

  image {
    width: 100%;
  }
}
</style>

<template>
  <div class="route-preview-wrap">
    <img
      :style="{ height: imgHeight + 'px' }"
      :src="url"
      alt=""
      @click="onPreview"
    />
  </div>
</template>

<script>
export default {
  name: "RoutePreview",

  props: ["url"],

  computed: {
    imgHeight() {
      const { windowWidth } = uni.getSystemInfoSync();
      return (windowWidth * 9896) / 3146;
    },
  },

  methods: {
    onPreview() {
      uni.previewImage({
        current: 0,
        urls: [this.url],
      });
    },
  },
};
</script>
