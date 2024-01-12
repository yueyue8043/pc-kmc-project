<template>
  <div class="layout">
    <div class="layout-center">
      <div class="menu">
        <MenuList :isCollapse="isCollapse" />
      </div>
      <div class="content">
        <Content @openMenu="openMenu" :isCollapse="isCollapse" />
      </div>
    </div>
  </div>
</template>

<script>
import MenuList from "./Menu/index.vue";
import Content from "./Content/index.vue";
export default {
  components: {
    MenuList,
    Content,
  },
  data() {
    return {
      isCollapse: false,
    };
  },
  methods: {
    openMenu() {
      this.isCollapse = !this.isCollapse;
    },
  },
};
</script>

<style lang="less" scoped>
.layout {
  width: 100%;
  height: 100%;
}
.layout-center {
  position: relative;
  display: flex;
  width: 100%;
  .menu {
    height: 100vh;
    // background: #545c64;
    border-right: 1px solid #e6e6e6;
  }
  .content {
    width: 100%;
  }
}
</style>