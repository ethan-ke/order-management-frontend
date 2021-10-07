<template>
  <div class="container">
    <van-form>
      <div class="mt-1">
        <van-field v-model="postForm.phone" name="Phone" label="Phone" placeholder="Please enter customer phone" :rules="[{ required: true, message: 'Please enter customer phone!' }]" />
        <van-field v-model="postForm.price" name="Price" type="tel" label="Price" placeholder="Please enter price" :rules="[{ required: true, message: 'Please enter price!' }]" />
        <van-field v-model="postForm.room_number" name="Room" label="Room" placeholder="Please enter room number" :rules="[{ required: true, message: 'Please enter room number!' }]" />
      </div>
      <div class="mt-1 submit-btn">
        <div class="submit-btn-item">
          <van-button plain round hairline type="warning" @click="cancel(order_id)" size="small">
            Cancel order
          </van-button>
        </div>
        <div class="submit-btn-item">
          <van-button plain round hairline type="primary" @click="submit(order_id)" size="small">
            Update
          </van-button>
        </div>
        <div class="submit-btn-item">
          <van-button plain round hairline type="success" @click="finish(order_id)" size="small">Finish</van-button>
        </div>
      </div>
    </van-form>
  </div>
</template>
<script>
import { fetchOrder, updateOrder, updateOrderStatus } from '@/api/order'
import { Button, Cell, Col, Field, Form, Toast, Dialog } from 'vant'

export default {
  name: 'Submit',
  components: {
    [Cell.name]: Cell,
    [Form.name]: Form,
    [Col.name]: Col,
    [Field.name]: Field,
    [Button.name]: Button,
    [Dialog.name]: Dialog,
    [Toast.name]: Toast
  },
  data() {
    return {
      postForm: {
        phone: null,
        price: null,
        room_number: null
      },
      order_id: '',
      order: {}
    }
  },
  created() {
    this.order_id = this.$route.params.id
    this.getOrder(this.order_id)
  },
  methods: {
    getOrder() {
      fetchOrder(this.order_id).then((res) => {
        this.postForm = res.data
      })
    },
    submit(id) {
      updateOrder(this.postForm, id).then(() => {
        Toast.success('Success')
        this.$router.push('/')
      })
    },
    cancel(id) {
      Dialog.confirm({
        title: 'Cancel order',
        message: 'Are you sure you want to cancel this order？',
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
      })
      .then(() => {
        updateOrderStatus({ status: 2 }, id).then(() => {
          Toast.success('Success')
          this.$router.push('/')
        })
      })
      .catch(() => {
        // on cancel
      })
    },
    finish(id) {
      Dialog.confirm({
        title: 'Finish order',
        message: 'Are you sure you want to finish this order？',
        confirmButtonText: 'Confirm',
        confirmButtonColor: '#07c160',
        cancelButtonText: 'Cancel',
      })
      .then(() => {
        updateOrderStatus({ status: 3 }, id).then(() => {
          Toast.success('Success')
          this.$router.push('/')
        })
      })
      .catch(() => {
        // on cancel
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
  display: flex;
  justify-content: center;
  margin: 3rem -10px 0;
  &-item {
    margin: 0 10px;
    //margin-right: 2rem;
  }
  button {
    width: 100px;
  }
}
</style>
