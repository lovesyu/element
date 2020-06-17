<template>
  <div>
    <section class="header-content">
      <el-form :inline="true">
        <el-form-item label="关键字">
          <el-input v-model="keyword" placeholder="请输入姓名/邮箱"></el-input>
        </el-form-item>
        <el-form-item label="部门">
          <el-select v-model="deptId" placeholder="请选择部门">
            <el-option label="全部" :value="-1"></el-option>
            <el-option v-for="dept in deptArr" :key="dept.id" :label="dept.name" :value="dept.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search" size="small" icon="el-icon-search">查询</el-button>
          <el-button type="success" @click="add" size="small" icon="el-icon-plus">添加</el-button>
          <el-button type="danger" @click="delMore" size="small" icon="el-icon-delete">批量删除</el-button>
          <el-button type="warning" @click="exportData" size="small" icon="el-icon-download">导出</el-button>
          <el-upload
            style="display:inline-block;margin-left: 10px;"
            action
            :on-change="handleChange"
            :on-remove="handleRemove"
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            :auto-upload="false"
            :show-file-list="false"
          >
            <el-button type="warning" size="small" icon="el-icon-upload2">导入</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
    </section>
    <el-table :data="tableData" border style="width: 100%" @selection-change="selectChange" id='table-content'>
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="id" label="编号" width="180"></el-table-column>
      <el-table-column prop="name" label="名称" width="180"></el-table-column>
      <el-table-column prop="email" label="email" width="180"></el-table-column>
      <el-table-column prop="integer" label="年龄" width="180"></el-table-column>
      <el-table-column prop="ctitle" label="部门" width="180"></el-table-column>
      <el-table-column label="操作">
        <div slot-scope="scope">
          <el-button type="primary" size="small" @click="edit(scope.$index,scope.row)" icon="el-icon-edit">编辑</el-button>
          <el-button type="danger" size="small" @click="del(scope.$index,scope.row)" icon="el-icon-delete">删除</el-button>
        </div>
      </el-table-column>
    </el-table>
    <section class="footer-content">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 50, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import FileSaver from "file-saver";
import XLSX from "xlsx";
export default {
  data() {
    return {
      currentPage: 1,
      pageSize: 5,
      total: 0,
      formInline: {},
      deptId: -1,
      deptArr: [],
      currentPage: 1,
      pageSize: 5,
      keyword: "",
      tableData: [],
      selection: []
    };
  },
  methods: {
    edit(row) {
      this.$router.replace("/employee/edit/" + row.id);
    },
    del(i,row) {
        console.log(i,row)
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
            this.tableData.map((item,index)=>{
                if(i === index){
                    this.tableData.splice(index,1)
                }
            })
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        //   this.getData();
        })
        .catch(() => {
          this.$message({
            type: "success",
            message: "删除失败!"
          });
        });
    },
    exportData() {
        console.log( this.$route.meta.name)
      let et = XLSX.utils.table_to_book(
        document.getElementById("table-content")
      ); //此处传入table的DOM节点
      let etout = XLSX.write(et, {
        bookType: "xlsx",
        bookSST: true,
        type: "array"
      });
      try {
        FileSaver.saveAs(
          new Blob([etout], {
            type: "application/octet-stream"
          }),
          this.$route.meta.name + ".xlsx"
        ); 
      } catch (e) {
        console.log(e, etout);
      }
      return etout;
    },
    delMore() {
      if (!this.selection.length) return;
      const ids = this.selection.map(item => item.id); // 要求的格式是 Array[Number]
      this.$confirm("此操作将永久删除员工数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.getData();
        })
        .catch(() => {
          this.$message({
            type: "fail",
            message: "删除失败!"
          });
        });
    },
    add() {
      this.$router.push("/employee/add");
    },
    search() {
      this.getData();
    },
    getData() {
      axios.get("/user/list", { page: 1, pagesize: 5 }).then(res => {
        console.log(res);
        if (res.status == 200) {
          this.tableData = res.data;
          this.total = res.data.length;
        }
      });
    },
    selectChange(selection) {
      console.log(selection);
      this.selection = selection;
    },
    handleSizeChange(size) {
      this.pageSize = size;
      this.getData();
    },
    handleCurrentChange(page) {
      this.currentPage = page;
      this.getData();
    },
    handleChange(file, fileList) {
      this.fileTemp = file.raw;
      // 判断上传文件格式
      if (this.fileTemp) {
        if (
          this.fileTemp.type ==
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
          this.fileTemp.type == "application/vnd.ms-excel"
        ) {
          this.importfxx(this.fileTemp);
        } else {
          this.$message({
            type: "warning",
            message: "附件格式错误，请删除后重新上传！"
          });
        }
      } else {
        this.$message({
          type: "warning",
          message: "请上传附件！"
        });
      }
    },
    // 移除excel表
    handleRemove(file, fileList) {
      this.fileTemp = null;
    },
    importfxx(obj) {
      let _this = this;
      // 通过DOM取文件数据
      this.file = obj;
      var rABS = false; //是否将文件读取为二进制字符串
      var f = this.file;
      var reader = new FileReader();
      FileReader.prototype.readAsBinaryString = function(f) {
        var binary = "";
        var rABS = false; //是否将文件读取为二进制字符串
        var pt = this;
        var wb; //读取完成的数据
        var outdata;
        var reader = new FileReader();
        reader.onload = function(e) {
          var bytes = new Uint8Array(reader.result);
          var length = bytes.byteLength;
          for (var i = 0; i < length; i++) {
            binary += String.fromCharCode(bytes[i]);
          }
          var XLSX = require("xlsx");
          if (rABS) {
            wb = XLSX.read(btoa(fixdata(binary)), {
              //手动转化
              type: "base64"
            });
          } else {
            wb = XLSX.read(binary, {
              type: "binary"
            });
          }
          outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]); //outdata就是读取excel内容之后输出的东西
          console.log(outdata);
          this.da = [...outdata];
          let arr = [];
          this.da.map(v => {
            let obj = {};
            obj.id = v["编号"]; //ip是表的标题
            obj.name = v["名称"]; //
            obj.email = v["email"];
            obj.integer = v["年龄"];
            obj.ctitle = v["部门"];
            arr.push(obj);
          });
          //excel只用中文，要用每一个后端的字段给匹配
          console.log(arr); //这个就是组合成的数据
          // 把读取的excel表格中的内容放进tableData2中(这里要改成自己的表的名字)
          _this.tableData = arr;
        };
        reader.readAsArrayBuffer(f);
      };
      if (rABS) {
        reader.readAsArrayBuffer(f);
      } else {
        reader.readAsBinaryString(f);
      }
    }
  },
  created() {
    this.getData();
  }
};
</script>

<style>
</style>