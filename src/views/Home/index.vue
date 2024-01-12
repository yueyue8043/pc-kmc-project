<template>
  <div class="home">
    <div style="display: flex; marginBottom: 30px">
      <div class="toPost" v-if="this.$store.state.user.userInfo.uname === null">
        尚未提交个人信息：<span @click="toPath">点击此处提交个人信息</span>
      </div>
      <div v-else>{{ this.$store.state.user.userInfo.uname }},您好！</div>
     

      <el-button
        type="primary"
        v-if="this.$store.getters.limits == 8"
        @click="show = true"
        >添加用户</el-button
      >
    </div>
    
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
      v-if="show && this.$store.getters.limits == 8"
    >
      <el-form-item label="手机号：" prop="userPhoneNumber">
        <el-input v-model="ruleForm.userPhoneNumber"></el-input>
      </el-form-item>
      <el-form-item label="密码：" prop="userPassWord">
        <el-input type="password" v-model="ruleForm.userPassWord"></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="uname">
        <el-input
          v-model="ruleForm.uname"
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
  </div>
</template>

<script>
import { register } from "@/api/user";
export default {
  data() {
    return {
      show: false,
      ruleForm: {
        userPhoneNumber: "",
        userPassWord: "",
        uname: "", //姓名
        // gender: "", //性别
        jobTitle: "", //职位
      },
      rules: {
        userPhoneNumber: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            pattern:
              /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\d{8}$/,
            message: "请输入正确的手机号",
            trigger: "blur",
          },
        ],
        userPassWord: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            pattern: /^[a-zA-Z]\w{5,17}$/,
            message: "以字母开头，长度在6~18之间，只能包含字母、数字和下划线",
            trigger: "blur",
          },
        ],
        uname: [
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
    };
  },
  created() {},
  methods: {
    toPath() {
      this.$router.push("/personCenter");
    },
    async submitForm(formName) {
      // console.log(this.ruleForm,this.$store.getters.uid)
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const result = await register(this.ruleForm);
          if (result.status == 200) {
            this.$message.success("添加用户成功");
            this.ruleForm = {}
            this.show = false;
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
.toPost {
  span {
    cursor: pointer;
    &:hover {
      color: #0078d4;
    }
  }
}
</style>