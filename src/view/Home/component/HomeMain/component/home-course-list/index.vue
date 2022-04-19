<template>
<div class="home-course-list">
  <a-grid :cols="3" :row-gap="30" :col-gap="20">
    <a-grid-item v-for="item in list" :key="item.name">
      <home-course-item :item="item"/>
    </a-grid-item>
  </a-grid>
</div>
</template>

<script setup lang="ts">
import {defineComponent} from "vue";
import {IModelHomeCourse} from "@/view/Home/component/HomeMain/component/model/home-course";
import HomeCourseItem from "@/view/Home/component/HomeMain/component/home-course-item/index.vue";

const component = defineComponent({
  name: 'HomeCourseList'
});

defineProps<{
  list: IModelHomeCourse[]
}>()
</script>

<style scoped>
.home-course-list{
  padding-top: 40px;
}
</style>
