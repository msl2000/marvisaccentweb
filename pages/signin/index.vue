<template>
  <div>
    <div>
      <h1 class="auth-h1">Login</h1>
      <el-form ref="form" :model="form" label-width="120px" label-position="top">
        <el-form-item label="Email">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="Password">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="form.remember">Remember Me</el-checkbox>
        </el-form-item>
        <el-button class="w-100" type="primary">Log in</el-button>
        <div class="text-center p-3 pb-5">
          <a href="/register" class="my-3 text-center">I forgot my password</a>
        </div>
         <el-button class="w-100" type="info" plain>New to Pyntree? Start your trial</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  layout: 'auth/default',
  components: {
    Logo
  },
  data() {
    return {
      form: {
        username: null,
        password: null,
        remember: false
      }
    }
  }
}
</script>
