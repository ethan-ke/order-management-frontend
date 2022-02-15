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
      <p><span class="total-amount-category">Today's salary: </span><span>{{ statistics.today_income }}</span></p>
      <p><span class="total-amount-category">Monthly salary: </span><span>{{ statistics.monthly_income }}</span></p>
      <p><span class="total-amount-category">Total amount of the month: </span><span>{{ statistics.total_amount }}</span></p>
      <p><span class="total-amount-category">Total deductions: </span><span>{{ statistics.total_deductions }}</span></p>
      <p><span class="total-amount-category">Actual salary: </span><span>{{ statistics.actual_salary }}</span></p>
      <p><span class="total-amount-category">Last month's salary: </span><span>{{ statistics.last_month_income }}</span></p>
      <p><span class="total-amount-category">Last month's total amount: </span><span>{{ statistics.last_month_total_amount }}</span></p>
      <p><span class="total-amount-category">Total deductions last month: </span><span>{{ statistics.total_deductions_last_month }}</span></p>
      <p><span class="total-amount-category">Actual salary last month: </span><span>{{ statistics.actual_salary_last_month }}</span></p>
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
      display: flex;
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
    span {
      display: inline-block;
    }
    &-category {
      margin-right: auto;
    }
  }
}
</style>
