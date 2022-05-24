<template>
  <div class='course-list'>
    <a-grid :col-gap="10" :row-gap="10" :cols="4">
      <a-grid-item :span="1" v-for="item in list" :key="item.id">
        <course-item :course-info="item"/>
      </a-grid-item>
    </a-grid>
  </div>
  <div class="course-pagination f-jc-c al-c mt-20">
    <a-pagination :total="pagination.total"
                  :size="pagination.size"
                  :current="pagination.page"
                  @change="onPageChange"
                  show-total/>
  </div>
</template>

<script setup lang="ts">
import {defineComponent, defineEmits} from "vue";
import {IModelCourse} from "@/components/course-list/model";
import CourseItem from "@/components/course-list/components/course-item/index.vue";
import {BasePagination} from "@/api/model";

defineComponent({
  name: 'CourseList'
});

const props = defineProps<{
  list?: IModelCourse[],
  pagination?: BasePagination
}>()

const emits = defineEmits<{
  (e: 'change', page: number): void,
}>();

const onPageChange = (page: number)=>{
  emits('change', page);
}



</script>

<style lang="scss" scoped>
.course-list{
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

}

::v-deep(.arco-pagination-list){
  .arco-pagination-item-active, .arco-pagination-item-active:hover{
    background-color: #00a1d6;;
    color: #fff;
    border-radius: 4px;
  }
}
</style>
