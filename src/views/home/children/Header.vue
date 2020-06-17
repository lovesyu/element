<template>
  <section class="home-header">
    <h3>懒洋洋</h3>
    <i class="el-icon-menu" @click="collapseFn"></i>
    <span>User</span>
  </section>
</template>

<script>
import { CHANGECOLLAPSE } from "@/store/mutations-type";
export default {
  methods: {
    collapseFn() {
      this.$store.commit(CHANGECOLLAPSE);
    }
  }
};
</script>
  
<style lang="less" scoped>
.home-header {
  height: 70px;
  line-height: 70px;
  background-color: #409eff;
  color: #fff;
  padding: 0 20px 0 30px;
  h3 {
    display: inline-block;
    font-size: 24px;
    margin-right: 30px;
    letter-spacing: 2px;
  }
  span {
    font-size: 20px;
    float: right;
  }
}
</style>