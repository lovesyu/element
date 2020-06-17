<template>
  <el-dialog :title="dialotTitle" :visible.sync="show" :before-close="close">
    <el-form :model="newForm" label-width="100px" :rules="rules" ref="elForm">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="newForm.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="部门编号" prop="zip">
        <el-input v-model="newForm.sn" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { AddDepartmentApi, EditDepartmentApi } from "@/request/api.js";
export default {
  props: {
    show: {
      default: false,
      type: Boolean
    },
    form: {
      default: {},
      type: Object
    }
  },
  data() {
    return {
      dialotTitle: "编辑管理",
      newForm: {},
      rules: {
        name: [
          { required: true, message: "部门名称不能为空", trigger: "blur" }
        ],
        zip: [{ required: true, message: "部门编号不能为空", trigger: "blur" }]
      }
    };
  },
  watch: {
    // watch是Vue提供的一个属性，Vue帮我们封装好了get和set方法
    form(newVal, oldVal) {
      if (newVal) {
        this.newForm = JSON.parse(JSON.stringify(newVal));
        // this.newForm = newVal;
      }
    }
  },
  methods: {
    close(num) {
      this.$emit("close", num);
    },
    submit() {
      this.$refs["elForm"].validate(vali => {
        if (vali) {
          if (this.newForm.id) {
            // 调用编辑接口
            EditDepartmentApi({
              name: this.newForm.name,
              sn: this.newForm.sn,
              id: this.newForm.id
            }).then(res => {
              if (res.success) {
                this.$message({
                  message: "修改部门信息成功",
                  type: "success"
                });
                // this.show = false;
                this.close(1);
                // 添加成功时刷新一下数据
                // this.fetchData();
              } else {
                this.$message({
                  message: res.msg || "修改部门信息失败",
                  type: "error"
                });
              }
            });
          } else {
            // 若为 true，证明都有填写，那么就验证
            // 发送添加请求
            // 调用添加接口
            AddDepartmentApi({
              name: this.newForm.name,
              sn: this.newForm.sn
            }).then(res => {
              if (res.success) {
                this.$message({
                  message: "添加部门成功",
                  type: "success"
                });
                // this.show = false;
                this.close(1);
                // 添加成功时刷新一下数据
                // this.fetchData();
              } else {
                this.$message({
                  message: res.msg || "添加部门失败",
                  type: "error"
                });
              }
            });
          }
        } else {
          // 若为 false，那么证明有一项或者一项以上为空，没有填写
          return false;
        }
      });
    }
  }
};
</script>

<style>
</style>