<template>
  <div class="course-box" @click="$emit('click')">
    <header class="thumb" :style="{backgroundImage: `url(${item.thumb})`}"></header>
    <p class="title text-ellipsis line2">{{ item.name }}</p>
    <div class="tag flex al-c">
      <a-tag v-for="tag in item.tag" :key="tag" class="tag-item">
        {{ tag }}
      </a-tag>
    </div>
    <div class="meta f-jc-sb al-c">
      <div class="teacher flex al-c">
        <span>{{item.teacher}}老师</span>
        <span class="dot ml-5 mr-5">·</span>
        <div class="sign-count">
          {{item.signCount}}人报名
        </div>
      </div>
      <div class="date flex al-c">
        <span>{{item.date}}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {defineComponent} from "vue";
import {IModelHomeCourse} from "@/view/Home/component/HomeMain/component/model/home-course";
import {Icon} from "@arco-design/web-vue";
import {baseConfig} from "@/config";

const component = defineComponent({
  name: 'HomeCourseItem'
});
defineProps<{
  item: IModelHomeCourse
}>()

defineEmits(['click']);

</script>

<style lang="scss" scoped>
.course-box {
  cursor: pointer;
  position: relative;
  width: 270px;
  height: 272px;
  background-color: #fff;
  box-shadow: 0 6px 10px 0 rgba(95, 101, 105, .3);
  border-radius: 8px;
  transition: .2s all;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 20px 0 rgba(95, 101, 105, .3);
  }

  .thumb {
    height: 152px;
    margin-bottom: 8px;
    border-radius: 8px 8px 0 0;
    background-size: cover;
  }

  .title {
    padding: 0 8px;
    height: 40px;
    line-height: 20px;
    color: #545c63;
    margin-bottom: 8px;
  }
  .tag{
    padding: 0 8px;
    margin-bottom: 8px;
    .tag-item{
      margin-right: 6px;
      &:last-child{
        margin-right: 0;
      }
    }
  }
}

.meta{
  margin-top: 10px;
  padding: 0 8px;
  font-size: 12px;
  color: rgba(0,0,0,.45);
}
.dot{
  font-size: 14px;
  font-weight: 500;

}
</style>
