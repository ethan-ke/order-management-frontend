<template>
  <div class="tab">
    <div v-for="(item, index) in searchItems" :key="index" class="tab-item" @click="handleTab(item)">{{ item }}</div>
  </div>
  <component :is="component_name" />
</template>

<script>
import {Icon, Toast, Button} from 'vant';
import {ref} from "vue";
import SearchPhone from './components/Phone'
import SearchPhoto from './components/Photo'
export default {
  name: "index",
  components: {
    [Icon.name]: Icon,
    [Toast.name]: Toast,
    [Button.name]: Button,
    SearchPhone,
    SearchPhoto
  },
  setup() {
    const searchItems = [
      'SearchPhone',
      'SearchPhoto',
    ]
    const component_name = ref('SearchPhone')
    const handleTab = (item) => {
      component_name.value = item
    }
    return {
      searchItems,
      handleTab,
      component_name
    };
  }
}
</script>

<style lang="scss">
body {
  margin: 0;
}
.tab {
  display: flex;
  justify-content: center;
  background-color: #ffffff;
  box-shadow: 1px 3px 7px 1px #c7c3c3;
  &-item {
    width: 100%;
    padding: 20px 0;
    text-align: center;
    &-active {
      border-bottom: 1px solid #646566;
    }
  }
}
</style>
