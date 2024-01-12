<template>
  <div class="closeProcess">
    <el-form
      :label-position="labelPosition"
      label-width="100px"
      :model="closeProcessFrom"
      :rules="rules"
      ref="closeProcessFrom"
    >
      <el-form-item label="中止原因：" prop="discontinueReason">
        <el-input
          type="textarea"
          placeholder="请输入内容"
          maxlength="300"
          show-word-limit
          v-model="closeProcessFrom.discontinueReason"
        >
        </el-input>
      </el-form-item>
    </el-form>
    <div class="btn-box">
      <el-button type="primary" @click="closeProcess('closeProcessFrom')"
        >确认中止</el-button
      >
    </div>
  </div>
</template>

<script>
import { postCloseProcess } from "@/api/deliver";
export default {
  data() {
    return {
      labelPosition: "left",
      closeProcessFrom: {
        discontinueReason: "",
      },
      rules: {
        discontinueReason: [
          { required: true, message: "请填写中止原因", trigger: "blur" },
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
    closeProcess(closeProcessFrom) {
      this.$refs[closeProcessFrom].validate(async (valid) => {
        if (valid) {
          this.closeProcessFrom.orderId =
            this.$store.state.user.rowData.orderId;
          this.closeProcessFrom.discontinueReason =
            this.closeProcessFrom.discontinueReason +
            "\n中止人：" +
            this.$store.state.user.userInfo.uname;
          const result = await postCloseProcess(this.closeProcessFrom);
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