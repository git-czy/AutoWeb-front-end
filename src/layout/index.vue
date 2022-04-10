<template>
  <div class="index">
  <el-container>
    <el-header  class="header-parent-class">
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
            <el-avatar size="default" v-if="git_user_avatar!==''" :src="git_user_avatar"></el-avatar>
            <el-avatar size="default" v-else icon="UserFilled"></el-avatar>
            <p v-if="git_user_name!==''">{{ git_user_name }}</p>
            <el-button type="text" @click="login" style="color: #f6f6f6">登录</el-button>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-main class="main-parent-class">
      <router-view></router-view>
    </el-main>
    <el-footer class="footer-div">
      <!--      <slot name="footer">-->
      <!--      </slot>-->
      Copyright © 2022 male. All rights reserved.
    </el-footer>
  </el-container>
  </div>
</template>

<script setup>
import {UserFilled} from "@element-plus/icons-vue";
import {useRoute} from "vue-router";
import {watch, ref} from "vue";

const route = useRoute()
const active = ref('home')

let git_user_name = ""
let git_user_avatar = ""

watch(() => route.path, (currentRoute, prevRoute) => {
  active.value = currentRoute.replace('/', '')
})

// 获取git授权重定向服务器发回的用户信息
const userinfo = route.query
if (userinfo != null) {
  if (userinfo.hasOwnProperty("git_user_avatar")) {
    git_user_avatar = userinfo["git_user_avatar"]
    console.log(git_user_avatar)
  }
  if (userinfo.hasOwnProperty("git_user_name")) {

    git_user_name = userinfo["git_user_name"]
  }
}


function login() {
  window.open("https://github.com/login/oauth/authorize?scope=user:email%20repo&client_id=e081f5e09ec890a6abcf")

}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}

.el-container {
  min-height: 100vh;
}

.main-parent-class {
  display: flex;
  justify-content: center;
  padding-bottom: 30px;
  height: 100%;
  overflow: hidden
}

.el-header, .el-footer {
  background-color: #545c64;
  color: #f6f6f6;
  text-align: center;
  line-height: 60px;
}

.el-footer{
  margin-bottom: 0;
  width: 100%;
  align-items: center;

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

