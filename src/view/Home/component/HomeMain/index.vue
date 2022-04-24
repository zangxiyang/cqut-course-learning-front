<template>
  <div class="home-main-container">
    <card class="header-show">
      <a-row :gutter="10" align="center">
        <a-col :span="5">
          <show-item :size="46" icon="iconjava2" title="Java工程师" desc="综合就业率第一"/>
        </a-col>
        <a-col :span="5">
          <show-item :size="46" icon="iconqianduan1" title="前端工程师" desc="入门快、岗位多"/>
        </a-col>
        <a-col :span="5">
          <show-item :size="44" icon="icona-zu338" title="大数据开发" desc="应用领域最为广泛"/>
        </a-col>
        <a-col :span="5">
          <show-item :size="44" icon="iconjiqixuexi-xuanzhong" title="AI工程师" desc="面向未来的岗位"/>
        </a-col>
        <a-col :span="4">
          <div class="show-item-desc f-jc-c al-c">
            就业热门岗位
          </div>
        </a-col>
      </a-row>
    </card>

    <main class="course-container">
      <header class="flex al-c">
        <img src="@/assets/img/title-bg3.png" alt="新上好课" class="new-course-logo">
        <home-course-nav :list="list" v-model="navIndex" class="ml-20"/>
      </header>
      <home-course-list :list="homeCourseList"/>
    </main>
  </div>
</template>

<script setup lang="ts">
import {defineComponent, ref} from "vue";
import Card from "@/components/card/index.vue";
import ShowItem from "@/view/Home/component/HomeMain/component/show-item/index.vue";
import HomeCourseNav from "@/view/Home/component/HomeMain/component/home-course-nav/index.vue";
import {IModelHomeCourseNav} from "@/view/Home/component/HomeMain/component/home-course-nav/model";
import HomeCourseList from "@/view/Home/component/HomeMain/component/home-course-list/index.vue";
import {IModelHomeCourse} from "@/view/Home/component/HomeMain/component/model/home-course";

const component = defineComponent({
  name: 'HomeMain'
});

const list: IModelHomeCourseNav[] = [
  {
    title: '推荐',
    index: 0
  },
  {
    title: '大数据',
    index: 1
  },
  {
    title: '后端',
    index: 2
  },
  {
    title: '微服务',
    index: 3
  },
];
const navIndex = ref(0);



const homeCourseList = ref<IModelHomeCourse[]>([
  {
    name: '多端全栈项目实战，大型商业级代驾业务全流程落地',
    signCount: 121,
    tag: ['大数据','Java','前端','数据库'],
    thumb: 'https://imgcdn.imsle.com/images/2022/04/20/623931dc09c59e7605400304.png',
    date: '2022-04-20',
    teacher: '刘智'
  },
  {
    name: '云原生+边缘计算项目实战-KubeEdge打造边缘管理平台',
    signCount: 17,
    tag: ['大数据','Go','云原生','DevOps'],
    thumb: 'https://imgcdn.imsle.com/images/2022/04/20/625d283009abda5905400304.png',
    date: '2022-04-20',
    teacher: '臧锡洋'
  },
  {
    name: '云原生+边缘计算项目实战-KubeEdge打造边缘管理平台',
    signCount: 17,
    tag: ['大数据','Go','云原生','DevOps'],
    thumb: 'https://imgcdn.imsle.com/images/2022/04/20/625d283009abda5905400304.png',
    date: '2022-04-20',
    teacher: '臧锡洋'
  },
  {
    name: '云原生+边缘计算项目实战-KubeEdge打造边缘管理平台',
    signCount: 17,
    tag: ['大数据','Go','云原生','DevOps'],
    thumb: 'https://imgcdn.imsle.com/images/2022/04/20/625d283009abda5905400304.png',
    date: '2022-04-20',
    teacher: '臧锡洋'
  },
  {
    name: '云原生+边缘计算项目实战-KubeEdge打造边缘管理平台',
    signCount: 17,
    tag: ['大数据','Go','云原生','DevOps'],
    thumb: 'https://imgcdn.imsle.com/images/2022/04/20/625d283009abda5905400304.png',
    date: '2022-04-20',
    teacher: '臧锡洋'
  },
  {
    name: '云原生+边缘计算项目实战-KubeEdge打造边缘管理平台',
    signCount: 17,
    tag: ['大数据','Go','云原生','DevOps'],
    thumb: 'https://imgcdn.imsle.com/images/2022/04/20/625d283009abda5905400304.png',
    date: '2022-04-20',
    teacher: '臧锡洋'
  }
]);

</script>

<style lang="scss" scoped>
.header-show {
  padding: 10px;
}

.show-item-desc {
  position: relative;
  font-size: 13px;
  color: rgba(0, 0, 0, .45);
  cursor: default;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: -10px;
    height: 35px;
    width: 2px;
    background-color: #e0e0e0;
    display: inline-block;

  }
}

.course-container {
  padding: 30px 0;

  .new-course-logo {
    height: 29px;
    width: auto;
  }
}
</style>
