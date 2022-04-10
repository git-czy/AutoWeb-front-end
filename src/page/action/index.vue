<template>

  <el-card shadow="always" class="main-card animate__fadeIn animate__animated">
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
        <!--        web项目配置-->
        <el-form :model="webConfig" label-position="right" label-width="80px" v-if="active===0">
          <el-form-item label="项目类型">
            <el-select v-model="webConfig.projectType" placeholder="请选择项目类型">
              <el-option label="Vue" value="vue"></el-option>
              <!--                  <el-option label="Java" value="java"></el-option>-->
            </el-select>
          </el-form-item>
          <el-form-item label="项目代码">
            <!--                        <el-upload-->
            <!--                            class="upload-demo"-->
            <!--                            drag-->
            <!--                            multiple-->
            <!--                        >-->
            <!--                          <el-icon class="el-icon&#45;&#45;upload">-->
            <!--                            <uploadFilled/>-->
            <!--                          </el-icon>-->
            <!--                          <div class="el-upload__text">-->
            <!--                            Drop file here or <em>click to upload</em>-->
            <!--                          </div>-->
            <!--                          <template #tip>-->
            <!--                            <div class="el-upload__tip">-->
            <!--                              jpg/png files with a size less than 500kb-->
            <!--                            </div>-->
            <!--                          </template>-->
            <!--                        </el-upload>-->

            <!--            <el-radio-group v-model="radio1" size="large">-->
            <!--              <el-radio-button label="从本地上传" @click="dialogVisible = true"/>-->
            <!--              <el-radio-button label="从git选择"/>-->
            <!--            </el-radio-group>-->

            <el-tabs type="border-card" class="border-card">
              <el-tab-pane label="从本地上传">
                <input ref="file" type="file" name="file" @change="handleFileChange" webkitdirectory/>
              </el-tab-pane>
              <el-tab-pane label="从Git选择">
                <el-table
                    ref="singleTableRef"
                    :data="tableData"
                    height="220"
                    style="width: 100%" max-height="250"
                    highlight-current-row
                    @current-change="handleCurrentChange"
                >
                  <el-table-column type="index"/>
                  <el-table-column v-if="false" prop="repo_name" label="Repo_name"/>
                  <el-table-column v-if="false" prop="branch" label="branch"/>
                  <el-table-column prop="repo_full_name" label="仓库名称"/>
                  <el-table-column prop="branches" label="分支">
                    <template #default="scope">
                      <el-select v-model="scope.row.branch" class="m-2" placeholder="Select"
                                 :disabled="scope.row.branches.length===1">
                        <el-option
                            v-for="item in scope.row.branches"
                            :key="item.value"
                            :label="item.value"
                            :value="item.value"
                        />
                      </el-select>
                    </template>
                  </el-table-column>
                  <el-table-column prop="repo_create_time" label="创建时间"/>
                  <el-table-column prop="repo_update_time" label="更新时间"/>
                </el-table>
              </el-tab-pane>
            </el-tabs>

          </el-form-item>
        </el-form>

        <!--        服务器连接配置-->
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

        <!--        额外选项-->
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
        <p v-if="active===3">正在部署中....</p>
        <el-result
            icon="success"
            title="部署成功"
            sub-title="电机按钮前往你的网站看看吧"
            v-if="active===4"
        >
          <template #extra>
            <el-button type="primary">前往我的网站</el-button>
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


</template>

<script setup>

import {reactive, ref, watch} from 'vue';
import {ArrowDown} from "@element-plus/icons-vue";
import axios from "axios";

const currentRow = ref()


const active = ref(0)
const showPre = ref(false)
const showNext = ref(true)
const showSubmit = ref(false)
const singleTableRef = ref(null)
const file = ref(null)

const webConfig = reactive({
  projectType: ''
})
const webConnect = reactive({
  user: '',
  password: '',
  port: ''
})
const webExtra = reactive({
  ssl: false
})


watch(active, (active, prevActive) => {
  if (active !== 4) {
    showNext.value = active !== 2;
    showPre.value = active !== 0;
  } else {
    showNext.value = false
    showPre.value = false
  }
  showSubmit.value = active === 2;
})

const next = () => {
  if (active.value < 3) active.value++
}

const pre = () => {
  if (active.value > 0) active.value--
}

const submit = () => {
  active.value = 4
  showSubmit.value = false
}

const tableData = [
  {
    repo_name: 'Linux',
    repo_full_name: 'Linux',
    branches: [
      {
        value: "master"
      },
    ],
    repo_create_time: '2021/6/1',
    repo_update_time: '2022/2/3',
    branch: 'master'
  },
  {
    repo_name: 'Python',
    repo_full_name: 'Python',
    branches: [{
      value: "cz"
    },
      {
        value: "zxc"
      }],
    repo_create_time: '2021/6/1',
    repo_update_time: '2022/2/3',
    branch: 'cz'

  }
]

const handleCurrentChange = (currentRow, _) => {
  console.log(currentRow["repo_name"])
}

const handleFileChange = () => {
  let files = file.value.files
  let formData = new FormData();
  for (const file of files) {
    Object.defineProperty(file, 'name', {
      writable: true,//设置属性为可写
    })
    file.name = file.webkitRelativePath
    formData.append("project_files", file)
  }
  axios.post("http://106.55.18.128:8001/v1/deploy/upload/project?project_name=123", formData, {
    headers: {
      'Content-Type': "multipart/form-data"
    }
  }).then(
      (response) => {
        console.log("Response Success!", response.data);
      },
      (error) => {
        console.log("Response Failed!", error.message);
      }
  );
}


</script>
<style scoped lang="scss">
.el-container {
  min-height: 100vh;
}

.main-card {
  width: 100%;
  margin-top: 20px;

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

.border-card {
  width: 96%;
  height: 280px;
}

//input[type="file"]{
//  display: none;
//}
//.file_tip{
//  color: #BCBCBC;
//  font-weight: 400;
//  font-size: 16px;
//}
//.file_tip.active{
//  display: inline-block;
//}
//.file{
//  display: inline-block;
//  overflow: hidden;
//  width: 320px;
//}
//.file_bt{
//  display: inline-block;
//  color: #0099FF;
//  font-size: 14px;
//  font-weight: 400;
//  border: 1px solid #0099FF;
//  padding: 0px 39px;
//  letter-spacing: 2px;
//  line-height: normal;
//  border-radius: 3px;
//}
//.file p {
//  display: none;
//  overflow: hidden;
//  background-color: rgb(242,242,242);
//  padding: 0 8px;
//  line-height: 25px;
//  border-radius: 1px;
//}
//.file p span:first-child{
//  float: left;
//}
//.file p span:last-child{
//  float: right;
//}

</style>
