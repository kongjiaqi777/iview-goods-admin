<style lang="less">
  @import './login.less';
</style>

<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>
          <!-- <i-form ref="" :model="" :rules="">
              <Form-item prop="userName" label="用户昵称">
              </Form-item>

              <Form-item prop="password">

              </Form-item>
          </i-form> -->
          <p class="login-tip">输入任意用户名和密码即可</p>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import LoginForm from '_c/login-form'
import { mapActions } from 'vuex'
export default {
  components: {
    LoginForm
  },
  methods: {
    ...mapActions([
      'handleSubmit',
      'getUserInfo'
    ]),
    handleSubmit ({ userName, password }) {
      this.$store.dispatch('LoginByUsername', this.loginForm).then(() => {
        this.$router.push({ path: '/home' }) // 登录成功之后重定向到首页
      }).catch(err => {
        this.$message.error(err) // 登录失败提示错误
      })
      // this.handleLogin({ userName, password }).then(res => {
      //   this.getUserInfo().then(res => {
      //     this.$router.push({
      //       name: this.$config.homeName
      //     })
      //   })
      // })
    }
  }
}
</script>

<style>

</style>
