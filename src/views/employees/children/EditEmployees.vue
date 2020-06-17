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
      <el-form-item label="电子邮件" prop="email">
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
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { GetDepartmentApi, GetEmployeeApi } from "@/request/api";
export default {
  data() {
    return {
      rules: {},
      ruleForm: {},
      deptArr: []
    };
  },
  created() {
    GetDepartmentApi({
      currentPage: 1,
      pageSize: 100
    }).then(res => {
      if (res.success) {
        this.deptArr = res.data.list;
      }
    });
  }
};
</script>

<style>
</style>