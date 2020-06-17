<template>
  <div style="width: 780px;">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名" prop="name">
        <el-input type="text" v-model="ruleForm.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password" v-if="!employeeId">
        <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="验证密码" prop="checkPass" v-if="!employeeId">
        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="电子邮箱" prop="email">
        <el-input type="text" v-model="ruleForm.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input v-model.number="ruleForm.age"></el-input>
      </el-form-item>
      <el-form-item label="部门" prop="dept">
        <el-select v-model="ruleForm.dept" placeholder="请选择部门">
          <el-option v-for="dept in deptArr" :key="dept.id" :label="dept.name" :value="dept.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="超级管理员">
        <el-switch v-model="ruleForm.admin" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
      </el-form-item>
      <el-form-item label="分配角色" v-if="!ruleForm.admin">
        <el-transfer v-model="ruleForm.ids" :data="roleArr" :props="{key: 'id', label: 'name'}"></el-transfer>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {
  GetDepartmentApi,
  GetRoleApi,
  AddEmployeeApi,
  GetEmployeeList,
  EditEmployeeApi
} from "@/request/api";
export default {
  data() {
    return {
      ruleForm: {
      },
      rules: {
        name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [{ validator: this.checkPass1, trigger: "blur" }],
        checkPass: [{ validator: this.checkPass2, trigger: "blur" }],
        email: [{ validator: this.checkEmail, trigger: "blur" }],
        age: [{ validator: this.checkAge, trigger: "blur" }],
        deptId: [{ required: true, message: "请选择相关部门", trigger: "blur" }]
      },
      deptArr: [],
      roleArr: [],
      employeeId: null
    };
  },
  methods: {
    submitForm() {
      let { name, password, email, age, admin, ids, deptId } = this.ruleForm;
      if (this.employeeId) {
        EditEmployeeApi({
          id: this.employeeId,
          name,
          password,
          email,
          age,
          admin,
          ids: admin ? [] : ids,
          dept: {
            id: deptId
          }
        }).then(res => {
          if (res.success) {
            this.$message({
              type: "success",
              message: "更新成功!"
            });
            this.$router.replace("/employee");
          }
        });
        return;
      }
      AddEmployeeApi({
        name,
        password,
        email,
        age,
        admin,
        ids: admin ? [] : ids,
        dept: {
          id: deptId
        }
      }).then(res => {
        if (res.success) {
          this.$router.replace("/employee");
        }
      });
    },
    checkPass1(rule, value, callback) {
      if (!value) {
        callback("请输入密码");
      } else if (!(value.length >= 6 && value.length <= 16)) {
        //    else if (value.length < 6 || value.length > 16) {
        callback("密码的长度在6-16个字符之间");
      } else {
        callback();
      }
    },
    checkPass2(rule, value, callback) {
      if (value != this.ruleForm.password) {
        callback("两次输入的密码不一致");
      } else {
        callback();
      }
    },
    checkEmail(rule, value, callback) {
      // 这里的 + 不是指拼接符，而是指前面匹配的数在一个以上
      // \. 转义为 .   ? 是零或者1(有可能存在，有可能不存在)
      // var reg = /^[a-zA-Z0-9_-]+@[a-z0-9]{2,5}\.[a-z]{2,3}(\.[a-z]{2,3})?$/;
      var reg = /^[a-zA-Z0-9_-]+@[a-z0-9]{2,5}\.[a-z]{2,3}(\.[a-z]{2,3})?$/;
      if (!reg.test(value)) {
        // 此方法可以检测一个字符串是否匹配某个模式。
        callback("请输入正确的邮箱格式");
      } else {
        callback();
      }
    },
    checkAge(rule, value, callback) {
      console.log(value);
      // 正则匹配
      if (!value.trim()) {
        callback("请输入您的年  龄");
      } else if (!(value >= 18 && value <= 65)) {
        callback("您的年龄不符合规定");
      } else {
        callback();
      }
    }
  },
  created() {
    if (this.$route.params.eid) {
      this.employeeId = this.$route.params.eid;
      GetEmployeeList({
        id: this.employeeId
      }).then(res => {
        if (res.success) {
          let { name, age, email, admin, password, roles, dept } = res.data;
          this.$set(this.ruleForm, "name", name);
          this.$set(this.ruleForm, "age", age);
          this.$set(this.ruleForm, "email", email);
          this.$set(this.ruleForm, "admin", admin);
          dept && this.$set(this.ruleForm, "dept", dept.id);
          this.$set(this.ruleForm, "ids", roles.map(item => item.id));

          // this.ruleForm.name = name;
          // this.ruleForm.age = age;
          // this.ruleForm.email = email;
          // this.ruleForm.admin = admin;
          // dept && ;
          // this.ruleForm.ids = roles.map(item => item.id);

          console.log(this.ruleForm);
        }
      });
    }
    GetRoleApi({
      pageSize: 100,
      currentPage: 1
    }).then(res => {
      if (res.success) {
        this.roleArr = res.data.list;
      }
    });
    GetDepartmentApi({
      pageSize: 100,
      currentPage: 1
    }).then(res => {
      if (res.success) {
        this.deptArr = res.data.list;
        console.log(this.deptArr);
      }
    });
  }
};
</script>

<style>
</style>