<template>
  <div class="show-item f-jc-c al-c">
    <div class="left">
        <icon-font :size="size" :type="icon"/>
    </div>
    <div class="right">
      <h4>{{ title }}</h4>
      <p>{{ desc }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import {defineComponent} from "vue";
import {Icon} from "@arco-design/web-vue";
import {baseConfig} from "@/config";

const component = defineComponent({
  name: 'ShowItem'
});

const props = defineProps({
  title: String,
  desc: String,
  icon: String,
  size: {
    type: Number,
    default: ()=> 32
  }
});

const IconFont = Icon.addFromIconFontCn({src: baseConfig.iconfont})


</script>

<style lang="scss" scoped>
.right{
  cursor: default;
  margin-left: 4px;
  h4{
    width: 138px;
    font-size: 16px;
    color: #1c1f21;
    line-height: 22px;
    margin-bottom: 4px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    font-weight: 400;
  }
  p{
    font-size: 13px;
    color: rgba(0,0,0,.45);
  }
}
</style>
