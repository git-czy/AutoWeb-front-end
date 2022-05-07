<template>

  <el-card shadow="always" class="main-card animate__fadeIn animate__animated">
    <!--步骤条-->
    <el-row justify="center">
      <el-steps :active="active" finish-status="success" align-center>
        <el-step title="Web项目配置"></el-step>
        <el-step title="服务器连接配置"></el-step>
        <el-step title="额外选项"></el-step>
        <el-step title="部署"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
    </el-row>
    <!--编辑内容-->
    <el-row justify="center">
      <el-card class="body-card">
        <!--        web项目配置-->
        <el-form ref="webConfigRef" :rules="webConfigRules" :model="webConfig" label-position="right" label-width="80px"
                 v-if="active===0">
          <el-form-item label="项目类型" prop="projectType">
            <el-select v-model="webConfig.deploy_type" placeholder="请选择项目类型">
              <el-option label="Vue" value="Vue"></el-option>
              <!--                  <el-option label="Java" value="java"></el-option>-->
            </el-select>
          </el-form-item>
          <el-form-item label="项目代码" prop="projectName">
            <el-tabs type="border-card" class="border-card" v-model="tabActiveName">
              <el-tab-pane label="从本地上传" name="local">
                <input ref="file" type="file" name="file" @change="handleFileChange" webkitdirectory/>
              </el-tab-pane>
              <el-tab-pane label="从Git选择" name="git">
                <el-table
                    ref="singleTableRef"
                    :data="tableData"
                    height="220"
                    style="width: 100%" max-height="250"
                    highlight-current-row
                    empty-text="请先登陆！"
                    @current-change="handleCurrentChange"
                >
                  <el-table-column type="index"/>
                  <el-table-column v-if="false" prop="repo_name" label="Repo_name"/>
                  <el-table-column v-if="false" prop="branch" label="branch"/>
                  <el-table-column prop="repo_full_name" label="仓库名称"/>
                  <el-table-column prop="repo_branches" label="分支">
                    <template #default="scope">
                      <el-select v-model="scope.row.branch" class="m-2" placeholder="Select"
                                 :disabled="scope.row.repo_branches.length===1">
                        <el-option
                            v-for="item in scope.row.repo_branches"
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
        <el-form ref="webConnectRef" :rules="webConnectRules" :model="webConnect" label-position="right"
                 label-width="80px" v-if="active===1">
          <el-form-item label="用户名" prop="host_username">
            <el-input placeholder="请输入ssh连接用户名" v-model="webConnect.host_username" clearable maxlength="10"
                      show-word-limit/>
          </el-form-item>
          <el-form-item label="密码" prop="host_password">
            <el-input placeholder="请输入ssh连接密码" v-model="webConnect.host_password" type="password" show-password
                      clearable maxlength="20"/>
          </el-form-item>
          <el-form-item label="主机" prop="host_ip">
            <el-input placeholder="请输入ssh连接主机地址" v-model="webConnect.host_ip" clearable maxlength="15"/>
          </el-form-item>
          <el-form-item label="端口" prop="host_port">
            <el-input placeholder="请输入ssh连接主机端口" v-model="webConnect.host_port" clearable maxlength="4"/>
          </el-form-item>
        </el-form>

        <!--        额外选项-->
        <el-form ref="webExtraRef" :rules="webExtraRules" :model="webExtra" label-position="right" label-width="80px"
                 v-if="active===2">
          <el-form-item label="开启ssl" prop="enableHttps">
            <el-switch v-model="webExtra.ssl"></el-switch>
          </el-form-item>
          <template v-if="webExtra.ssl">
            <el-form-item label="网站域名" prop="domain">
              <el-input placeholder="请输入需要配置ssl的域名" v-model="webExtra.domain"></el-input>
            </el-form-item>

            <el-form-item label="ssl证书pem文件" prop="pem">
              <el-upload
                  class="upload-demo"
                  :limit="1"
                  accept=".pem"
                  :before-upload="beforeSslPemUpload"
                  action=""
              >
                <el-button type="primary">点击上传</el-button>
                <template #tip>
                  <div class="el-upload__tip">
                    pem files with a size less than 1MB
                  </div>
                </template>
              </el-upload>
            </el-form-item>
            <el-form-item label="ssl证书Key文件" prop="key">
              <el-upload
                  class="upload-demo"
                  :before-upload="beforeSslKeyUpload"
                  :limit="1"
                  accept=".key"
                  action=""
              >
                <el-button type="primary">点击上传</el-button>
                <template #tip>
                  <div class="el-upload__tip">
                    key files with a size less than 1MB
                  </div>
                </template>
              </el-upload>
            </el-form-item>
          </template>

        </el-form>
        <!--        <p v-if="active===3" v-loading="loading">正在部署中....</p>-->
        <div v-if="active===3" v-loading="true" element-loading-text="正在部署...."
             :element-loading-spinner="svg"
             element-loading-svg-view-box="-10, -10, 50, 50"
             element-loading-background="rgba(122, 122, 122, 0.8)"
             style="position: relative;top:0;bottom:0;left:0;right:0"
        />
        <el-result
            icon="success"
            title="部署成功"
            sub-title="点击按钮前往你的网站看看吧"
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
      <el-button v-if="showNext && active===0" @click="next(active,webConfigRef)">下一步</el-button>
      <el-button v-if="showNext && active===1" @click="next(active,webConnectRef)">下一步</el-button>
      <el-button v-if="showSubmit" type="primary" @click="submit(webExtraRef)">确认</el-button>
      <div style="height: 44px;line-height:44px" v-if="active===4"></div>
    </el-row>
  </el-card>


</template>

<script setup>

import {reactive, ref, watch} from 'vue';
import {GET_REPOS, UPLOAD_CONFIG, UPLOAD_PROJECT, UPLOAD_SSL} from "../../api";
import {ElMessage} from 'element-plus'

const currentRow = ref()

const active = ref(0)
const showPre = ref(false)
const showNext = ref(true)
const showSubmit = ref(false)
const singleTableRef = ref(null)
const file = ref(null)

const webConfig = reactive({
  deploy_type: '',
  project_name: '',
  git_repo_name: ''
})
const webConnect = reactive({
  host_username: 'root',
  host_password: '',
  host_ip: '',
  host_port: '22'
})
const webExtra = reactive({
  ssl: false,
  domain: '',
  pem: null,
  key: null
})


// webConfig表单验证
const webConfigRef = ref(null)
// 验证项目类型
const validateProjectType = (rules, value, callback) => {
  if (webConfig.deploy_type === '') {
    return callback(new Error('请选择项目类型'))
  } else {
    return callback()
  }
}
// 验证项目是否上传
const validateProjectName = (rules, value, callback) => {
  console.log(value)

  if (webConfig.project_name === '' && webConfig.git_repo_name === '') {
    callback(new Error("请从本地上传或者从Github仓库选择您的项目"))
  } else {
    callback()
  }
}
// webConfig表单验证规则
const webConfigRules = reactive({
  projectType: [{required: true, validator: validateProjectType, trigger: 'change'}],
  projectName: [{required: true, validator: validateProjectName, trigger: 'change'}]
})


// webConnect表单验证
const webConnectRef = ref(null)

// webConnect表单验证
const webConnectRules = reactive({
  host_username: [{required: true, message: '请输入ssh连接用户名', trigger: 'blur'}],
  host_password: [{required: true, message: '请输入ssh连接密码', trigger: 'blur'}],
  host_ip: [{required: true, message: '请输入ssh连接主机地址', trigger: 'blur'}],
  host_port: [{required: true, message: '请输入ssh连接主机端口', trigger: 'blur'}],
})


// webExtra表单验证
const webExtraRef = ref(null)

const validateSslDomain = (rules, value, callback) => {
  if (webExtra.ssl) {
    if (webExtra.domain === '') {
      callback(new Error('请输入域名'))
    }
    callback()
  }
}
const validateSslPem = (rules, value, callback) => {
  if (webExtra.ssl) {
    if (webExtra.pem === null) {
      callback(new Error('请上传证书pem文件'))
    }
    callback()
  }
}
const validateSslKey = (rules, value, callback) => {
  if (webExtra.ssl) {
    if (webExtra.key === null) {
      callback(new Error('请上传证书key文件'))
    }
    callback()
  }
}

// webConnect表单验证
const webExtraRules = reactive({
  domain: [{required: true, validator: validateSslDomain, trigger: 'blur'}],
  pem: [{required: true, validator: validateSslPem, trigger: 'change'}],
  key: [{required: true, validator: validateSslKey, trigger: 'change'}],
})


// 监听active，控制上一步下一步按钮的显示
watch(active, (active, prevActive) => {
  if (active !== 3) {
    showNext.value = active !== 2;
    showPre.value = active !== 0;
  } else {
    showNext.value = false
    showPre.value = false
  }
  showSubmit.value = active === 2;
})


const next = (activeNum, elForm) => {
  console.log(activeNum)
  if (elForm) {
    elForm.validate((valid) => {
      console.log(valid)
      if (valid) {
        active.value++
      }
    })
  } else {
    active.value++
  }
}

const pre = () => {
  if (active.value > 0) active.value--
}


// git 表格数据
let tableData = reactive([])


const tabActiveName = ref('local')
watch(tabActiveName, async (tabName, prevActive) => {
  console.log(tabName)
  if (tabName === 'git' && tableData.length === 0) {
    let res = await GET_REPOS()
    tableData.push(...res)
    console.log(tableData)
  }
})

// 获取git表格选择事件
const handleCurrentChange = (currentRow, _) => {
  console.log(currentRow["repo_name"])
  if (currentRow["repo_name"]) {
    webConfig.git_repo_name = currentRow["repo_name"]
  }
}
let projectFormData = new FormData();
// 本地上传文件
const handleFileChange = () => {
  let files = file.value.files

  webConfig.project_name = files[0].webkitRelativePath.split('/')[0]
  console.log(webConfig.project_name)
  for (const file of files) {
    Object.defineProperty(file, 'name', {
      writable: true,//设置属性为可写
    })
    file.name = file.webkitRelativePath
    projectFormData.append("project_files", file)
  }
  console.log(projectFormData)
  // UPLOAD_PROJECT(projectName, formData)
}


const beforeSslPemUpload = (rawFile) => {
  if (rawFile.size > 1024 * 1024) {
    ElMessage.error('Pem file size can not exceed 1MB!')
    return false
  }
  webExtra.pem = rawFile
  return false
}

const beforeSslKeyUpload = (rawFile) => {
  if (rawFile.size > 1024 * 1024) {
    ElMessage.error('Key file size can not exceed 1MB!')
    return false
  }
  webExtra.key = rawFile
  return false
}


const submit = (elForm) => {
  elForm.validate(async (valid) => {
    if (valid) {
      let flag = await uploadDeployConfig()
      if (flag) active.value = 3
    }
  })
}

const uploadDeployConfig = async () => {
  let data = Object.assign(webConfig, webConnect)
  let res = []
  if (webConfig.git_repo_name !== '') {
    data.project_name = webConfig.git_repo_name
  } else {
    data.project_name = webConfig.project_name
    res = await UPLOAD_PROJECT(data.project_name, projectFormData)
    return handleRes(res)
  }
  if (webExtra.ssl) {
    data['enable_https'] = true
    data['domain'] = webExtra.domain
    let formData = new FormData()
    formData.append('ssl_pem', webExtra.pem)
    formData.append('ssl_key', webExtra.key)
    res = await UPLOAD_SSL(data.project_name, formData)
    return handleRes(res)
  }
  res = await UPLOAD_CONFIG(data)
  return handleRes(res)
}

const handleRes = (res) => {
  if (res[0]) {
    ElMessage.info(res[1])
    return true
  } else {
    ElMessage.error(res[1])
    return false
  }
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
</style>
