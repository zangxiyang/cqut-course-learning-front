<template>
  <div class='course-list'>
    <course-item :course-info="item" v-for="item in list" :key="item.id"/>
  </div>
  <div class="course-pagination f-jc-c al-c mt-20">
    <a-pagination :total="200" show-total/>
  </div>
</template>

<script setup lang="ts">
import {defineComponent} from "vue";
import {IModelCourse} from "@/components/course-list/model";
import CourseItem from "@/components/course-list/components/course-item/index.vue";

const component = defineComponent({
  name: 'CourseList'
});

const props = defineProps<{
  list?: IModelCourse[]
}>()

if (props.list.length > 4 && props.list.length %4 !== 0){
  for (let i = 0 ; i < props.list.length %4; i++) props.list.push({id: -1});
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
