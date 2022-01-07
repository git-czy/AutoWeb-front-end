<script>
import {ref} from 'vue'

// defineProps({
//   msg: String
// })
//
// const count = ref(0)


export default {
  name: "qqq",
  props: {
    msg: {
      default: '123'
    }
  },
  data() {
    return {
      count: 0
    }
  }
}


</script>

<template>
  <h1>{{ msg }}</h1>

  <button type="button" @click="count++">count is: {{ count }}</button>
  <el-button>nihao</el-button>
  <p>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
</template>

<style scoped>
a {
  color: #42b983;
}
</style>
