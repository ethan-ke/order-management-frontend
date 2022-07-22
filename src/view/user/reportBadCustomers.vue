<template>
  <div class="container">
    <van-form @submit="onSubmit">
      <div class="mt-1">
        <h3 class="text-center container-title">Report Bad Customers</h3>
        <van-field name="uploader" label="Picture" :rules="[{ required: true, message: 'Please upload picture!' }]">
          <template #input>
            <van-uploader v-model="fileList" :max-count="1" />
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
import { Button, Cell, Col, Field, Form, Toast, Uploader } from 'vant'
import { reportBadCustomers } from "@/api/upload";
import { ref } from 'vue';
import { useRouter } from "vue-router";

export default {
  name: 'ReportBadCustomers',
  components: {
    [Cell.name]: Cell,
    [Form.name]: Form,
    [Col.name]: Col,
    [Field.name]: Field,
    [Button.name]: Button,
    [Uploader.name]: Uploader,
    [Toast.name]: Toast
  },
  setup() {
    const router = useRouter()
    const loading = ref(false)
    const fileList = ref([])
    const onSubmit = () => {
      loading.value = true
      reportBadCustomers({ image: fileList.value[0].content }).then(() => {
        Toast.success('Success')
        loading.value = false
        router.push({ name: 'User' })
      }).catch((res) => {
        loading.value = false
        if (res.data && res.data.message) {
          Toast.fail(res.data.message)
        } else {
          Toast.fail('Timeout, please try again!')
        }
      })
    }
    return {
      loading,
      fileList,
      reportBadCustomers,
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
