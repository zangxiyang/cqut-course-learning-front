<template>
  <div class="select-row flex">
    <span class="category">{{ title }}</span>
    <ul class="category-list ml-10">
      <li class="list-item" v-for="item in list"
          @click="onItemClick(item)"
          :key="item.index" :class="{'active': modelValue === item.index}">
        {{ item.value }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import {defineComponent} from "vue";
import {IModelSelectListItem} from "@/view/Course/component/select-list/model";

const component = defineComponent({
  name: 'CourseSelectList'
});

const props = defineProps<{
  list: IModelSelectListItem[],
  modelValue: number,
  title: string
}>();

const emits = defineEmits<{
  (e: 'update:modelValue', value: number),
  (e: 'click', item: IModelSelectListItem)
}>();

const onItemClick = (item: IModelSelectListItem) => {
  // 如果为当前选项，则不进行事件
  if (item.index === props.modelValue) return;
  emits('update:modelValue', item.index);
  emits('click', item);
}
</script>

<style lang="scss" scoped>
.select-row {
  .category{
    line-height: 18px;
    padding: 8px 0;
    font-size: 14px;
    font-weight: 600;
    min-width: 30px;
  }
  .category-list{
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }
  .list-item{
    cursor: pointer;
    padding: 8px;
    border-radius: 6px;
    margin-right: 10px;
    line-height: 18px;
    &:last-child{
      margin-right: 0;
    }
    &.active{
      background: rgba(255, 3, 3, .1);
      color: rgba(255, 3, 3, .8);
    }
  }
}
</style>
