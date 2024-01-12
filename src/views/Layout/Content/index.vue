<template>
  <div class="content-page">
    <div class="content-head">
      <div
        class="content-head-icon"
        :class="isCollapse ? 'el-icon-caret-right' : 'el-icon-caret-left'"
        @click="open"
      ></div>
      <div class="content-head-user" @click="logOut">退出登录</div>
    </div>

   <div class="page-content">
    <router-view></router-view>
   </div>
  </div>
</template>

<script>
export default {
  props:['isCollapse'],
  data() {
    return {
 
    };
  },
  methods: {
    open() {
     this.$emit('openMenu')
    },
    logOut() {
      this.$store.commit('user/removeToken')
      this.$router.push('/login')
    }
  },
};
</script>

<style lang="less" scoped>
.content-page {
  width: 100%;
  .content-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 50px 0px 10px;
    height: 50px;
    cursor: default;
    background: #eceff7;

    .content-head-icon {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 30px;
      height: 30px;
      cursor: pointer;
    }
  }

  .page-content{
    padding: 20px 40px;
  }
}
</style>