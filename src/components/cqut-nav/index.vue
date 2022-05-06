<template>
  <div class="cqut-nav">
    <ul class="flex al-c">
      <li :class="{'active': item.index === modelValue, 'disabled': item.disabled === true}"
          v-for="item in navConfig" :key="item.index" @click="onNavClick(item.index,item.disabled)">
        {{ item.title }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import {defineComponent, PropType} from "vue";
import {Message} from "@arco-design/web-vue";
import {IModelCqutNav} from "@/components/cqut-nav/model";

const component = defineComponent({
  name: 'CqutNav'
});

defineProps({
  modelValue: Number as PropType<number>,
  navConfig: Array as PropType<IModelCqutNav[]>
})
const emits = defineEmits<{ (e: 'update:modelValue', index: number) }>()

const onNavClick = (index: number, disabled: boolean)=>{
  if (disabled === true) {
    Message.error("程序猿正在努力开发中")
    return;
  }
  emits('update:modelValue', index);
}

</script>

<style lang="scss" scoped>
.cqut-nav {
  background-color: #fff;
  height: 68px;
  width: 100%;
  box-shadow: 0 4px 8px 0 rgba(28, 31, 33, .1);

  ul {
    padding: 12px 30px;
  }

  li {
    position: relative;
    margin-right: 30px;
    line-height: 40px;
    cursor: pointer;
    font-weight: 700;
    font-size: 17px;

    &.disabled {
      color: rgba(0, 0, 0, .38);
      cursor: not-allowed;
    }

    &.active {
      color: #f20d0d;

      &:after {
        content: "";
        display: block;
        position: absolute;
        width: 20px;
        height: 3px;
        background-color: #f20d0d;
        bottom: 0;
        left: calc(50% - 10px);
        border-radius: 3px;
      }
    }
  }
}
</style>
