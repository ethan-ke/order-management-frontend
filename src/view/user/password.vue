<template>
  <div class="container">
    <van-form @submit="onSubmit">
      <div class="mt-1">
        <h3 class="text-center container-title">Set Password</h3>
        <van-field v-model="postForm.password" name="Phone" placeholder="Please enter password" :rules="[{ required: true, message: 'Please enter password!' }]" />
      </div>
      <div class="mt-1 submit-btn">
        <van-button round block type="primary" native-type="submit" >
          Confirm
        </van-button>
      </div>
    </van-form>
  </div>
</template>
<script>
import { Button, Cell, Col, Field, Form, Toast} from 'vant'
import {setPassword} from "@/api/user";

export default {
  name: 'Password',
  components: {
    [Cell.name]: Cell,
    [Form.name]: Form,
    [Col.name]: Col,
    [Field.name]: Field,
    [Button.name]: Button,
    [Toast.name]: Toast
  },
  data() {
    return {
      postForm: {
        password: null
      }
    }
  },
  watch: {
    'postForm.password': {
      handler: function (val) {
        this.postForm.password = val.replace(/\s*/g, '')
      }
    }
  },
  methods: {
    onSubmit() {
      setPassword(this.postForm).then(() => {
        Toast.success('Success')
        this.$router.push({ name: 'User' })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  margin: 10vh 1rem;
  &-title {
    margin-bottom: 3rem;
  }
}
.submit-btn {
  width: 200px;
  text-align: center;
  margin: 3rem auto 0;
}
</style>
