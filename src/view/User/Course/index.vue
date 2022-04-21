<template>
<user-card-right-layout show-title title="我的课程">
  <course-list :list="list"/>
</user-card-right-layout>
</template>

<script setup lang="ts">
import {defineComponent} from "vue";
import UserCardRightLayout from "@/layout/UserCardRightLayout.vue";
import {IModelCourse} from "@/components/course-list/model";
import CourseList from "@/components/course-list/index.vue";

const component = defineComponent({
  name: 'UserCourse'
});

const list: IModelCourse[] = [];
for(let i = 0 ; i < 10; i++){
  list.push({
    id: i,
    name: i%2 ===0? `测试课程${i}`: `超长超长超长超长超长超长超长超长超长超长课程${i}`,
    authorTeacherName: i%2 ===0  ? `刘智`: `臧锡洋`,
    className: `大数据3班`,
    publishDate: `几天前`,
    thumb: 'https://i2.hdslb.com/bfs/archive/d5be2168ffbe2de1e3eb76fa3f46faaa898a8b63.jpg@672w_378h_1c'
  })
}


</script>

<style lang="scss" scoped>

</style>
