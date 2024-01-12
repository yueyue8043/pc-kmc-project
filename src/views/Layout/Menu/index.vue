<template>
  <div class="menu-page">
    <div class="menu-header">
      <!-- <img src="../../../assets//kmc_logo.png" alt=""> -->
    </div>
    <el-menu class="el-menu-vertical-demo" router :collapse="isCollapse">
      <el-menu-item index="/" >
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span slot="title">首页</span>
        </template>
      </el-menu-item>

      <el-submenu index="/warehouse" v-if="this.$store.getters.limits >= 1">
        <template slot="title">
          <i class="el-icon-house"></i>
          <span slot="title">仓库管理 </span>
        </template>
        <el-menu-item-group title="出库">
          <el-menu-item index="/deliver">送货</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="/attendance"  v-if="this.$store.getters.limits >= 4">
        <template slot="title">
          <i class="el-icon-date"></i>
          <span slot="title">考勤</span>
        </template>
        <el-menu-item index="/salary">薪资</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import store from '@/store';

export default {
  props: ["isCollapse"],
  data() {
    return {
      data: {},
    };
  },
};
</script>

<style lang="less" scoped>
.menu-header {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  cursor: default;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  // min-height: 400px;
  height: 100%;
  border: none;
}
</style>