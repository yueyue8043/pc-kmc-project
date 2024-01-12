<template>
  <div class="login">
    <div class="login-form">
      <el-form
        :label-position="labelPosition"
        label-width="80px"
        :model="registerFrom"
        :rules="rules"
        ref="registerFrom"
      >
        <el-form-item label="手机号：" prop="userPhoneNumber">
          <el-input v-model="registerFrom.userPhoneNumber"></el-input>
        </el-form-item>
        <el-form-item label="密码：" prop="userPassWord">
          <el-input
            type="password"
            v-model="registerFrom.userPassWord"
          ></el-input>
        </el-form-item>
        <!-- <el-form-item label="验证码：" prop="verificationCode">
          <div class="code">
            <el-input
              type="verificationCode"
              v-model="registerFrom.verificationCode"
            ></el-input>
            <el-button type="primary" @click="getCountDown">{{
              this.countDown
            }}</el-button>
          </div>
        </el-form-item> -->
      </el-form>

      <el-button
        type="primary"
        :style="{ width: '112px' }"
        @click="register('registerFrom')"
        >注册</el-button
      >

      <p>已有账号？<span class="toRegister" @click="toPath()">登录</span></p>
    </div>
  </div>
</template>
  
  <script>
import { register } from "../../api/user";
export default {
  data() {
    return {
      labelPosition: "left",
      countDown: "获取验证码",
      isCountDown: false,
      registerFrom: {
        userPhoneNumber: "",
        userPassWord: "",
        // verificationCode: "",
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
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            pattern: /^[a-zA-Z]\w{5,17}$/,
            message: "以字母开头，长度在6~18之间，只能包含字母、数字和下划线",
            trigger: "blur",
          },
        ],
        verificationCode: [
          { required: true, message: "请输入验证码", trigger: "blur" },
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
    register(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const result = await register(this.registerFrom);
          if (result.status == 200) {
            this.$message.success('注册成功，请登录')
            this.$router.push("/login");
          } else {
            this.$message.error(result.message);
          }
        } else {
          return false;
        }
      });
    },
    toPath() {
      this.$router.push("/login");
    },

    // getCountDown() {
    //   if (!this.isCountDown) {
    //     this.isCountDown = true;
    //     this.countDown = 10;
    //     const timer = setInterval(() => {
    //       this.countDown--;
    //       console.log(this.countDown == 0);
    //       if (this.countDown == 0) {
    //         clearInterval(timer);
    //         this.isCountDown = false;
    //         this.countDown = "获取验证码";
    //       }
    //     }, 1000);
    //   }
    // },
  },
};
</script>
  
  <style lang="less" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(45deg, #01404f, #056f7d);
}
.login-form {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 120px 30px 30px;
  width: 480px;
  min-height: 200px;
  border-radius: 4px;
  border: 1px solid #ebeef5;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  // background: rgba(255, 255, 255, 0.9);
  background: #fff;
}

h3 {
  position: absolute;
  top: 5%;
}

.el-button {
  margin: 20px 0px;
}

.toRegister {
  cursor: pointer;
  text-decoration: underline;
  color: cornflowerblue;
  &:hover {
    color: red;
  }
}

.code {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
}
</style>