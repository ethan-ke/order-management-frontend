<template>
  <div>
    <router-view />
    <van-tabbar v-model="active">
      <van-tabbar-item replace to="/" name="home" icon="orders-o">Orders</van-tabbar-item>
      <van-tabbar-item replace to="/submit" name="submit" icon="add-o">Submit</van-tabbar-item>
      <van-tabbar-item replace to="/search" name="search" icon="search">Search</van-tabbar-item>
      <van-tabbar-item replace to="/user" name="user" icon="contact">Me</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
import { ref } from 'vue';

export default {
  setup() {
    const active = ref('home');
    return { active };
  }
};
</script>
<style>
  body {
    font-size: 16px;
    background-color: #f8f8f8;
    -webkit-font-smoothing: antialiased;
  }
  .van-uploader__upload {
    background-color: #646566 !important;
  }
</style>
