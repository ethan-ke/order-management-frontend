<template>
  <div class="container">
    <van-form @submit="onSubmit">
      <div class="mt-1">
        <van-field v-model="postForm.phone" name="Phone" label="Phone" placeholder="Please enter customer phone" :rules="[{ required: true, message: 'Please enter customer phone!' }]" />
        <van-field v-model="postForm.price" name="Price" type="tel" label="Price" placeholder="Please enter price" :rules="[{ required: true, message: 'Please enter price!' }]" />
        <van-field v-model="postForm.room_number" name="Room" label="Room" placeholder="Please enter room number" :rules="[{ required: true, message: 'Please enter room number!' }]" />
      </div>
      <div class="mt-1 submit-btn">
        <van-button round block type="primary" native-type="submit" size="small">
          Submit
        </van-button>
      </div>
    </van-form>
  </div>
</template>
<script>
import { createOrder} from '@/api/order'
import { Button, Cell, Col, Field, Form, Toast} from 'vant'

export default {
  name: 'Submit',
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
        phone: null,
        price: null,
        room_number: null
      }
    }
  },
  watch: {
    'postForm.phone': {
      handler: function (val) {
        this.postForm.phone = val.replace(/\s*/g, '')
      }
    }
  },
  methods: {
    onSubmit() {
      createOrder(this.postForm).then(() => {
        Toast.success('Success')
        this.$router.push('/')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  margin: 30vh 1rem;
}
.submit-btn {
  width: 200px;
  text-align: center;
  margin: 3rem auto 0;
}
</style>
