<template>
  <div class="salary">
    <el-upload
      ref="uploadRef"
      class="upload-demo"
      action=""
      accept="xls"
      :auto-upload="false"
      :show-file-list="false"
      :on-change="handleUploadChange"
    >
      <el-button round icon="upload" type="primary">点击上传</el-button>

    </el-upload>
 

    <div class="inputBox">
      <div class="late">
        迟到扣款：
        <el-input
          v-model="late"
          style="width: 120px"
          @input="getLate"
        ></el-input>
      </div>

      <div class="rest">
        请假扣款：
        <el-input
          @input="getRest"
          v-model="rest"
          style="width: 120px"
        ></el-input>
      </div>
    </div>

    <div class="header-line"></div>

    <el-table
      :data="newData"
      :cell-style="{ 'text-align': 'center' }"
      :header-cell-style="{ 'text-align': 'center' }"
      :border="true"
      height="600px"
    >
      <el-table-column type="index" width="50"> </el-table-column>
      <!-- <el-table-column prop="date" label="日期" width="180"> </el-table-column> -->
      <el-table-column prop="name" label="姓名" width="100"> </el-table-column>
      <el-table-column prop="absenceCount" label="缺勤时常(min)" width="120">
      </el-table-column>
      <el-table-column prop="absenceDeduction" label="迟到扣款" width="120">
      </el-table-column>
      <el-table-column prop="absenteeismCount" label="缺卡天数" width="100">
      </el-table-column>
      <el-table-column prop="restTime" label="请假次数" width="100">
        <template slot-scope="scope">
          <el-input @input="getRest()" v-model="scope.row.restTime"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="restDeduction" label="请假扣款" width="120">
      </el-table-column>
      <el-table-column
        prop="shouldWork"
        label="应出勤天数"
        width="100"
      ></el-table-column>

      <el-table-column
        prop="realityWork"
        label="实际出勤天数"
        width="120"
      ></el-table-column>

      <el-table-column prop="salary" label="底薪" width="100">
        <template slot-scope="scope">
          <el-input
            @input="getShouldSalary(scope.row)"
            v-model="scope.row.salary"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="insure" label="五险一金" width="100">
        <template slot-scope="scope">
          <el-input
            @input="getShouldSalary(scope.row)"
            v-model="scope.row.insure"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column
        prop="shouldSalary"
        label="应发工资"
        width="100"
      ></el-table-column>
      <el-table-column prop="realySalary" label="实发工资" width="100">
        <el-input v-model="newData.realySalary"></el-input>
      </el-table-column>
      <el-table-column label="考勤详情">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-more-outline"
            @click="getDetailData(scope.row)"
            circle
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <Detail
      ref="child"
      @closeDetailDilog="closeDetailDilog"
      :detailData="detailData"
    />
  </div>
</template>

<script>
import XLSX from "xlsx";
import Detail from "@/components/Attendance/salary/Dilog.vue";
export default {
  components: {
    Detail,
  },
  data() {
    return {
      attendanceData: [],
      newData: [],
      rest: 0,
      late: 0,

      detailData: [],
    };
  },
  methods: {
 
    getDetailData(row) {
      this.detailData = row;

      this.$refs.child.isShow = !this.$refs.child.isShow;
    },

    closeDetailDilog() {
      this.$refs.child.isShow = !this.$refs.child.isShow;
    },

    getLate() {
      this.newData.forEach((e) => {
        e.absenceDeduction = (this.late * e.absenceCount).toFixed(2);
      });
      this.getShouldSalary();
    },

    getRest() {
      this.newData.forEach((e) => {
        e.restDeduction = (this.rest * e.restTime).toFixed(2);
        this.getShouldSalary();
        this.$forceUpdate();
      });
    },

    //应发工资
    getShouldSalary() {
      this.newData.forEach((e) => {
        e.shouldSalary =
          e.salary.toFixed(2) -
          (e.absenceDeduction || 0) -
          (e.restDeduction || 0) -
          (e.insure || 0).toFixed(2);
      });
      this.$forceUpdate();
    },

    refresh() {
      this.$forceUpdate();
    },

    //处理考勤数据
    processingData(data) {
      const newData = data.filter((item) => item.sheetName === "考勤记录")[0]
        .sheet;
      // 匹配每个人当月考勤
      newData.forEach((e, index) => {
        let obj = {};
        if (index >= 2 && e.__EMPTY_7 === "姓 名:") {
          obj.name = e.__EMPTY_9;

          if (newData[index + 1].__EMPTY_7 !== "姓 名:") {
            obj.data = newData[index + 1];
            this.attendanceData.push(obj);
          } else {
            obj.data = {};
            this.attendanceData.push(obj);
          }
        }
      });

      const month = new Date().getMonth() == 0 ? 12 : new Date().getMonth();

      const year = new Date().getFullYear();
      let dayCount = new Date(year, month, 0).getDate();
      let sundayCount = 0;

      for (let i = 1; i <= dayCount; i++) {
        const currentDay = new Date(`${year}-${month}-${i}`).getDay();
        if (currentDay == 0) {
          sundayCount += 1;
        }
      }

      //修改属性名为当月日期
      this.attendanceData.forEach((e) => {
        Object.keys(e.data).map((item) => {
          if (item == "考 勤 记 录 表") {
            e.data["考 勤 记 录 表"] = e.data["考 勤 记 录 表"]
              .split(/(.{5})/)
              .filter((item) => item !== "");
            e.data[month + "-01"] = e.data["考 勤 记 录 表"];

            // console.log(e.data[item])
            delete e.data["考 勤 记 录 表"];
          } else if (item == "__EMPTY") {
            e.data[month + "-02"] = e.data["__EMPTY"]
              .split(/(.{5})/)
              .filter((item) => item !== "");
            delete e.data["__EMPTY"];
          } else {
            let num = item.split("_");
            num =
              +num[num.length - 1] + 2 > 9
                ? +num[num.length - 1] + 2
                : "0" + (+num[num.length - 1] + 2);
            e.data[month + "-" + num] = e.data[item]
              .split(/(.{5})/)
              .filter((item) => item !== "");
            delete e.data[item];
          }
        });
      });
      this.attendanceData.forEach((e) => {
        let obj = {};
        let attendance = [];
        obj.name = e.name;
        for (const key in e.data) {
          const data = this.getAbsenceTime(e.data[key]);
          data.dateTime = year + "-" + key;
          attendance.push(data);
        }
        obj.attendance = attendance;
        obj.realityWork = attendance.length;
        obj.shouldWork = dayCount - sundayCount;
        this.newData.push(obj);
      });

      this.completionInfo();
    },

    //补全考勤信息
    completionInfo() {
      this.newData.forEach((e, index) => {
        let sum = 0;
        e.id = index;
        e.attendance.forEach((item) => {
          sum += item.absence;
        });
        let temp = e.attendance.filter((item) => item.absenteeism);
        e.absenceCount = sum;

        e.absenteeismCount = temp.length;
        e.restTime = null;
        e.shouldSalary = null;
        e.restTimeCount = null;
        e.insure = null;
        e.salary = null;
        e.absenceDeduction = null;
      });

      console.log(this.newData);
    },

    //获取每日考勤
    getAbsenceTime(arr) {
      const obj = { stratTime: "", endTime: "" };
      const today = new Date().toLocaleDateString();
      const start = Date.parse(new Date(today + " 08:00"));
      const end = Date.parse(new Date(today + " 17:00"));
      const center = Date.parse(new Date(today + " 12:00"));
      //归纳打卡时间
      arr.forEach((e, index) => {
        arr[index] = today + " " + e;
        const now = Date.parse(arr[index]);
        //上班卡
        if (now <= center) {
          //下午请假
          if (
            obj.stratTime !== "" &&
            now <= center &&
            now - Date.parse(obj.stratTime) >= 1800000
          ) {
            return (obj.endTime = e);
          }
          obj.stratTime = e;
          //下班卡
        } else {
          //上午请假&&下午打卡间隔半小时以上
          if (obj.stratTime === "" && end - now >= 1800000) {
            return (obj.stratTime = e);
          }
          obj.endTime = e;
        }
      });

      //获取每日缺勤时长
      let absence = 0;
      let absenteeism = false; //当天是否缺卡
      if (obj.stratTime || obj.endTime) {
        if (start < Date.parse(today + " " + obj.stratTime) && obj.stratTime) {
          absence =
            (Date.parse(today + " " + obj.stratTime) - start) / 1000 / 60;
        }
        if (end > Date.parse(today + " " + obj.endTime) && obj.endTime) {
          absence += (end - Date.parse(today + " " + obj.endTime)) / 1000 / 60;
        }

        if (obj.stratTime && obj.endTime) {
        } else {
          absenteeism = !absenteeism;
        }
      }
      obj.absence = absence;
      obj.absenteeism = absenteeism;

      return obj;
    },

    async handleUploadChange(file) {
      this.analysis(file).then((tabJson) => {
        if (tabJson && tabJson.length > 0) {
          //成功解析出数据
          this.xlsxJson = tabJson;

          this.processingData(this.xlsxJson);
        }
      });
    },

    analysis(file) {
      return new Promise(function (resolve, reject) {
        const reader = new FileReader();

        reader.onload = function (e) {
          // console.log(e)
          const data = e.target.result;

          this.wb = XLSX.read(data, {
            type: "binary",
          });

          const result = [];
          this.wb.SheetNames.forEach((sheetName) => {
            // console.log(sheetName)
            result.push({
              sheetName: sheetName,
              sheet: XLSX.utils.sheet_to_json(this.wb.Sheets[sheetName]),
            });
          });
          resolve(result);
        };
        reader.readAsBinaryString(file.raw);
        // reader.readAsBinaryString(file) // 传统input方法
      });
    },
  },
};
</script>

<style lang="less" scoped>
.header-line {
  margin: 20px 0px;
  border-bottom: 1px solid #eceff7;
}

.inputBox {
  display: flex;
  margin: 40px 0px;
  div {
    margin: 0px 20px;
  }
}
</style>