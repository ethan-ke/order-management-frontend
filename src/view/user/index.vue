<template>
<div>
  <div class="user">
    <div class="user-avatar">
      <img :src="user.avatar" alt="">
    </div>
    <p class="username">Hello {{ user.username }}</p>
  </div>
  <div class="main">
    <div class="total-amount">
      <p>Today's salary: {{ statistics.today_income }}</p>
      <p>Monthly salary: {{ statistics.monthly_income }}</p>
      <p>Total amount of the month: {{ statistics.total_amount }}</p>
      <p>Total deductions: {{ statistics.total_deductions }}</p>
      <p>Actual salary: {{ statistics.actual_salary }}</p>
      <p>Last month's salary: {{ statistics.last_month_income }}</p>
      <p>Last month's total amount: {{ statistics.last_month_total_amount }}</p>
      <p>Total deductions last month: {{ statistics.total_deductions_last_month }}</p>
      <p>Actual salary last month: {{ statistics.actual_salary_last_month }}</p>
    </div>
  </div>
</div>
</template>

<script>
import {Icon} from 'vant';
import {useStore} from "vuex";
import {onMounted, ref} from "vue";
import { getStatistics } from '@/api/order'

export default {
  name: "index",
  components: {
    [Icon.name]: Icon,
  },
  setup() {
    onMounted(() => {
      // console.log(route.path)
    })
    const store = useStore()
    const user = ref({
      username: store.state.user.username,
      avatar: store.state.user.avatar
    })
    const statistics = ref({})
    getStatistics().then((res) => {
      statistics.value = res.data
    })
    return {
      statistics,
      user
    };
  },
}
</script>

<style lang="scss">
@mixin flex() {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
body {
  margin: 0;
}
.user {
  margin-top: 30px;
  text-align: center;
  padding: 0 3rem;
  height: 140px;
  img {
    height: 70px;
    width: 70px;
    border-radius: 100px;
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
      border-bottom: 1px solid #dcdee0;
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
}
</style>
