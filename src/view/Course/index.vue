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
            :list="selectClassList" v-model="selectClassIndex"/>
      </div>
    </header>
    <main class="course-list-container">
      <div class="maxer-container w-1280">
        <course-list-new :list="homeCourseList"/>
      </div>
    </main>

  </default-layout>
</template>

<script setup lang="ts">
import {defineComponent, ref} from "vue";
import DefaultLayout from "@/layout/DefaultLayout.vue";
import {IModelSelectListItem} from "@/view/Course/component/select-list/model";
import CourseSelectList from "@/view/Course/component/select-list/index.vue";
import {Notification} from "@arco-design/web-vue";
import {IModelHomeCourse} from "@/view/Home/component/HomeMain/component/model/home-course";
import CourseListNew from "@/components/course-list-new/index.vue";

const component = defineComponent({
  name: 'Course'
});

const selectIndex = ref(0);
const selectList: IModelSelectListItem[] = [
  {
    value: '全部',
    index: 0
  },
  {
    value: '微服务',
    index: 1
  },
  {
    value: '前端开发',
    index: 2
  },
  {
    value: '后端开发',
    index: 3
  },
  {
    value: '大数据开发',
    index: 4
  },
  {
    value: '机器学习',
    index: 5
  }
];
const selectClassIndex = ref(0);
const selectClassList: IModelSelectListItem[] = [
  {
    value: '全部',
    index: 0
  },
  {
    value: '大数据1班',
    index: 1
  },
  {
    value: '大数据2班',
    index: 2
  },
  {
    value: '软工1班',
    index: 3
  },
  {
    value: '软工2班',
    index: 4
  }
];


// 选择列表被点击
const onSelectListClick = (item: IModelSelectListItem) => {
  Notification.success(`列表被点击了,当前项数${selectIndex.value},当前分类名:${item.value}`);
}


// 课程列表

const homeCourseList = ref<IModelHomeCourse[]>([
  {
    id: 100,
    name: '多端全栈项目实战，大型商业级代驾业务全流程落地',
    signCount: 121,
    tag: ['大数据', 'Java', '前端', '数据库'],
    thumb: 'https://imgcdn.imsle.com/images/2022/04/20/623931dc09c59e7605400304.png',
    date: '2022-04-20',
    teacher: '刘智'
  }
]);
for (let i = 0; i < 10; i++) {
  homeCourseList.value.push(  {
    id: i,
    name: '云原生+边缘计算项目实战-KubeEdge打造边缘管理平台',
    signCount: 17,
    tag: ['大数据', 'Go', '云原生', 'DevOps'],
    thumb: 'https://imgcdn.imsle.com/images/2022/04/20/625d283009abda5905400304.png',
    date: '2022-04-20',
    teacher: '臧锡洋'
  });
}

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
