<template>
  <div class="deliverDetail" v-if="isShowDetail">
    <el-dialog
      :title="
        closeProcess || this.$store.state.user.rowData.orderStep == -1
          ? '中止流程'
          : `流程进度-${stepList[this.$store.state.user.rowData.orderStep]} `
      "
      :visible.sync="isShowDetail"
      width="50%"
      :before-close="handleClose"
    >
      <closeProcess @handleClose="handleClose" v-if="closeProcess" />
      <outboundStep1
        @handleClose="handleClose"
        v-if="
          this.$store.getters.limits > 2 &&
          this.$store.state.user.rowData.orderStep == 0 &&
          !closeProcess
        "
      />

      <transportStep2
        @handleClose="handleClose"
        v-if="this.$store.state.user.rowData.orderStep == 1 && !closeProcess"
      />

      <receiptPhotosStep3
        @handleClose="handleClose"
        v-if="this.$store.state.user.rowData.orderStep == 2 && !closeProcess"
      />

      <closeOrder
        @handleClose="handleClose"
        v-if="this.$store.state.user.rowData.orderStep == 3 && !closeProcess"
      />
    </el-dialog>
  </div>
</template>

<script>
//中止流程
import closeProcess from "./deliverDetail/closeProcess.vue";
//待出库
import outboundStep1 from "./deliverDetail/outbound.vue";
//送货完毕
import transportStep2 from "./deliverDetail/transport.vue";
//上传回单照片
import receiptPhotosStep3 from "./deliverDetail/receiptPhotos.vue";
//验收回单并结束流程
import closeOrder from "./deliverDetail/closeOrder.vue";

export default {
  components: {
    closeProcess,
    outboundStep1,
    transportStep2,
    receiptPhotosStep3,
    closeOrder,
  },
  props: ["stepList", "closeProcess"],
  data() {
    return {
      isShowDetail: false,
    };
  },
  methods: {
    handleClose() {
      this.$emit("closeDeliverDetail");
      this.$emit("getOrderListData");
    },
  },
};
</script>


<style lang="less" scoped>
/deep/.el-textarea {
  .el-textarea__inner {
    min-height: 150px !important;
  }
}

.btn-box {
  display: flex;
  justify-content: center;
}
</style>