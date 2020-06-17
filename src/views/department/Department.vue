<template>
  <div>
    <section class="header-content">
      <el-button type="success" size="small" icon="el-icon-plus" @click="add">添加</el-button>
    </section>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="id" label="部门id"></el-table-column>
      <el-table-column prop="name" label="部门名称"></el-table-column>
      <el-table-column prop="zip" label="部门编号"></el-table-column>
      <el-table-column label="操作">
        <div slot-scope="scope">
          <el-button type="primary" size="small" @click="edit(scope.row)" icon="el-icon-edit">编辑</el-button>
          <el-button type="danger" size="small" @click="del(scope.row)" icon="el-icon-delete">删除</el-button>
        </div>
      </el-table-column>
    </el-table>
    <section class="footer-content">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 20, 50, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </section>
    <dept-dialog :show="dialogFormVisible" :form="form" @close="dialogClose"></dept-dialog>
  </div>
</template>

<script>
import DeptDialog from "./children/DeptDialog";
import axios  from 'axios'
export default {
  data() {
    return {
      tableData: [],
      currentPage: 1,
      total: 0,
      pageSize: 5,
      dialogFormVisible: false,
      form: {}
    };
  },
  components: {
    DeptDialog
  },
  created(){
     
  },
  methods: {
    dialogClose(num) {
      this.dialogFormVisible = false;
      if (num === 1) {
        this.fetchData();
      }
    },
    del(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.fetchData();
        })
        .catch(() => {
          this.$message({
              type: "fail",
              message: "删除失败!"
          });
        });
    },
    edit(row) {
      this.dialotTitle = "部门编辑";
      this.dialogFormVisible = true;
      // 因为 form 没有 get 和 set 方法，所以不能直接添加
      // this.$set(this.form, "name", row.name);
      // this.$set(this.form, "sn", row.sn);
      // this.form.id = row.id;
      // 用对象赋值的方法没有办法修改，因为自定义的事件没有get和set方法，需要我们手动添加上去
      this.form = row;
    },
    add() {
      this.dialotTitle = "部门添加";
      this.dialogFormVisible = true;
      this.form = {};
    },
    fetchData() {
      axios.get('/user/list',
      {page:1,pagesize:5}).then(res=>{
        if(res.status ==200){
          this.tableData = res.data;
          this.total = res.data.length;
        }
      })
    },
    handleSizeChange(size) {
      console.log(size);
      this.pageSize = size;
      this.fetchData();
    },
    handleCurrentChange(page) {
      console.log(page);
      this.currentPage = page;
      this.fetchData();
    }
  },
  created() {
    this.fetchData();
  }
};
</script>

<style scoped>
</style>