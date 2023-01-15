<template>
  <view class="content">
    <u-button type="primary" text="Hello uView"></u-button>
  </view>
</template>

<script>
export default {
  data() {
    return {
      title: "Hello",
    };
  },
  onLoad() {},
  methods: {},
};
</script>

<style lang="scss">
.content {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: $uni-bg-color-grey;
}
</style>
