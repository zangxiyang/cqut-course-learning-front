<template>
  <nav class="course-nav">
    <ul class="flex al-c">
      <li :class="{'active': item.index === modelValue}" v-for="item in list" :key="item.index"
          @click="$emit('update:modelValue', item.index)">
        {{item.title}}
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import {defineComponent} from "vue";
import {IModelHomeCourseNav} from "@/view/Home/component/HomeMain/component/home-course-nav/model";

const component = defineComponent({
  name: 'HomeCourseNav'
});

defineProps<{
  modelValue: number,
  list: IModelHomeCourseNav[]
}>()
defineEmits<{
  (e: 'update:modelValue',value: number):void
}>()
</script>

<style lang="scss" scoped>
.course-nav{
  li{
    list-style: none;
    cursor: pointer;
    position: relative;
    padding: 0 14px;
    line-height: 30px;
    font-size: 14px;
    &.active{
      color: #e02020;
      font-weight: 700;
      &::after{
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        margin-left: -.7rem;
        width: 1.4rem;
        height: 2px;
        border-radius: 100px;
        background-color: #e76060;
      }
    }
  }
}
</style>
