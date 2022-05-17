<template>
  <default-layout>
    <div class="maxer-container w-1280">
      <header class="breadcrumb mb-15">
        <a-breadcrumb>
          <template #separator>
            <icon-right/>
          </template>
          <a-breadcrumb-item>
            <router-link to="/">首页</router-link>
          </a-breadcrumb-item>
          <a-breadcrumb-item>
            <router-link to="/course">课程列表</router-link>
          </a-breadcrumb-item>
          <a-breadcrumb-item>
            <span>当前的课程列表</span>
          </a-breadcrumb-item>
        </a-breadcrumb>
      </header>

      <main class="pb-20" v-if="!loading">
        <card class="course-header">
          <a-row>
            <a-col :span="9">
              <div class="thumb">
                <img :src="courseDetail.thumb" alt="Thumb Image">
              </div>
            </a-col>
            <a-col :span="15">
              <div class="course-info">
                <h3>{{ courseDetail.name }}</h3>
                <p class="subtitle">
                  {{ courseDetail.subName }}
                </p>
                <div class="tags">
                  <a-tag>{{ courseDetail.className }}</a-tag>
                  <!--<a-tag>大前端</a-tag>
                  <a-tag>Java开发</a-tag>-->
                </div>
                <div class="course-meta">
                  <span class="knowledge-count">共21个知识点</span>
                  <span class="study-count flex al-c">
                    <a-avatar-group :size="24" :max-count="4">
                      <a-avatar :style="{ backgroundColor: '#7BC616' }">A</a-avatar>
                      <a-avatar :style="{ backgroundColor: '#14C9C9' }">B</a-avatar>
                      <a-avatar :style="{ backgroundColor: '#168CFF' }">C</a-avatar>
                      <a-avatar :style="{ backgroundColor: '#FF7D00' }">Arco</a-avatar>
                      <a-avatar :style="{ backgroundColor: '#FFC72E' }">Design</a-avatar>
                    </a-avatar-group>
                    <span>104个同学正在学习</span>
                  </span>
                  <span class="date">
                    <icon-clock-circle :size="13"/>
                    <span class="ml-5">{{ courseDetail.publishDate }}</span>
                  </span>
                  <span class="score">
                    <a-rate :default-value="4" readonly/>
                  </span>
                </div>
              </div>
              <div class="course-operate">
                <!-- 判断逻辑 -->
                <template v-if="querySignCourseLoading">
                  <a-spin :size="32"/>
                </template>
                <template v-else>
                  <template v-if="courseDetail.authorTeacherId === userId">
                    <a-button type="primary" disabled class="mr-20">不能加入自己的课程</a-button>
                  </template>
                  <template v-if="courseDetail.authorTeacherId !== userId && signCourseStatus && userId != null">
                    <!-- 未加入课程 -->
                    <a-button type="primary" class="mr-20"
                              @click="fetchSignCourse"
                              :loading="signCourseLoading">加入课程</a-button>
                  </template>
                  <template v-if="courseDetail.authorTeacherId !== userId && !signCourseStatus && userId != null">
                    <!-- 已加入课程 -->
                    <a-button type="primary" class="mr-20" @click="onStartStudyButtonClick">开始学习</a-button>
                  </template>
                  <template v-if="userId == null">
                    <!-- 未登录 -->
                    <a-button type="primary" class="mr-20" disabled>未登录</a-button>
                  </template>
                </template>
              </div>
            </a-col>
          </a-row>
        </card>

        <div class="course-main mt-20">
          <a-row :gutter="20">
            <a-col :span="16">
              <!-- 左侧课程详情页面 -->
              <course-detail-item-list :list="detailList"/>
            </a-col>
            <a-col :span="8">
              <card class="teacher-box">
                <a-row :gutter="10">
                  <a-col :span="6">
                    <a-avatar :size="80">
                      <img :src="courseDetail.avatar" alt="avatar" v-if="courseDetail.avatar"/>
                      <icon-user v-else/>
                    </a-avatar>
                  </a-col>
                  <a-col :span="18">
                    <h3 class="teacher-name">{{courseDetail.teacherName}}</h3>
                    <div class="operate-button">
                      <a-button type="primary" size="small">他的课程</a-button>
                    </div>
                    <div class="teacher-info">
                      <template v-if="courseDetail.teacherDescription">
                        {{courseDetail.teacherDescription}}
                      </template>
                      <template v-else>
                        Ta很懒暂时没有自我介绍
                      </template>
                    </div>
                  </a-col>
                </a-row>
              </card>

              <card class="right-box">
                <h3>课程须知</h3>
                <p v-html="courseDetail.description"/>
                <h3>老师告诉你能学到什么？</h3>
                <p class="no-line-height" v-html="courseDetail.content"/>
              </card>
            </a-col>
          </a-row>
        </div>
      </main>
      <div class="loading-container f-jc-c al-c mt-20 mb-20" v-else>
        <a-spin :size="40"/>
      </div>

    </div>
  </default-layout>
</template>

<script setup lang="ts">
import {defineComponent, PropType, reactive, ref} from "vue";
import DefaultLayout from "@/layout/DefaultLayout.vue";
import {useRoute} from "vue-router";
import {Message} from "@arco-design/web-vue";
import {baseConfig} from "@/config";
import Card from "@/components/card/index.vue";
import {IModelCourseDetailItem} from "@/view/Course/view/CourseDetail/component/course-detail-item-list/model";
import CourseDetailItemList from "@/view/Course/view/CourseDetail/component/course-detail-item-list/index.vue";
import {setTitle} from "@/utils/titleUtils";
import CqutNav from "@/components/cqut-nav/index.vue";
import {courseDetailRequest, queryCourseSignRequest, signCourseRequest} from "@/api/course";
import {IModelCourseDetailResp} from "@/api/course/model";
import {storeToRefs} from "pinia";
import useUserStore from "@/store/user";

const component = defineComponent({
  name: 'CourseDetail'
});

const userStore = useUserStore();
const user = storeToRefs(userStore)
const userId = user.id;


const props = defineProps({
  id: String as PropType<string>
})
const courseId = Number.parseInt(props.id);


// 页面数据是否正在加载中状态
const loading = ref(true);


// 请求课程详情数据
const courseDetail = ref<Partial<IModelCourseDetailResp>>({})
const detailList= ref<IModelCourseDetailItem[]>([]); // 课程章节数据
const fetchCourseDetail = async (id: number = courseId) => {
  loading.value = true;
  try {
    const {data} = await courseDetailRequest(id);
    courseDetail.value = {...data};
    setTitle(courseDetail.value.name);  // 设置课程标题
    detailList.value = courseDetail.value.chapters.map((item)=>{
      return {
        title: item.chapterName,
        desc: item.description,
        nodes: item.nodes.map((val)=>{
          return {
            title: val.nodeName,
            type: 'video',
            // TODO 组件接收url参数
            route: '/course/v/1',
            videoUrl: val.videoUrl
          }
        })
      }
    });

    loading.value = false;
  } catch (e) {

  }
}

fetchCourseDetail();

// 判断是否加入过课程
const querySignCourseLoading = ref(true);
const signCourseStatus = ref(false);
const fetchQuerySignCourse = async ()=>{
  querySignCourseLoading.value = true;
  try {
    const {data} = await queryCourseSignRequest(Number.parseInt(props.id), userId.value);
    signCourseStatus.value = !data;
  } finally {
    querySignCourseLoading.value = false;
  }
}
fetchQuerySignCourse();

// 加入课程
const signCourseLoading = ref(false);
const fetchSignCourse = async ()=>{
  if (userId.value == null){
    Message.error("请先登录！");
    return;
  }
  signCourseLoading.value = true;
  try {
    const {code,data} = await signCourseRequest({courseId: Number.parseInt(props.id), studentId: userId.value});
    if (code === 200){
      Message.success("加入课程成功");
      await fetchQuerySignCourse();
    }
  }finally {
    signCourseLoading.value = false;
  }
}

const onStartStudyButtonClick = ()=>{
  window.scroll({
    behavior: "smooth",
    top: document.scrollingElement.scrollTop + document.getElementsByClassName("course-detail-item")[0].getBoundingClientRect().y
  })
}




</script>

<style lang="scss" scoped>
@import "src/assets/scss/core";

.course-main {
  .teacher-box {
    .teacher-name {
      font-weight: 500;
      margin-bottom: 10px;
    }

    .teacher-info {
      margin-top: 10px;
      font-size: 12px;
      line-height: 15px;
    }
  }

  .right-box {
    margin-top: 15px;
    font-size: 12px;
    padding: 10px;

    p, h3, h2, h1, h4 {
      margin-bottom: 10px;
      white-space: pre-line;
    }

    p {
      color: #545c63;
      line-height: 24px;

      &.no-line-height {
        line-height: 24px;
      }
    }

    h3 {
      color: #2c2c2c;
      font-size: 14px;
      font-weight: 700;
    }
  }
}

.course-header {
  .thumb {
    overflow: hidden;
    border-radius: 4px;
    width: 450px;
    height: 254px;

    img {
      width: 450px;
      height: 254px;
    }
  }

  .course-info {
    padding-bottom: 15px;

    h3 {
      font-weight: 500;
      font-size: 1.4rem;
      padding-bottom: 10px;
    }

    .subtitle {
      font-size: 14px;
      color: #6d6d6d;
      line-height: 18px;
      letter-spacing: .5px;
      @extend .text-ellipsis, .line2;
    }
  }

  .tags {
    padding: 20px 0 40px;
    flex-wrap: wrap;
    @extend .flex, .al-c;

    span {
      margin-right: 10px;

      &:last-child {
        margin-right: 0;
      }
    }
  }

  .course-meta {
    font-size: 12px;
    @extend .flex, .al-c;

    span {
      &:last-child:after {
        content: none;
      }

      &:after {
        content: '·';
        padding: 0 10px;
        font-weight: 600;
      }
    }
  }

  .course-operate {
    padding-top: 10px;
  }
}

::v-deep(.course-operate) {
  .arco-btn-primary, .arco-btn-primary[type=button], .arco-btn-primary[type=submit] {
    background-image: linear-gradient(90deg, #fe4443, #df2c2c 61%);
    box-shadow: 0 4px 20px 0 rgba(213, 22, 22, .3);
    border-radius: 4px;
    padding: 8px 30px;
    height: 40px;
    font-size: 15px;

    &:hover {
      background-image: linear-gradient(90deg, #eb3e3e, #cc2828 61%);
    }
  }
  .arco-btn-primary.arco-btn-disabled, .arco-btn-primary[type=button].arco-btn-disabled, .arco-btn-primary[type=submit].arco-btn-disabled{
    background-image: linear-gradient(90deg, #545454, #929292 61%);
    box-shadow: 0 4px 20px 0 rgba(85, 69, 69, 0.3);
    border: none;
  }
}

::v-deep(.teacher-box) {
  .arco-btn-primary {
    background-image: linear-gradient(90deg, #fe4443, #df2c2c 61%);
    border-radius: 4px;

    &:hover {
      background-image: linear-gradient(90deg, #eb3e3e, #cc2828 61%);
    }
  }
}

.loading-container {
  min-height: 400px;
}
</style>
