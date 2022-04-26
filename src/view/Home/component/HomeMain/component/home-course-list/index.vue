<template>
<div class="home-course-list">
  <a-grid :cols="3" :row-gap="30" :col-gap="20">
    <a-grid-item v-for="item in list" :key="item.name">
      <home-course-item :item="item" @click="$router.push(`/course/${item.id}`)"/>
    </a-grid-item>
  </a-grid>
  <div class="list-bottom-go-more">
    <a-button type="primary" @click="goMoreClick">了解更多</a-button>
  </div>
</div>
</template>

<script setup lang="ts">
import {defineComponent} from "vue";
import {IModelHomeCourse} from "@/view/Home/component/HomeMain/component/model/home-course";
import HomeCourseItem from "@/view/Home/component/HomeMain/component/home-course-item/index.vue";
import {useRouter} from "vue-router";

const component = defineComponent({
  name: 'HomeCourseList'
});

defineProps<{
  list: IModelHomeCourse[]
}>()



const router = useRouter();
const goMoreClick = ()=>{
  router.push('/course');
}
</script>

<style lang="scss" scoped>
.home-course-list{
  padding-top: 40px;
}
.list-bottom-go-more{
  margin-top: 50px;
  text-align: center;
}

::v-deep(.list-bottom-go-more){
  .arco-btn-primary, .arco-btn-primary[type=button], .arco-btn-primary[type=submit]{
    background-image: linear-gradient(90deg, #fe4443, #df2c2c 61%);
    box-shadow: 0 4px 20px 0 rgba(213,22,22,.3);
    border-radius: 4px;
    padding: 8px 30px;
    height: 40px;
    font-size: 15px;

    &:hover{
      background-image: linear-gradient(90deg, #eb3e3e, #cc2828 61%);
    }
  }
}
</style>
