<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import store from './store'
import { SET_USER_INFO } from '@/store/auth.store'
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  data() {
    return {
      title:""
    }
  },
  components: {
    HelloWorld
  },
  created() {
    console.log(store)
    console.log(this.setUserInfo)
    this.setUserInfo({
      'loginName': 'admin',
      'id': '100240490750582718464',
      'phone': '17729389320',
      'email': '17728389320@163.com',
      'userName': '赵站洋',
    })
  },
  methods: {
    ...mapMutations('authModule', {
      setUserInfo: SET_USER_INFO
    })
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
