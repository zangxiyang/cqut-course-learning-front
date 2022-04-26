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

const component = defineComponent({
  name: 'CourseDetail'
});

const props = defineProps({
  id: String
})

// 页面数据是否正在加载中状态
const loading = ref(false);

setTimeout(() => {
  document.title = `当前课程名 - ${baseConfig.title}`
}, 1000);


</script>

<style lang="scss" scoped>
@import "src/assets/scss/core";

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
  .course-operate{
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
</style>
