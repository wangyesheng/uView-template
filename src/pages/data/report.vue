<style lang="scss" scoped>
.report-wrap {
  padding: 40rpx;
  min-height: 100vh;
  box-sizing: border-box;
  background: #f9f9fd;
}
</style>

<template>
  <div class="report-wrap"></div>
</template>

<script>
import { getReportsRes } from "@/api";
export default {
  name: "ReportList",

  data() {
    return {
      reports: [],
    };
  },

  methods: {
    async getReports() {
      const data = await getReportsRes();
      console.log(data);
    },
  },

  onLoad() {
    this.getReports();
  },
};
</script>
