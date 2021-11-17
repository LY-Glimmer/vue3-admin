<!--登录组件-->
<template>
  <div class="login-container">
    <el-form
      class="login-from"
      ref="loginFormRef"
      :model="loginForm"
      :rules="loginRules"
    >
      <div class="title-container">
        <h3 class="title">{{ $t('msg.login.title') }}</h3>
        <lang-select class="lang-select" effect="light"></lang-select>
      </div>
      <!--用户名-->
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon="user"></svg-icon>
        </span>
        <el-input
          placeholder="username"
          name="username"
          type="text"
          v-model="loginForm.username"
        ></el-input>
      </el-form-item>
      <!--密码-->
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon="password"></svg-icon>
        </span>
        <el-input
          placeholder="password"
          name="password"
          v-model="loginForm.password"
          :type="passwordType"
        ></el-input>
        <span class="show-pwd" @click="onChangePwd">
          <svg-icon
            :icon="passwordType === 'password' ? 'eye' : 'eye-open'"
          ></svg-icon>
        </span>
      </el-form-item>
      <el-button type="primary" class="login-btn" @click="handlerLogin">{{
          $t('msg.login.loginBtn')
        }}
      </el-button>
    </el-form>
  </div>
</template>

<script setup>
// 语言选择组件
import LangSelect from '@/components/LangSelect/index'
import { reactive, ref } from 'vue'
import { validatePassWorld } from '@/views/login/rules'
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'
// 处理国际化
const i18n = useI18n()
// 数据源
const loginForm = reactive({
  username: 'super-admin',
  password: '123456'
})
// 验证规则
const loginRules = reactive({
  // 用户名校验规则
  username: [
    {
      required: true,
      trigger: 'blur',
      message: i18n.t('msg.login.usernameRule')
    }
  ],
  password: [
    {
      trigger: 'blur',
      validator: validatePassWorld()
    }
  ]
})

// 处理密码框文本显示
const passwordType = ref('password')
// 密码切换明文
const onChangePwd = () => {
  passwordType.value = passwordType.value === 'password' ? 'text' : 'password'
}
// 处理登录
const login = ref(false)
const store = useStore()
const loginFormRef = ref(null)

const handlerLogin = () => {
  // 1.进行表单校验
  loginFormRef.value.validate(async (valid) => {
    if (valid) {
      login.value = true
      store
        .dispatch('user/login', loginForm)
        .then(() => {
          login.value = false
          // TODO: 登录后操作
        })
        .catch((err) => {
          console.log(err)
          login.value = false
        })
    }
  })
  // 2.触发登录动作
  // 3.登录后处理
}
</script>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
$cursor: #fff;
.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-from {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;

    ::v-deep .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background-color: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }

    ::v-deep .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;

      input {
        background: transparent;
        border: 0;
        border-radius: 0;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        caret-color: $cursor;
      }
    }
  }

  .svg-container {
    display: inline-block;
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
  }

  .title-container {
    position: relative;

    .title {
      color: $light_gray;
      margin: 0 auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    top: 7px;
    right: 10px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .login-btn {
    width: 100%;
    margin-bottom: 30px;
  }

  .lang-select {
    position: absolute;
    top: 4px;
    right: 0;
    font-size: 26px;
    padding: 4px;
    border-radius: 4px;
    cursor: pointer;
    background: #ffffff;
  }
}
</style>
