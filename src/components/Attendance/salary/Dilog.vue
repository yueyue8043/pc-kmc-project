<template>
  <el-dialog
    :title="detailData.name"
    :visible.sync="isShow"
    :destroy-on-close="true"
    :before-close="handleClose"
  >
    <p>
      出勤天数：{{ detailData.length !== 0 ? detailData.attendance.length : 0 }}
    </p>
    <div class="tip">
      <div class="tip-box">
        <span>迟到：</span>
        <div class="color-box1"></div>
      </div>

      <div class="tip-box">
        <span>缺卡：</span>
        <div class="color-box2"></div>
      </div>
    </div>

    <el-table
      :data="detailData.attendance"
      :row-class-name="tableRowClassName"
      height="500px"
    >
      <el-table-column
        property="dateTime"
        label="日期"
        width="150"
      ></el-table-column>
      <el-table-column
        property="stratTime"
        label="上班卡"
        width="200"
      ></el-table-column>
      <el-table-column
        property="endTime"
        label="下班卡"
        width="200"
      ></el-table-column>
      <el-table-column
        property="absence"
        label="迟到时长（min）"
        width="200"
      ></el-table-column>
    </el-table>
  </el-dialog>
</template>

<script>
export default {
  props: ["detailData"],
  data() {
    return {
      isShow: false,
    };
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (row.absence !== 0) {
        return "warning-row";
      } else if (row.absenteeism) {
        return "err-row";
      }
      return "";
    },

    handleClose(done) {
      this.$emit("closeDetailDilog");
      done();
    },
  },
};
</script>

<style lang="less">
.detail-dilog {
  height: 800px;
}

.el-table .warning-row {
  background: #ffe3b9;
}

.el-table .err-row {
  background: #fc9292;
}

.tip {
  display: flex;
  margin: 20px 20px;

  .tip-box {
    display: flex;
    margin-right: 20px;
    div {
      width: 20px;
      height: 20px;
      background: #ffe3b9;
    }
    .color-box2 {
      background: #fc9292;
    }
  }
}
</style>