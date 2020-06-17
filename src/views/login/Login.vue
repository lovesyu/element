<template>
  <div class="login-container">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="login-from">
      <h3>懒洋洋</h3>
      <el-form-item prop="account">
        <el-input type="text" placeholder="请输入账号/邮箱" v-model="ruleForm.account" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="password"
          placeholder="请输入密码"
          v-model="ruleForm.password"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width: 100%;" @click="loginFn">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios  from 'axios'
export default {
  data() {
    return {
      ruleForm: {},
      rules: {
        account: [
          { required: true, message: "请输入账号密码", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    loginFn() {
      this.$refs.ruleForm.validate(isVal => {
        console.log(isVal);
        if (isVal) {
             this.$router.push('./home/Home');
            //  this.$router.push('/');
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.login-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #324057;
}
.login-from {
  width: 300px;
  height: 200px;
  h3 {
    text-align: center;
    padding: 15px;
    color: #fff;
    font-size: 24px;
    letter-spacing: 2px;
  }
  div {
    label {
      color: #fff;
    }
  }
}
</style>