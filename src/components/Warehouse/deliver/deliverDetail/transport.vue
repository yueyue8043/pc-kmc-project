<template>
  <div class="transport">
    <el-form
      :label-position="labelPosition"
      label-width="100px"
      :model="transportFrom"
      :rules="rules"
      ref="transportFrom"
    >
      <el-form-item label="实收款：" prop="realityPayment">
        <el-input
          v-model="transportFrom.realityPayment"
          style="width: 140px"
        ></el-input>
      </el-form-item>
      <el-form-item label="回单信息：" prop="reply">
        <el-input
          type="textarea"
          placeholder="请输入回单信息"
          maxlength="300"
          show-word-limit
          v-model="transportFrom.reply"
        >
        </el-input>
      </el-form-item>
    </el-form>
    <div class="btn-box">
      <el-button type="primary" @click="transport('transportFrom')"
        >提交</el-button
      >
    </div>
  </div>
</template>

<script>
import { postReplyInfo } from "@/api/deliver";
export default {
  data() {
    return {
      labelPosition: "left",
      transportFrom: {
        realityPayment: "",
        reply: "",
      },
      rules: {
        realityPayment: [
          { required: true, message: "请输入应收款", trigger: "blur" },
          {
            pattern: /^-?(0|([1-9][0-9]*))(\.[\d]{2})?$/,
            message: "只能输入正整数、小数（小数严格保留两位小数）",
            trigger: "blur",
          },
        ],
        reply: [
          { required: true, message: "请填写回单信息", trigger: "blur" },
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
    transport(transportFrom) {
      this.$refs[transportFrom].validate(async (valid) => {
        if (valid) {
          this.transportFrom.orderId = this.$store.state.user.rowData.orderId;

          const result = await postReplyInfo(this.transportFrom);
          if (result.status == 200) {
            this.$emit("handleClose");
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