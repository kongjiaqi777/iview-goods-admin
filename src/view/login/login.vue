<style lang="less">
  @import './login.less';
</style>

<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>
          <p class="login-tip">输入用户名和密码</p>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import { Message } from 'iview'
import LoginForm from '_c/login-form'
import { mapActions } from 'vuex'
export default {
  components: {
    LoginForm
  },
  methods: {
    ...mapActions([
      'handleSubmit'
    ]),
    handleSubmit ({ userName, password }) {
      let loginForm = {
        'phone': userName,
        'password': password
      }
      this.$store.dispatch('LoginByUsername', loginForm).then(() => {
        this.$router.push({ path: '/home' }) // 登录成功之后重定向到首页
      }).catch(err => {
        Message.info(err) // 登录失败提示错误
      })
    }
  }
}
</script>

<style>

</style>
