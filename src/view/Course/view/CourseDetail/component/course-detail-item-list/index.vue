<template>
  <card class="course-detail-item" v-for="item in list" :key="item.title">
    <!-- 章节标题 -->
    <h3>{{ item.title }}</h3>
    <div class="item-desc">
      {{ item.desc }}
    </div>
    <ul class="nodes">
      <li v-for="node in item.nodes" :key="node.title">
        <router-link :to="{path: `${node.route}`, query: {videoUrl: node.videoUrl}}" v-if="node.route != null" class="flex al-c">
          <template v-if="node.type === 'file'">
            <!--文件类型-->
            <icon-drive-file/>
            <span class="type-text">文件:</span>
          </template>
          <template v-else-if="node.type === 'video'">
            <!-- 视频类型 -->
            <icon-video-camera/>
            <span class="type-text">视频:</span>
          </template>
          <span class="title">{{ node.title }}</span>
          <a-button class="study-btn ml-15" type="primary" status="danger" size="mini" shape="round">开始学习</a-button>

        </router-link>
        <template v-else>
          <a href="JavaScript:" class="flex al-c">
            <template v-if="node.type === 'file'">
              <!--文件类型-->
              <icon-drive-file/>
              <span class="type-text">文件:</span>
            </template>
            <template v-else-if="node.type === 'video'">
              <!-- 视频类型 -->
              <icon-video-camera/>
              <span class="type-text">视频:</span>
            </template>
            <span class="title">{{ node.title }}</span>
            <a-button class="study-btn ml-15" type="primary" status="danger" size="mini" shape="round">开始学习</a-button>
          </a>
        </template>
      </li>
    </ul>
  </card>
</template>

<script setup lang="ts">
import {defineComponent, defineEmits, PropType} from "vue";
import Card from "@/components/card/index.vue";
import {
  IModelCourseDetailItem,
  IModelCourseDetailItemNode
} from "@/view/Course/view/CourseDetail/component/course-detail-item-list/model";
import {useRouter} from "vue-router";

const component = defineComponent({
  name: 'CourseDetailItemList'
});

defineProps({
  list: Array as PropType<IModelCourseDetailItem[]>
})

const emits = defineEmits(['click']);
const router = useRouter();

</script>

<style lang="scss" scoped>
.course-detail-item{
  padding: 10px;
  margin-top: 20px;
  &:first-child{
    margin-top: 0;
  }
  .item-desc{
    margin-top: 8px;
    margin-bottom: 10px;
    font-size: 12px;
    color: #545c63;
    line-height: 18px;
  }
  .nodes{
    a{
      color: #1c1f21;
      &:hover{
        color: #f20d0d;
      }
    }
    li{
      &:hover{
        background-color: rgba(242,13,13,.05);
        border-radius: 4px;
        color: #f20d0d;
        .study-btn{
          opacity: 1;
        }
      }
      position: relative;
      height: 48px;
      line-height: 48px;
      padding-left: 12px;
    }
    .study-btn{
      opacity: 0;
    }
    .type-text{
      font-size: 14px;
      font-weight: 700;
      line-height: 48px;
      margin: 0 6px;
    }
  }
}
</style>
