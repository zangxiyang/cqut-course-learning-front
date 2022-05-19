<template>
  <default-layout none-margin>
    <div class="course-video-box flex" v-bind="$attrs">
      <div class="course-sidebar-layout">
        <dl>
          <dd class="chapter">
            <icon-list />
            <span>章节</span>
          </dd>
          <dd class="ask" @click="visibleAsk = true">
            <icon-question-circle-fill />
            <span>问答</span>
          </dd>
          <dd class="comments" @click="visibleComment = true">
            <icon-message />
            <span>评论</span>
          </dd>
          <dd class="note" disabled>
            <icon-pen-fill />
            <span>笔记</span>
          </dd>
          <dd class="heart" disabled>
            <icon-heart-fill />
            <span>收藏</span>
          </dd>
        </dl>
      </div>
      <div class="course-core-layout">
        <cqut-video-player :url="videoUrl"/>
      </div>
      <div class="course-right-layout">
        <div class="panel-show">
          <div class="panel-show-icon">
            <icon-left/>
          </div>
        </div>
      </div>
    </div>

    <main class="course-video-bottom">
      <course-video-bottom :course-id="Number.parseInt(id)"/>
    </main>

  </default-layout>
</template>

<script setup lang="ts">
import {defineComponent, PropType, provide, ref} from "vue";
import CqutVideoPlayer from "@/components/cqut-video-player/index.vue";
import DefaultLayout from "@/layout/DefaultLayout.vue";
import {setTitle} from "@/utils/titleUtils";
import CourseVideoBottom from "@/view/Course/view/CourseVideo/component/course-video-bottom/index.vue";
import {Message} from "@arco-design/web-vue";
import {useRoute, useRouter} from "vue-router";

const component = defineComponent({
  name: 'CourseVideo'
});

// 注入变量
const visibleComment = ref(false);
const visibleAsk = ref(false);
provide('visibleCommentProvide',visibleComment);
provide('visibleAskProvide', visibleAsk);


const props = defineProps({
  id: String as PropType<string>
});



// 设置标题
setTitle("学习视频播放页");

// 视频
const route = useRoute();
const router = useRouter();
const videoUrl = ref(route.query.videoUrl as string);


</script>


<style lang="scss" scoped>
@import "src/assets/scss/core";

.course-video-box {
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
}

.course-sidebar-layout{
  background-color: #1c1f21;
  width: 60px;
  @extend .flex,.al-c;
  dl{
    flex: 1;
    width: 100%;
  }
  dd{
    @extend .f-jc-c,.cur-p,.al-c;
    height: 72px;
    flex-direction: column;
    color: rgba(255,255,255,.6);
    font-size: 12px;
    user-select: none;
    svg{
      font-size: 24px;
    }
    span{
      margin-top: 3px;
    }

    &:hover{
      background-color: #26292c;
      color: #fff;
    }
    &[disabled]{
      color: #545c63;
      cursor: not-allowed;
      &:hover{
        color: #545c63;
        background-color: inherit;
      }
    }
  }
}
.course-core-layout{
  flex: 1;
  position: relative;
  background-color: #1c1f21;
  padding: 30px 0;
}
.course-right-layout{
  width: 60px;
  background-color: #1c1f21;
  position: relative;
  .panel-show{
    cursor: pointer;
    height: 100%;
    @extend .f-jc-c,.al-c;
  }
  .panel-show-icon{
    color: #9c999f;
    line-height: 24px;
    font-size: 24px;
    flex-direction: column;
  }
}
</style>
