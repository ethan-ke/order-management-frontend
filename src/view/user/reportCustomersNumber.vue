<template>
  <div class="container">
    <van-form @submit="onSubmit">
      <div class="mt-1">
        <h3 class="text-center container-title">Report Customers Number</h3>
        <van-field v-model="postForm.name" label="Name" placeholder="Bad" :rules="[{ required: true, message: 'Please enter name!' }]" />
        <van-field v-model="postForm.phone" label="Number" placeholder="+966..." :rules="[{ required: true, message: 'Please enter number!' }]" />
        <van-field name="radio" label="Status">
          <template #input>
            <van-radio-group v-model="postForm.status" direction="horizontal">
              <van-radio :name="0">Bad</van-radio>
              <van-radio :name="1">Normal</van-radio>
            </van-radio-group>
          </template>
        </van-field>
      </div>
      <div class="mt-1 submit-btn">
        <van-button :loading="loading" round block type="primary" native-type="submit">
          Submit
        </van-button>
      </div>
    </van-form>
  </div>
</template>
<script>
import { Button, Cell, Col, Field, Form, Toast, RadioGroup, Radio } from 'vant'
import { reportCustomersNumber } from "@/api/upload";
import {ref, watch} from 'vue';
import { useRouter } from "vue-router";

export default {
  name: 'ReportCustomersNumber',
  components: {
    [Cell.name]: Cell,
    [Form.name]: Form,
    [Col.name]: Col,
    [Field.name]: Field,
    [Button.name]: Button,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [Toast.name]: Toast
  },
  setup() {
    const router = useRouter()
    const loading = ref(false)
    const postForm = ref({
      name: null,
      phone: null,
      status: 0,
    })
    const onSubmit = () => {
      loading.value = true
      reportCustomersNumber(postForm.value).then(() => {
        Toast.success('Success')
        loading.value = false
        router.push({ name: 'User' })
      }).catch(() => {
        loading.value = false
      })
    }
    watch(() => postForm.value.phone, (phone) => {
      postForm.value.phone = phone.replace(/\s*/g, '')
    })
    return {
      loading,
      postForm,
      reportCustomersNumber,
      onSubmit
    };
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
