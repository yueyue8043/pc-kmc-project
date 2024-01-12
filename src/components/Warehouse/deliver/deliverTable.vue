<template>
  <div class="deliverTable">
    <!-- 筛选条件 -->
    <div class="select-box">
      <div>
        <el-input
          v-model="params.salesman"
          placeholder="请输入业务员姓名"
        ></el-input>
      </div>
      <div>
        <el-select
          v-model="params.isClose"
          placeholder="请选择流程是否结束"
          clearable
        >
          <el-option
            v-for="item in isCloseOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>

      <div><el-button type="primary" @click="getOrderListData()">查询</el-button></div>
    </div>

    <!-- 表格 -->
    <el-table
      :data="deliverData"
      height="650"
      :border="true"
      :cell-style="{ 'text-align': 'center' }"
      :header-cell-style="{ 'text-align': 'center' }"
      style="width: 100%"
    >
      <el-table-column prop="orderId" label="ID" width="50"> </el-table-column>
      <el-table-column prop="salesman" label="业务员" width="80">
      </el-table-column>

      <el-table-column label="进度" width="80">
        <template slot-scope="scope">
          <span>{{
            scope.row.orderStep == -1
              ? "流程中止"
              : stepList[scope.row.orderStep]
          }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="startTime" label="流程开始时间" width="160">
        <template slot-scope="scope">
          <span>{{
            dayjs(+scope.row.startTime).format("YYYY-MM-DD HH:mm:ss")
          }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="endTime" label="流程结束时间" width="160">
        <template slot-scope="scope">
          <span>{{
            scope.row.endTime
              ? dayjs(+scope.row.endTime).format("YYYY-MM-DD HH:mm:ss")
              : null
          }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="warehousePerson" label="出库人员" width="100">
      </el-table-column>
      <el-table-column prop="warehouseInfo" label="出库信息"> </el-table-column>
      <el-table-column prop="receivables" label="应收款" width="75">
      </el-table-column>
      <el-table-column
        prop="realityPayment"
        label="实收款"
        width="75"
      ></el-table-column>

      <el-table-column prop="reply" label="回单信息"> </el-table-column>

      <el-table-column prop="receipt" label="回单照片" width="80">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-picture-outline"
            circle
            v-if="scope.row.receiptPhotos !== null"
            @click="openPreviewPhotos(scope.row)"
          ></el-button>
          <span v-else></span>
        </template>
      </el-table-column>
      <el-table-column prop="discontinueReason" label="中止原因" width="120">
        <template slot-scope="scope">
          <el-button
            v-if="!scope.row.isClose"
            type="danger"
            icon="el-icon-close"
            circle
            @click="openDeliverDetail(scope.row, true)"
          ></el-button>
          <span v-else>{{ scope.row.discontinueReason }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="inspector" label="验收人" width="80">
      </el-table-column>
      <el-table-column prop="receipt" label="详情" width="70">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-more-outline"
            circle
            @click="openDeliverDetail(scope.row)"
            v-if="!scope.row.isClose"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="params.pageNum"
      :page-sizes="[1, 5, 10, 20]"
      :page-size="params.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>

    <DeliverDialog
      ref="child"
      @closeDeliverDetail="closeDeliverDetail"
      @getOrderListData="getOrderListData"
      :stepList="stepList"
      :closeProcess="closeProcess"
    />

    <previewPhotos
      ref="previewPhotos"
      @closePreviewPhotos="closePreviewPhotos"
    />
  </div>
</template>

<script>
import { getOrderList } from "@/api/deliver";
import DeliverDialog from "./deliverDialog.vue";
import previewPhotos from "@/components/previewPhotos.vue";
export default {
  components: {
    DeliverDialog,
    previewPhotos,
  },
  data() {
    return {
      //0、待出库  1、运输中 2、上传回单照片 3、会计验收回单 4、流程结束 -1、送货失败
      stepList: [
        "待出库",
        "运输中",
        "上传回单照片",
        "验收回单",
        "流程结束",
        "送货失败",
      ],
      closeProcess: false,
      deliverData: [], //列表数据
      params: {
        pageNum: 1,
        pageSize: 20,
      },
      total: 0,
      //流程是否结束选项
      isCloseOptions: [
        {
          value: 0,
          label: "否",
        },
        {
          value: 1,
          label: "是",
        },
      ],
    };
  },
  mounted() {
    this.getOrderListData();
  },
  methods: {
    //打开详情弹窗
    openDeliverDetail(row, closeProcess) {
      this.$refs.child.isShowDetail = !this.$refs.child.isShowDetail;
      this.closeProcess = closeProcess;
      this.$store.commit("user/setRowData", row);
    },

    //打开预览弹窗
    openPreviewPhotos(row) {
      this.$refs.previewPhotos.isShowPreviewPhotos =
        !this.$refs.child.isShowPreviewPhotos;
      this.$store.commit("user/setRowData", row);
      this.$refs.previewPhotos.getPreviewList();
    },

    closeDeliverDetail() {
      this.$refs.child.isShowDetail = !this.$refs.child.isShowDetail;
    },

    closePreviewPhotos() {
      this.$refs.previewPhotos.isShowPreviewPhotos =
        !this.$refs.previewPhotos.isShowPreviewPhotos;
    },

    async getOrderListData() {
      console.log('111111')
      const result = await getOrderList(this.params);
      this.deliverData = result.data;

      this.total = 0;
    },

    handleSizeChange(val) {
      this.params.pageSize = val;
      this.getOrderListData();
    },
    handleCurrentChange(val) {
      this.params.pageNum = val;
      this.getOrderListData();
    },
  },
};
</script>

<style lang="less" scoped>
.select-box {
  display: flex;
  
  margin: 20px 0px;

  div {
    margin-right:20px;
    width: 200px;
  }
}
</style>