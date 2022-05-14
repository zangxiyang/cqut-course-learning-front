<template>
  <default-layout>
    <header class="course-select-container">
      <div class="maxer-container w-1280">
        <course-select-list
            @click="onSelectListClick"
            :list="selectList" v-model="selectIndex"
            title="分类"/>
        <course-select-list
            class="mt-20"
            title="班级"
            @click="onSelectListClick"
            :list="classIdOptions" v-model="selectClassIndex"/>
      </div>
    </header>
    <main class="course-list-container">
      <div class="maxer-container w-1280">
        <course-list-new :list="homeCourseList" :loading="courseLoading"/>
      </div>
    </main>

  </default-layout>
</template>

<script setup lang="ts">
import {computed, defineComponent, Ref, ref} from "vue";
import DefaultLayout from "@/layout/DefaultLayout.vue";
import {IModelSelectListItem} from "@/view/Course/component/select-list/model";
import CourseSelectList from "@/view/Course/component/select-list/index.vue";
import {Notification} from "@arco-design/web-vue";
import {IModelHomeCourse} from "@/view/Home/component/HomeMain/component/model/home-course";
import CourseListNew from "@/components/course-list-new/index.vue";
import {IModelClassResp, IModelCourseResp} from "@/api/course/model";
import {classListRequest, courseListRequest} from "@/api/course";

const component = defineComponent({
  name: 'Course'
});

const selectIndex = ref(0);
const selectList: IModelSelectListItem[] = [
  {
    value: '全部',
    label: '全部',
    index: 0
  },
  {
    value: '微服务',
    label:'微服务',
    index: 1
  },
  {
    value: '前端开发',
    label: '前端开发',
    index: 2
  },
  {
    value: '后端开发',
    label: '后端开发',
    index: 3
  },
  {
    value: '大数据开发',
    label: '大数据开发',
    index: 4
  },
  {
    value: '机器学习',
    label: '机器学习',
    index: 5
  }
];
const selectClassIndex = ref(0);
// 请求班级信息
const classListData = ref<IModelClassResp[]>([]);
const classIdOptions = computed<IModelSelectListItem[]>(() => {
  return classListData.value.map((value, index, array) => {
    return {
      label: value.className,
      value: value.id,
      index: index + 1
    };
  });
});
const classLoading = ref<boolean>(false);
const fetchClassList = async () => {
  classLoading.value = true;
  try {
    const { data } = await classListRequest();
    classListData.value = data;
  } catch (err) {

  } finally {
    classLoading.value = false;
  }
};
fetchClassList();


// 选择列表被点击
const onSelectListClick = (item: IModelSelectListItem) => {
  Notification.success(`列表被点击了,当前项数${selectIndex.value},当前分类名:${item.value}`);
}


// 课程列表
// 首页课程列表
const courseLoading = ref(true);
const courseList = ref<IModelCourseResp[]>([])
const fetchCourseList = async ()=>{
  courseLoading.value = true;
  try {
    const {code,data} = await courseListRequest({page: 1, size: 6});
    courseList.value = data.list.filter(item => item.status === 1);
    if (code === 200){
      courseLoading.value = false;
    }
  }
  catch (e){
    console.log(e)
  }
}
fetchCourseList();
const homeCourseList:Ref<IModelHomeCourse[]> = computed<IModelHomeCourse[]>(()=>{
  return courseList.value.map((val)=>{
    return {
      id: val.id,
      name: val.name,
      signCount: 99,
      tag: [val.className],
      thumb: val.thumb,
      date: val.publishDate,
      teacher: val.teacherName
    } as IModelHomeCourse
  })
});

</script>

<style lang="scss" scoped>
.course-select-container {
  padding: 20px 0;
}

.course-list-container {
  min-height: 300px;
  background-color: #fff;
  padding: 20px 0 40px;
}
</style>
