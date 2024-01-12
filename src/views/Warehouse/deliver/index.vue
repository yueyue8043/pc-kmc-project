<template>
  <div class="deliver">
    <el-button type="primary" @click="isConfirmAddition = true"
      >新建流程</el-button
    >

    <el-dialog title="提示" :visible.sync="isConfirmAddition" width="30%">
      <span>是否新建流程？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isConfirmAddition = false">取 消</el-button>
        <el-button type="primary" @click="confirmAddition()">确 定</el-button>
      </span>
    </el-dialog>

    <div class="header-line"></div>

    <DeliverTable ref="child" />
  </div>
</template>

<script>
import DeliverTable from "@/components/Warehouse/deliver/deliverTable.vue";
import { postNewProcess } from "@/api/deliver";
export default {
  components: {
    DeliverTable,
  },
  data() {
    return {
      isConfirmAddition: false,
    };
  },
  methods: {
    async confirmAddition() {
      const data = {
        salesman: this.$store.state.user.userInfo.uname,
      };
      const result = await postNewProcess(data);
      if (result.status == 200) {
        this.$message.success(result.message);
      } else {
        this.$message.error("新建流程失败");
      }

      this.$refs.child.getOrderListData()
      this.isConfirmAddition = false;
    },
  },
};
</script>

<style lang="less" scoped>
.header-line {
  margin: 20px 0px;
  border-bottom: 1px solid #eceff7;
}
</style>