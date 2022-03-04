<template>
  <el-container>
    <el-header>
      <el-row>
        <el-col :span="22">
          <el-menu
              :default-active="active"
              class="el-menu-demo"
              mode="horizontal"
              router
              ref="menu"
          >
            <el-menu-item index="home">首页</el-menu-item>
            <el-menu-item index="action">部署</el-menu-item>
            <el-menu-item index="about">使用文档</el-menu-item>
          </el-menu>
        </el-col>
        <el-col :span="2" class="user-part">
          <div class="user">
            <el-avatar size="default" :icon="UserFilled"></el-avatar>
            <el-button type="text" @click="login">登录</el-button>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-main class="main">
      <router-view></router-view>
    </el-main>
    <el-footer>
      <slot name="footer"></slot>
    </el-footer>
  </el-container>
</template>

<script setup>
import {UserFilled} from "@element-plus/icons-vue";
import {useRoute} from "vue-router";
import {watch,ref} from "vue";

const route = useRoute()
let active = ref('home')

watch(() => route.path, (currentRoute, prevRoute) => {
  active.value = currentRoute.replace('/', '')
})


function login() {
  window.open("https://github.com/login/oauth/authorize?scope=user:email repo:read&client_id=e719c4943b29aebeb7a8")

}
</script>

<style lang="scss">
.main {
  display: flex;
  justify-content: center;
}


.user-part {
  border-bottom: 1px solid #e6e6e6;

  .el-button {
    margin-left: 20px;
  }

  .user {
    display: inherit;
    right: 0;
    position: absolute;
    justify-items: center;
    align-items: center;
  }

  display: flex;
  justify-items: center;
  align-items: center;

}
</style>

