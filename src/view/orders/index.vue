<template>
  <div class="container">
    <div v-if="orders !== undefined && orders.length !== 0">
      <p class="total-amount">Today's income: <span>{{ income }}</span></p>
      <div v-for="(order, index) in orders" :key="index" class="coupon">
        <div class="coupon-info">
          <p class="title">Phone number: {{ order.phone }}</p>
        </div>
        <div class="coupon-footer">
          <div>
            <p class="coupon-info-description">Price: <span>{{ order.price }}</span></p>
            <p class="coupon-info-description">Room number：{{ order.room_number }}</p>
            <p class="coupon-info-description">Create at：{{ order.created_at }}</p>
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
import { Card, Image as VanImage, Toast, Empty } from 'vant'
import { fetchOrders } from '@/api/order'
export default {
  name: 'Orders',
  components: {
    [Card.name]: Card,
    [Toast.name]: Toast,
    [Empty.name]: Empty,
    [VanImage.name]: VanImage
  },
  data() {
    return {
      orders: [],
      income: null,
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
        this.income = response.data.income
      })
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
.total-amount {
  border-radius: 10px;
  padding: 1rem;
  background-color: white;
  //color: #1989fa;
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
    &-price {
      //color: #1989fa;
    }
  }
  &-info-description {
    color: #a7a3a3;
    font-size: 13px;
  }
  &-footer {
    display: flex;
    justify-content: space-between;
    align-content: center;
    align-items: center;
    button {
      height: 30px;
      width: 80px;
      margin-bottom: 13px;
      background-color: unset;
      border: 1px solid #ccc;
      border-radius: 8px;
      font-size: 9pt;
    }
  }
}
</style>
