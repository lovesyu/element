<template>
  <section class="home-content" :class="{'content-collapse': collapse}">
    <h3>{{ title }}</h3>
    <div class="content">
      <router-view />
    </div>
    <footer></footer>
  </section>
</template>

<script>
export default {
  computed: {
    collapse() {
      return this.$store.state.collapse;
    },
    title() {
      return this.$route.meta.name;
    }
  },
};
</script>

<style lang="less" scoped>
.home-content {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 70px;
  left: 250px;
  bottom: 0;
  right: 0;
  transition: left 0.4s;
  h3 {
    font-size: 24px;
    padding: 10px 10px 10px 20px;
  }
  .content {
    flex: 1;
    overflow-y: auto;
    padding: 10px 10px 10px 20px;
    font-size: 18px;
  }
  footer {
    width: 100%;
    height: 50px;
    background-color: skyblue;
  }
}
.content-collapse {
  left: 64px;
}
</style>