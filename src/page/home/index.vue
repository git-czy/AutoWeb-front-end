<template>

  <div class="main">

    <el-row class="animate__bounce animate__animated block logo">
      AutoWeb
    </el-row>

    <el-row justify="space-around" class="block action">
      <el-col :span="7" class="part" @click="redirectAction">
        <el-row class="center">
          <el-col :span="4">
            <i class="fa fa-play-circle-o"/>
          </el-col>
          <el-col :span="16">
            开 始
          </el-col>
        </el-row>
      </el-col>

      <el-col :span="7" class="part" @click="redirectAbout">
        <el-row class="center">
          <el-col :span="4">
            <i class="fa fa-eye"/>
          </el-col>
          <el-col :span="16">
            查看文档
          </el-col>
        </el-row>
      </el-col>

      <el-col :span="7" class="part" style="background-color: #f6f6f6;">
        <el-row class="center">
          <el-col :span="4">
            <i class="fa fa-github"/>
          </el-col>
          <el-col :span="16">
            GitHub
          </el-col>
        </el-row>
      </el-col>

    </el-row>

    <el-row class="block">
      一个简单快速易用的WEB应用自动部署平台
    </el-row>

    <el-row class="background-pic">
      <el-col :span="4">
        <img src="../../assets/filters-zero.svg" alt="background">
      </el-col>
    </el-row>
  </div>


</template>

<script setup>

import router from "../../router";


function redirectAction() {
  router.push({path: '/action'})
}

function redirectAbout() {
  router.push({path: '/about'})
}

</script>

<style lang="scss" scoped>
.main {
  display: inherit;
  flex-direction: column;
  align-content: center;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
}

.block {
  margin-top: 20px;
  margin-bottom: 20px;
}

.background-pic {
  margin-top: 20px;
  margin-right: 450px;
}

//调整图片大小
::v-deep img {
  width: 1400%;
}

.center {
  display: flex;
  text-align: center;
  justify-content: center;
  justify-items: center;
  align-items: center;
  align-content: center;
}

.inline-block {
  display: inline;
  text-align: center;
}

.description {
  margin-top: 20px;
  margin-bottom: 20px;
}

.action {
  width: 500px;
  line-height: 45px;

  .part {
    cursor: pointer;
    border-radius: 20px;
    border: 1px solid var(--el-border-color-base);
    font-size: 20px;
  }

}

.logo {
  margin-top: 20px;
  height: auto;
  width: auto;
  line-height: 80px;
  font-size: 50px;
  text-align: center;
  letter-spacing: 20px;
}
</style>
