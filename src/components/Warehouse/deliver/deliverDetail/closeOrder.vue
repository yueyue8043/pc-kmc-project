<!-- 验收并关闭订单 -->
<template>
  <div class="closeOrder">
    <div class="tip">*&nbsp;确认回单验收无误，点击按钮后该订单将结束流程</div>

    <div class="btn-box">
      <el-button type="primary" @click="postCloseOrder">确认验收</el-button>
    </div>
  </div>
</template>

<script>
import { postCloseOrder } from "@/api/deliver";
export default {
  data() {
    return {};
  },
  methods: {
    async postCloseOrder() {
      const result = await postCloseOrder({
        orderId: this.$store.state.user.rowData.orderId,
        inspector: this.$store.state.user.userInfo.uname,
      });
      if(result.status == 200) {
        this.$message.success(result.message)
        this.$emit("handleClose");
      }else {
        this.$message.error(result.message)
      }
    },
  },
};
</script>

<style lang="less" scoped>
.tip {
  margin-bottom: 30px;
  text-align: center;
  color: #f56c6c;
}
.btn-box {
  display: flex;
  justify-content: center;
}
</style>