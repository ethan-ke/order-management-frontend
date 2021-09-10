<template>
<div>
  <div class="user">
    <div class="user-avatar">
      <img :src="user.avatar" alt="">
    </div>
    <p class="username">Hello {{ user.username }}</p>
  </div>
  <div class="main">
  </div>
</div>
</template>

<script>
import {Icon} from 'vant';
import {useStore} from "vuex";
import {ref} from "vue";

export default {
  name: "index",
  components: {
    [Icon.name]: Icon,
  },
  setup() {
    const store = useStore()
    const user = ref({
      username: store.state.user.username,
      avatar: store.state.user.avatar
    })
    // console.log(store.state.user)
    return {
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
  margin-top: 30vh;
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
  &-item {
    @include flex();
    justify-content: flex-start;
    padding: 0.5rem 1rem;
    border: 1px solid #cccccc;
    border-radius: 10px;
    margin-top: 1rem;
    i {
      color: #000000;
    }
    a {
      color: #000000;
      padding-left: 1rem;
      font-size: 10pt;
    }
    &-arrow {
      flex: 1;
      text-align: right;
    }
  }
}
</style>
