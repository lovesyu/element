<template>
  <div class="home-container">
    <Header></Header>
    <Content></Content>
    <Menu></Menu>
  </div>
</template>

<script>
import Menu from "./children/Meun";
import Content from "./children/Content";
import Header from "./children/Header";
export default {
  components: {
    Header,
    Menu,
    Content
  }
};
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
  position: relative;
}
</style>