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
          <el-form-item label="密码：" prop="userPassword">
            <el-input type="password" v-model="registerFrom.userPassword"></el-input>
          </el-form-item>
          <!-- <el-form-item label="验证码：" prop="verificationCode">
              <el-input type="verificationCode" v-model="registerFrom.verificationCode"></el-input>
            </el-form-item> -->
        </el-form>
  
        <el-button type="primary" @click="register('registerFrom')" >注册</el-button>
  
        <p>已有账号？<span class="toRegister" @click="toPath()">登录</span></p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        labelPosition: "left",
        registerFrom: {
          userPhoneNumber: "",
          userPassword: "",
        //   verificationCode:'',
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
          userPassword: [
            { required: true, message: "请输入密码", trigger: "blur" },
            {
              pattern: /^[a-zA-Z]\w{5,17}$/,
              message: "以字母开头，长度在6~18之间，只能包含字母、数字和下划线",
              trigger: "blur",
            },
          ],
        //   verificationCode:[
        //   { required: true, message: "请输入验证码", trigger: "blur" },
        //     {
        //       pattern: /^[a-zA-Z]\w{5,17}$/,
        //       message: "以字母开头，长度在6~18之间，只能包含字母、数字和下划线",
        //       trigger: "blur",
        //     },
        //   ]
        },
      };
    },
    methods: {
        register(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              alert('submit!');
            } else {
              return false;
            }
          });
        },
    toPath() {
        this.$router.push('/login')
    }
    }
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
  </style>