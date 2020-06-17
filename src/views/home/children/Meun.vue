<template>
  <el-menu
    :default-active="activeRouter"
    :unique-opened="true"
    :collapse="collapse"
    :router="true"
    class="home-menu"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <el-submenu :index="index+''" v-for="(item, index) in menuConfig" :key="index">
      <template slot="title">
        <i :class="item.icon"></i>
        <span>{{ item. title }}</span>
      </template>
      <el-menu-item
        :index="submenu.index"
        v-for="(submenu, index) in item.subs"
        :key="index"
      >{{ submenu.title }}</el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
import {menuConfig} from '@/config/menuConfig'
export default {
  data() {
    return {
      menuConfig
    };
  },
  computed: {
    activeRouter() {
      return this.$route.meta.index;
    },
    collapse() {
      return this.$store.state.collapse;
    }
  },
  created() {
  }
};
</script>

<style lang="less" scoped>
.home-menu {
  position: absolute;
  top: 70px;
  left: 0;
  bottom: 0;
  overflow-y: auto;
}
.home-menu::-webkit-scrollbar {
  width: 0;
}
.home-menu:not(.el-menu--collapse) {
  width: 250px;
}
</style>