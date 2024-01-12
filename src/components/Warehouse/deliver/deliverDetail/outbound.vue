<template>
  <!-- 待出库 -->
  <div class="outbound">
    <el-form
      :label-position="labelPosition"
      label-width="100px"
      :model="outboundFrom"
      :rules="rules"
      ref="outboundFrom"
    >
      <el-form-item label="应收款：" prop="receivables">
        <el-input
          v-model="outboundFrom.receivables"
          style="width: 140px"
        ></el-input>
      </el-form-item>
      <el-form-item label="出库信息：" prop="warehouseInfo">
        <el-input
          type="textarea"
          placeholder="请输入内容"
          maxlength="300"
          show-word-limit
          v-model="outboundFrom.warehouseInfo"
        >
        </el-input>
      </el-form-item>
    </el-form>
    <div class="btn-box">
      <el-button type="primary" @click="outbound('outboundFrom')"
        >确认出库</el-button
      >
    </div>
  </div>
</template>

<script>
import { postWarehouseInfo } from "@/api/deliver";
export default {
  data() {
    return {
      labelPosition: "left",
      outboundFrom: {
        receivables: "",
        warehouseInfo: "",
      },
      rules: {
        receivables: [
          { required: true, message: "请输入应收款", trigger: "blur" },
          {
            pattern: /^-?(0|([1-9][0-9]*))(\.[\d]{2})?$/,
            message: "只能输入正整数、小数（小数严格保留两位小数）",
            trigger: "blur",
          },
        ],
        warehouseInfo: [
          { required: true, message: "请填写出库信息", trigger: "blur" },
          {
            min: 2,
            max: 300,
            message: "长度在 2到 300 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    outbound(outboundFrom) {
      this.$refs[outboundFrom].validate(async (valid) => {
        if (valid) {
          this.outboundFrom.orderId = this.$store.state.user.rowData.orderId;
          this.outboundFrom.warehousePerson =
            this.$store.state.user.userInfo.uname;
          const result = await postWarehouseInfo(this.outboundFrom);
          if(result.status == 200) {
            this.$emit('handleClose')
          }
     
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
 .btn-box {
  display: flex;
  justify-content: center;
}
</style>