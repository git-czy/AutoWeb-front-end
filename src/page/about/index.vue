<template>
  <!--  <h5>this is about</h5>-->
  <!--  <el-card style="width: 100%; height: 600px">-->
  <!--    -->
  <!--  <el-empty description="Empty"></el-empty>-->
  <!--  </el-card>-->
  <input ref="file" class="fileUploaderClass" type="file" name="file" webkitdirectory/>
</template>

<script lang="ts" setup>

import {ref} from "vue";

const file =ref(null)

const changesData = () => {
  console.dir(file.value.files)
}

</script>

<style scoped>

</style>
