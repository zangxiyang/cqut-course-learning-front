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

      <main class="pb-20">
        <card class="course-header">
          <a-row>
            <a-col :span="9">
              <div class="thumb">
                <img src="https://imgcdn.imsle.com/images/2022/04/20/623931dc09c59e7605400304.png" alt="Thumb Image">
              </div>
            </a-col>
            <a-col :span="15">
              <div class="course-info">
                <h3>该课程的标题</h3>
                <p class="subtitle">
                  一句话对课程的描述，学习该课程最终达到的目的,学习该课程最终达到的目的,学习该课程最终达到的目的,学习该课程最终达到的目的
                  一句话对课程的描述，学习该课程最终达到的目的,学习该课程最终达到的目的,学习该课程最终达到的目的,学习该课程最终达到的目的
                </p>
                <div class="tags">
                  <a-tag>微服务</a-tag>
                  <a-tag>大前端</a-tag>
                  <a-tag>Java开发</a-tag>
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
                    <span class="ml-5">2022年04月25日</span>
                  </span>
                  <span class="score">
                    <a-rate :default-value="4" readonly/>
                  </span>
                </div>
              </div>
              <div class="course-operate">
                <a-button type="primary">加入课程</a-button>
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
                      <img src="https://ai.cqut.edu.cn/__local/9/18/A7/9B594BA707E3232A05502D3E0E0_A106B0C5_A612.jpg"
                           alt="教师头像"/>
                    </a-avatar>
                  </a-col>
                  <a-col :span="18">
                    <h3 class="teacher-name">刘智老师</h3>
                    <div class="operate-button">
                      <a-button type="primary" size="small">他的课程</a-button>
                    </div>
                    <div class="teacher-info">
                      副教授，硕士生导师。在 《Computerized Medical Imaging and Graphics》、《 Image and Vision Computing 》
                      、《计算机应用研究》、《光学精密工程》、《计算机科学》及《重庆大学学报(自然科学版)》等国内外重要刊物及国际会议累计发表论文30余篇。
                    </div>
                  </a-col>
                </a-row>
              </card>

              <card class="right-box">
                <h3>课程须知</h3>
                <p>学习本课之前，需要大家对Java开发有一定的基础，对基于SprinBoot2框架开发有一定的经验，这样学习本课程会很容易上手。</p>
                <h3>老师告诉你能学到什么？</h3>
                <p class="no-line-height">一、了解Swagger是什么，在实际项目中解决了哪些问题。</p>
                <p class="no-line-height">二、掌握Swagger中提供的注解。</p>
                <p class="no-line-height">三、如何搭建Swagger。</p>
                <p class="no-line-height">四、如何将SpringBoot与Swagger进行整合。</p>
                <p class="no-line-height">五、掌握Swagger的权限管控。</p>
                <p class="no-line-height">六、掌握Swagger多环境使用方法。</p>
              </card>
            </a-col>
          </a-row>
        </div>
      </main>

    </div>
  </default-layout>
</template>

<script setup lang="ts">
import {defineComponent, PropType, ref} from "vue";
import DefaultLayout from "@/layout/DefaultLayout.vue";
import {useRoute} from "vue-router";
import {Message} from "@arco-design/web-vue";
import {baseConfig} from "@/config";
import Card from "@/components/card/index.vue";
import {IModelCourseDetailItem} from "@/view/Course/view/CourseDetail/component/course-detail-item-list/model";
import CourseDetailItemList from "@/view/Course/view/CourseDetail/component/course-detail-item-list/index.vue";
import {setTitle} from "@/utils/titleUtils";
import CqutNav from "@/components/cqut-nav/index.vue";

const component = defineComponent({
  name: 'CourseDetail'
});

const props = defineProps({
  id: String
})

// 页面数据是否正在加载中状态
const loading = ref(false);

setTimeout(() => {
  setTitle('当前课程名')
}, 1000);



// 课程章节数据

const detailList: IModelCourseDetailItem[] = [];

detailList.push(
    {
      title: '第1章 课程学习指南及导学',
      desc: '介绍整体课程内容及学习方法的指导',
      nodes: [
        {
          title: '1-1 Swagger导学',
          type: 'video',
          route: '/course/v/1'
        },
        {
          title: '1-2 Swagger是什么',
          type: 'file',
          route: '/course/v/1'
        }
      ]
    },
    {
      title: '第2章 文本表征知识',
      desc: '本章主要介绍One Hot/TF-IDF/Word2Vec等常用的文本表征方法，对比其优缺点，完成代码实践。',
      nodes: [
        {
          title: '2-1 文本表征介绍',
          type: 'video',
          route: '/course/v/1'
        },
        {
          title: '2-2 One Hot',
          type: 'file',
          route: '/course/v/1'
        },
        {
          title: '2-3 One Hot代码实践',
          type: 'video',
          route: '/course/v/1'
        },
        {
          title: '2-4 TF-DF',
          type: 'video',
          route: '/course/v/1'
        },
        {
          title: '2-5 TF-DF实战（上）',
          type: 'video',
          route: '/course/v/1'
        },
        {
          title: '2-6 TF-DF实战（下）',
          type: 'video',
          route: '/course/v/1'
        },
        {
          title: '2-7 Word2Vec',
          type: 'video',
          route: '/course/v/1'
        },
        {
          title: '2-8 Word2Vec实战',
          type: 'video',
          route: '/course/v/1'
        },
      ]
    },
);


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
    }

    p {
      color: #545c63;
      line-height: 24px;

      &.no-line-height {
        line-height: 14px;
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
</style>
