<template>
  <div class="personCenter">
    <div class="tag" v-if="!this.$store.getters.limits">填写个人信息：</div>
    <el-form
      :model="ruleForm"
      :rules="infoRules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
      v-if="!this.$store.getters.limits"
    >
      <el-form-item label="姓名" prop="name">
        <el-input
          v-model="ruleForm.name"
          placeholder="请输入您的真实姓名"
        ></el-input>
      </el-form-item>

      <!-- <el-form-item label="性别" prop="gender">
        <el-select v-model="ruleForm.gender" placeholder="请选择性别">
          <el-option
            v-for="item in genderOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item> -->

      <el-form-item label="职位" prop="jobTitle">
        <el-select v-model="ruleForm.jobTitle" placeholder="请选择职位">
          <el-option
            v-for="item in jobTitleOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
    </el-form>

    <!-- <div class="tip">*暂未开放修改功能，请确认身份信息填写无误后再提交</div> -->
    <div class="tag">修改密码：</div>
    <el-form
      label-width="80px"
      :model="loginFrom"
      :rules="rules"
      ref="loginFrom"
    >
      <el-form-item label="密码：" prop="userPassWord">
        <el-input type="password" v-model="loginFrom.userPassWord"></el-input>
      </el-form-item>
    </el-form>

    <el-button type="primary" @click="changeUserPassWord('loginFrom')"
      >修改</el-button
    >
  </div>
</template>

<script>
import { postChangeUserPassWord } from "@/api/user";
export default {
  data() {
    return {
      ruleForm: {
        name: "", //姓名

        jobTitle: "", //职位
      },

      infoRules: {
        name: [
          { required: true, message: "请输入您的真实姓名", trigger: "blur" },
          { min: 2, max: 5, message: "长度在 2 到 5 个字符", trigger: "blur" },
        ],
        // gender: [
        //   { required: true, message: "请选择您的性别", trigger: "change" },
        // ],
        jobTitle: [
          { required: true, message: "请选择您的职位", trigger: "change" },
        ],
      },
      genderOptions: [
        {
          value: 0,
          label: "女",
        },
        {
          value: 1,
          label: "男",
        },
      ],

      jobTitleOptions: [
        {
          value: 0b1000,
          label: "管理员",
        },
        {
          value: 0b100,
          label: "财务",
        },
        {
          value: 0b10,
          label: "厂库管理员",
        },
        {
          value: 0b1,
          label: "业务员",
        },
      ],

      //修改密码
      loginFrom: {
        userPassWord: "",
      },
      rules: {
        userPassWord: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            pattern: /^[a-zA-Z]\w{5,17}$/,
            message: "以字母开头，长度在6~18之间，只能包含字母、数字和下划线",
            trigger: "blur",
          },
        ],
      },
    };
  },

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const data = {
            uid: this.$store.getters.uid,
            uname: this.ruleForm.name,
            jobTitle: this.ruleForm.jobTitle,
          };

          await this.$store.dispatch("user/postUserInfo", data);
          await this.$store.dispatch("user/getUserInfo");
          this.$router.push("/");
          this.$forceUpdate();
        } else {
          return false;
        }
      });
    },

    changeUserPassWord(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const result = await postChangeUserPassWord({
            userPassWord: this.loginFrom.userPassWord,
            uid: this.$store.getters.uid,
          });

          if (result.status == 200) {
            this.$store.commit("user/removeToken");
            this.$router.push("/login");
          } else {
            this.$message.error(result.message);
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
.el-form-item {
  width: 300px;
}

.el-button {
  margin-left: 140px;
}
.tip {
  margin-top: 30px;
  margin-left: 20px;
  font-size: 14px;
  color: #f56c6c;
}

.tag {
  margin: 40px 0px 40px;
}
</style>