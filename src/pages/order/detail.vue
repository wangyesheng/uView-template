<style lang="scss" scoped>
.ensure {
  width: 100vw;
  min-height: 100vh;
  padding: 30rpx;
  padding-bottom: 180rpx;
  box-sizing: border-box;
  position: relative;
}
</style>

<template>
  <div class="ensure">
    <BasicOrderInfo :orderNumber="order_number" />
  </div>
</template>

<script>
import BasicOrderInfo from "@/components/BasicOrderInfo";

export default {
  name: "OrderDetail",
  components: {
    BasicOrderInfo,
  },
  data() {
    return {
      order_number: null,
    };
  },
  onLoad(options) {
    this.order_number = options.order_number;
  },
};
</script>
