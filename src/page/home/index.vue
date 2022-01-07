<template>
  <el-container>
    <el-header height="20px">Header</el-header>
    <el-main>
      <el-card shadow="always" class="main-card">
        <!--步骤条-->
        <el-row justify="center">
          <el-steps :active="active" finish-status="success" align-center>
            <el-step title="Step 1"></el-step>
            <el-step title="Step 2"></el-step>
            <el-step title="Step 3"></el-step>
          </el-steps>
        </el-row>
        <!--编辑内容-->
        <el-row justify="center">
          <el-card class="body-card">

          </el-card>
        </el-row>
        <!--确认按钮-->
        <el-row justify="center">
          <el-button v-if="showPre" style="margin-top: 12px" @click="pre">上一步</el-button>
          <el-button v-if="showNext" style="margin-top: 12px" @click="next">下一步</el-button>
          <el-button v-if="!showNext" type="primary" style="margin-top: 12px">确认</el-button>
        </el-row>
      </el-card>

    </el-main>
    <el-footer>Footer</el-footer>
  </el-container>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      active: 0,
      showPre: false,
      showNext: true,
    }
  },
  watch: {
    active(n, o) {
      this.showNext = n !== 2;
      this.showPre = n !== 0;
    }
  },
  methods: {
    next() {
      if (this.active < 2) this.active++

    },
    pre() {
      if (this.active > 0) this.active--

    }
  }
}
</script>

<style scoped lang="scss">

.full-width {
  width: 100%;
}

.main-card {
  .el-steps {
    width: 70%;
  }
}

.body-card {
  width: 55%;
  height: 400px;
}

</style>
