<template>
  <div class="container">
    <van-row>
      <van-col span="24">
        <van-form class="login-form" @submit="onSubmit">
          <van-field v-model="postForm.username" name="username" label="Username" placeholder="Username" :rules="[{ required: true, message: 'Please enter username!' }]" />
          <van-field v-model="postForm.password" type="password" name="Password" label="Password" placeholder="Password" :rules="[{ required: true, message: 'Please enter password!' }]" />
          <div class="submit">
            <van-button round block type="primary" native-type="submit">
              Sign In
            </van-button>
          </div>
        </van-form>
      </van-col>
    </van-row>
  </div>
</template>

<script>

import {
  Field,
  Form,
  Toast,
  Col,
  Row,
  Button
} from 'vant'

export default {
  name: 'SignIn',
  components: {
    [Field.name]: Field,
    [Button.name]: Button,
    [Toast.name]: Toast,
    [Form.name]: Form,
    [Col.name]: Col,
    [Row.name]: Row
  },
  data() {
    return {
      postForm: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    onSubmit() {
      this.$store.dispatch('user/signIn', this.postForm).then(() => {
        this.$router.push({ path: this.redirect || '/' })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
	.login-form {
		margin-top: 25vh;
	}
	.submit {
    margin-top: 3rem;
    button {
      width: 200px;
      margin: 0 auto;
    }
  }
</style>
