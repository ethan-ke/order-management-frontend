<template>
  <div class="container">
    <div class="select-btn text-center">
      <van-uploader v-model="fileList" multiple :max-count="1" :after-read="afterRead" />
    </div>

    <div class="result">
      <div class="result-items">
        <div class="result-items-item" v-for="(item, index) in faceItems" :key="index">
          <div class="result-items-item-image">
            <img :src="item.image" alt="">
          </div>
          <div class="result-items-item-score">
            <div>Score: {{ item.score }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Button, Uploader } from 'vant';
import { SearchCustomerPhoto } from '@/api/customer'
import {ref} from "vue";
export default {
  name: "Photo",
  components: {
    [Button.name]: Button,
    [Uploader.name]: Uploader
  },
  setup() {
    const fileList = ref([]);
    const faceItems = ref([]);
    const afterRead = (file) => {
      SearchCustomerPhoto(file.content).then(res => {
        faceItems.value = res.data
      })
    };
    return {
      fileList,
      faceItems,
      afterRead
    };
  },
}
</script>

<style lang="scss" scoped>
.container {
  margin: 0 auto 60px;
  .select-btn {
    margin-top: 1rem;
  }
  .result {
    padding: 0 1rem;
    &-items-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #ffffff;
      border-radius: 10px;
      margin-bottom: 10px;
      padding: 6px;
      &-image {
        width: 200px;
        img {
          width: 100%;
          border-radius: 10px;
        }
      }
    }
  }
}
</style>
