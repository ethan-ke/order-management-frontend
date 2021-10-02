<template>
  <div class="container">
    <div v-if="orders !== undefined && orders.length !== 0">
      <div v-for="(order, index) in orders" :key="index" class="coupon">
        <div class="coupon-info">
          <p class="title">Room number：{{ order.room_number }}</p>
        </div>
        <div class="coupon-footer">
          <div>
            <p class="coupon-info-description">Price: {{ order.price }}</p>
            <p class="coupon-info-description">Phone number: {{ order.phone }}</p>
            <p class="coupon-info-description">Create at：{{ order.created_at }}</p>
          </div>
          <div v-if="order.status === 1" class="handle">
            <van-button plain hairline type="primary" @click="handleEdit(order.id)" size="small">Edit</van-button>
          </div>
          <div v-else-if="order.status === 2">
            <van-button plain hairline type="warning" disabled size="small">Canceled</van-button>
          </div>
          <div v-else-if="order.status === 3">
            <van-button plain hairline disabled type="success" size="small">Finished</van-button>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <van-empty description="No order" />
    </div>

  </div>
</template>
<script>
import {Card, Image as VanImage, Toast, Empty, Button } from 'vant'
import { fetchOrders } from '@/api/order'
export default {
  name: 'Orders',
  components: {
    [Card.name]: Card,
    [Toast.name]: Toast,
    [Button.name]: Button,
    [Empty.name]: Empty,
    [VanImage.name]: VanImage
  },
  data() {
    return {
      orders: [],
      user: {}
    }
  },
  created() {
    this.getOrders()
  },
  methods: {
    getOrders() {
      fetchOrders().then(response => {
        this.orders = response.data.orders
        this.today_income = response.data.today_income
        this.monthly_income = response.data.monthly_income
        this.total_amount = response.data.total_amount
      })
    },
    handleEdit(id) {
      this.$router.push({ name: 'OrdersEdit', params: { id: id }})
    }
  }
}
</script>

<style lang="scss" scoped>
body{
  background-color: #f5f5f5;
}
.container {
  margin: 1rem 1rem 4rem;
}
.opacity {
  opacity: 0.3;
}
.coupon {
  padding: 10px 8px;
  margin-bottom: 10px;
  background-color: white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  p {
    margin: 5px;
  }
  &-image {
    display: flex;
    align-items: center;
  }
  &-info {
    display: flex;
    align-content: center;
    align-items: flex-start;
    flex-direction: column;
    padding: 6px 0;
  }
  &-info-description {
    color: #a7a3a3;
    font-size: 13px;
  }
  &-footer {
    display: flex;
    justify-content: space-between;
    align-content: center;
    align-items: flex-end;
    .handle > button {
      margin-right: 5px;
    }
    button {
      width: 66px;
      height: 24px;
      margin-bottom: 5px;
    }
  }
}
</style>
