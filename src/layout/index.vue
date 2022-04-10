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
              background-color="#545c64"
              text-color="#fff"
          >
            <el-menu-item index="home">首页</el-menu-item>
            <el-menu-item index="action">部署</el-menu-item>
            <el-menu-item index="about">使用文档</el-menu-item>
          </el-menu>
        </el-col>
        <el-col :span="2" class="user-part">
          <div class="user">
            <el-avatar size="default" :icon="UserFilled"></el-avatar>
            <el-button type="text" @click="login" style="color: #f6f6f6">登录</el-button>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-main class="main">
      <router-view></router-view>
    </el-main>
    <el-footer>
      <!--      <slot name="footer">-->
      <!--      </slot>-->
      Copyright © 2022 male. All rights reserved.
    </el-footer>
  </el-container>
</template>

<script setup>
import {UserFilled} from "@element-plus/icons-vue";
import {useRoute} from "vue-router";
import {ref, watch} from "vue";
// import{} from ""

const route = useRoute()
let active = ref('home')

watch(() => route.path, (currentRoute, prevRoute) => {
  active.value = currentRoute.replace('/', '')
})


function login() {
  window.open("https://github.com/login/oauth/authorize?scope=user:email%20repo&client_id=e081f5e09ec890a6abcf")

}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}

.main {
  display: flex;
  justify-content: center;
  padding-bottom: 30px;
}

.el-header, .el-footer {
  background-color: #545c64;
  color: #f6f6f6;
  text-align: center;
  line-height: 60px;
}

.el-footer{
  margin-bottom: 0;
}

.user-part {
  border-bottom: 1px solid #e6e6e6;
  background-color: #545c64;

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

