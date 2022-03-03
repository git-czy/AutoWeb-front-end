<template>

  <el-row>
    <el-col :span="22">
      <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
      >
        <el-menu-item index="1">Processing Center</el-menu-item>
        <el-sub-menu index="2">
          <template #title>Workspace</template>
          <el-menu-item index="2-1">item one</el-menu-item>
          <el-menu-item index="2-2">item two</el-menu-item>
          <el-menu-item index="2-3">item three</el-menu-item>
          <el-sub-menu index="2-4">
            <template #title>item four</template>
            <el-menu-item index="2-4-1">item one</el-menu-item>
            <el-menu-item index="2-4-2">item two</el-menu-item>
            <el-menu-item index="2-4-3">item three</el-menu-item>
          </el-sub-menu>
        </el-sub-menu>
        <el-menu-item index="3" disabled>Info</el-menu-item>
        <el-menu-item index="4">Orders</el-menu-item>
      </el-menu>
    </el-col>
    <el-col :span="2" class="user-part">
      <div class="user">
        <el-avatar size="default" :icon="UserFilled"></el-avatar>
        <el-button type="text">登录</el-button>
      </div>
    </el-col>
  </el-row>

</template>

<script lang="ts" setup>
import {ref} from 'vue'
import {UserFilled} from "@element-plus/icons-vue";

const activeIndex = ref('1')
const activeIndex2 = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<style lang="scss">
.user-part {

  .el-button {
    margin-left: 20px;
  }

  .user {
    display: inherit;
    right: 0;
    position: absolute;
    justify-items: center;
    align-items: center;
    border-bottom: solid 1px var(--el-menu-border-color);
  }

  display: flex;
  justify-items: center;
  align-items: center;

}
</style>
