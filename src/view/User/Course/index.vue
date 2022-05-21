<template>
  <user-card-right-layout show-title title="我的课程">
    <course-list :list="list" :pagination="pagination" @change="onPageChange"/>
  </user-card-right-layout>
</template>

<script setup lang="ts">
import {computed, defineComponent, ref} from "vue";
import UserCardRightLayout from "@/layout/UserCardRightLayout.vue";
import {IModelCourse} from "@/components/course-list/model";
import CourseList from "@/components/course-list/index.vue";
import {courseListRequest} from "@/api/course";
import {BasePagination, BaseParams} from "@/api/model";
import useUserStore from "@/store/user";
import {getToken} from "@/utils/auth";
import {Message} from "@arco-design/web-vue";

const component = defineComponent({
  name: 'UserCourse'
});

const pagination = ref<BasePagination>({
  page: 1,
  size: 10,
  total: 0
});
const list = ref<IModelCourse[]>([]);

const user = useUserStore();
const userId = computed(() => {
  return user.id;
})


const fetchCourseList = async (params: BaseParams = {page: 1, size: 10}) => {
  try {
    const {data} = await courseListRequest(params, null, userId.value)
    pagination.value = {
      page: data.pageNum,
      size: data.pages,
      total: data.total
    }
    list.value = data.list.map((val) => {
      return {
        id: val.id,
        name: val.name,
        authorTeacherName: val.teacherName,
        className: val.className,
        thumb: val.thumb,
        publishDate: val.publishDate
      }
    })
  } catch (e) {
    console.log(e)
  }
}
fetchCourseList();

const onPageChange = (page: number) => {
  fetchCourseList({page: page, size: pagination.value.size});
}


/*const list: IModelCourse[] = [];
for(let i = 0 ; i < 10; i++){
  list.push({
    id: i,
    name: i%2 ===0? `测试课程${i}`: `超长超长超长超长超长超长超长超长超长超长课程${i}`,
    authorTeacherName: i%2 ===0  ? `刘智`: `臧锡洋`,
    className: `大数据3班`,
    publishDate: `几天前`,
    thumb: 'https://i2.hdslb.com/bfs/archive/d5be2168ffbe2de1e3eb76fa3f46faaa898a8b63.jpg@672w_378h_1c'
  })
}*/


</script>

<style lang="scss" scoped>

</style>
