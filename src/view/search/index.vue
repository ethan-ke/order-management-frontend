<template>
<div>
  <div class="search">
    <input v-model="phone" type="text" placeholder="Phone">
    <button @click="handleSearch">Search</button>
  </div>
  <div class="main" v-if="JSON.stringify(customer) !== '{}' && customer !== false">
    <div class="total-amount" :class="{ normal: customer.status === 1, bad: customer.status === 0 }">
      <p>Name: {{ customer.name }}</p>
      <p>Phone: {{ customer.phone }}</p>
      <p>Status: {{ statusText }}</p>
    </div>
  </div>
  <div class="main" v-if="customer === false">
    <div class="total-amount">
      <p>Not Found</p>
    </div>
  </div>
</div>
</template>

<script>
import {Icon, Button} from 'vant';
import { ref } from "vue";
import { fetchCustomers } from '@/api/customer'

export default {
  name: "index",
  components: {
    [Icon.name]: Icon,
    [Button.name]: Button
  },
  setup() {
    const customer = ref({})
    const phone = ref('')
    const handleSearch = () => {
      phone.value = phone.value.replace(/\s*/g, '');
      fetchCustomers({ phone: phone.value }).then((res) => {
        if (res.length === 0) {
          customer.value = false
          return
        }
        customer.value = res.data
      })
    }
    return {
      customer,
      phone,
      handleSearch
    };
  },
  computed: {
    statusText() {
      const statusMap = {
        0: 'Bad',
        1: 'Normal',
      }
      return statusMap[this.customer.status]
    }
  }
}
</script>

<style lang="scss">
body {
  margin: 0;
}
.search {
  margin-top: 30px;
  text-align: center;
  padding: 0.5rem 1rem;
  display: flex;
  justify-content: center;
  input {
    width: 100%;
    height: 46px;
    border: 0;
    border-radius: 8px 0 0 8px;
    padding: 0 0 0 10px;
  }
  button {
    background-color: #ccc;
    color: #fff;
    border: unset;
    height: 46px;
    padding: 1px 2px;
    width: 120px;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }
}
.main {
  padding: 0.5rem 1rem;
  .total-amount {
    border-radius: 10px;
    padding: 1rem;
    background-color: white;
    margin-bottom: 10px;
    p {
      font-size: 11pt;
      padding-bottom: 13px;
      border-bottom: 1px solid #eceff1;
      &:first-child {
        margin-top: 0;
      }
      &:last-child {
        border: unset;
        margin-bottom: 0;
        padding-bottom: 0;
      }
    }
  }
  .normal {
    box-shadow: 0 0 8px #67c23a;
  }
  .bad {
    box-shadow: 0 0 8px #ff0000;
  }
}
</style>
