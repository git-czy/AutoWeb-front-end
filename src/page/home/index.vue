<template>
  <el-container>
    <el-header height="100px"></el-header>
    <el-main class="main">
      <el-card shadow="always" class="main-card">
        <!--步骤条-->
        <el-row justify="center">
          <el-steps :active="active" finish-status="success" align-center>
            <el-step title="Web项目配置"></el-step>
            <el-step title="服务器连接配置"></el-step>
            <el-step title="额外选项"></el-step>
            <el-step title="完成"></el-step>
          </el-steps>
        </el-row>
        <!--编辑内容-->
        <el-row justify="center">
          <el-card class="body-card">
            <el-form :model="webConfig" label-position="right" label-width="80px" v-if="active===0">
              <el-form-item label="项目类型">
                <el-select v-model="webConfig.projectType" placeholder="请选择项目类型">
                  <el-option label="Python" value="python"></el-option>
                  <!--                  <el-option label="Java" value="java"></el-option>-->
                </el-select>
              </el-form-item>
              <el-form-item label="项目代码">
                <el-upload
                    class="upload-demo"
                    drag
                    action="https://jsonplaceholder.typicode.com/posts/"
                    multiple
                >
                  <el-icon class="el-icon--upload">
                    <upload-filled/>
                  </el-icon>
                  <div class="el-upload__text">
                    Drop file here or <em>click to upload</em>
                  </div>
                  <template #tip>
                    <div class="el-upload__tip">
                      jpg/png files with a size less than 500kb
                    </div>
                  </template>
                </el-upload>
              </el-form-item>
            </el-form>
            <el-form :model="webConnect" label-position="right" label-width="80px" v-if="active===1">
              <el-form-item label="用户名">
                <el-input placeholder="请输入ssh连接用户名" v-model="webConnect.user"></el-input>
              </el-form-item>
              <el-form-item label="密码">
                <el-input placeholder="请输入ssh连接密码" v-model="webConnect.password"></el-input>
              </el-form-item>
              <el-form-item label="端口">
                <el-input placeholder="请输入ssh连接端口" v-model="webConnect.port"></el-input>
              </el-form-item>
            </el-form>
            <el-form :model="webExtra" label-position="right" label-width="80px" v-if="active===2">
              <el-form-item label="开启ssl" prop="delivery">
                <el-switch v-model="webExtra.ssl"></el-switch>
              </el-form-item>
              <template v-if="webExtra.ssl">
                <el-form-item label="网站域名">
                  <el-input placeholder="请输入需要配置ssl的域名" v-model="webExtra.domain"></el-input>
                </el-form-item>

                <el-form-item label="ssl证书pem文件">
                  <el-upload
                      class="upload-demo"
                      :limit="1"
                      accept=".pem"
                  >
                    <el-button type="primary">点击上传</el-button>
                    <template #tip>
                      <div class="el-upload__tip">
                        jpg/png files with a size less than 500kb
                      </div>
                    </template>
                  </el-upload>
                </el-form-item>
                <el-form-item label="ssl证书Key文件">
                  <el-upload
                      class="upload-demo"
                      :limit="1"
                  >
                    <el-button type="primary">点击上传</el-button>
                    <template #tip>
                      <div class="el-upload__tip">
                        jpg/png files with a size less than 500kb
                      </div>
                    </template>
                  </el-upload>
                </el-form-item>
              </template>

            </el-form>
            <p>正在部署中....</p>
            <el-result
                icon="success"
                title="部署成功"
                sub-title="电机按钮前往你的网站看看吧"
                v-if="active===4"
            >
              <template #extra>
                <el-button type="primary" >前往我的网站</el-button>
              </template>
            </el-result>
          </el-card>
        </el-row>
        <!--确认按钮-->
        <el-row justify="center">
          <el-button v-if="showPre" @click="pre">上一步</el-button>
          <el-button v-if="showNext" @click="next">下一步</el-button>
          <el-button v-if="showSubmit" type="primary" @click="submit">确认</el-button>
          <div style="height: 44px;line-height:44px" v-if="active===4"></div>
        </el-row>
      </el-card>

    </el-main>

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
      showSubmit: false,
      webConfig: {
        projectType: ""
      },
      webConnect: {
        user: '',
        password: '',
        port: '',
      },
      webExtra: {
        ssl: false
      },
    }
  },
  watch: {
    active(n, o) {
      if (n !== 4) {
        this.showNext = n !== 3;
        this.showPre = n !== 0;
      } else {
        this.showNext = false
        this.showPre = false
      }
      if (n === 3) this.showSubmit = true
    }
  },
  methods: {
    next() {
      if (this.active < 3) this.active++
    },
    pre() {
      if (this.active > 0) this.active--
    },
    submit() {
      this.active = 4
      this.showSubmit = false
    }

  }
}
</script>

<style scoped lang="scss">

.full-width {
  width: 100%;
}

.main {
  display: flex;
  justify-content: center;
}

.main-card {
  width: 70%;
  padding-top: 20px;

  .el-input {
    width: 70%;
  }

  .el-steps {
    width: 70%;
  }

  .el-button {
    margin-top: 12px
  }
}

.body-card {
  width: 55%;
  height: 400px;
  padding-top: 20px;
  margin-top: 20px;
}


.step-button {
  margin-top: 12px
}
</style>
