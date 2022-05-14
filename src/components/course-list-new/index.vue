<template>
  <div class="course-list">
    <a-grid :cols="col" :row-gap="30" :col-gap="10" v-if="!loading">
      <a-grid-item v-for="item in list" :key="item.name">
        <course-list-item :item="item" @click="$router.push(`/course/${item.id}`)"/>
      </a-grid-item>
    </a-grid>
    <template v-else>
      <div class="loading-container f-jc-c al-c">
        <a-spin :size="32"/>
      </div>
    </template>

    <div class="course-list-pagination f-jc-c">
      <a-pagination :total="500"/>
    </div>

  </div>
</template>

<script setup lang="ts">
import {defineComponent, PropType} from "vue";
import CourseListItem from "@/components/course-list-new/component/course-list-item/index.vue";
import {IModelCourseItem} from "@/components/course-list-new/component/model";

const component = defineComponent({
  name: 'CourseListNew'
});

defineProps({
  list: Array as PropType<IModelCourseItem[]>,
  col: {
    type: Number as PropType<number>,
    default: 4
  },
  loading: {
    type: Boolean as PropType<boolean>,
    default: true
  }
})
</script>

<style lang="scss" scoped>
.course-list-pagination{
  margin-top: 40px;
}

::v-deep(.course-list-pagination){
  .arco-pagination-item-active, .arco-pagination-item-active:hover{
    color: #fff;
    background-color: #ec1500;
    font-weight: 600;
    border-radius: 4px;
  }
  .arco-pagination-item{
    border-radius: 4px;
  }
  .arco-pagination-item-next:not(.arco-pagination-item-disabled):hover, .arco-pagination-item-previous:not(.arco-pagination-item-disabled):hover{
    color: #ec1500;
  }
}
</style>
