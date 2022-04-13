<template>
  <div class="daily-item-container" v-if="!showFuture">
    <div class="header-icon">
      <icon-font :type="icon" :size="size"/>
    </div>
    <div class="main-text mt-10">
      {{ text }}
    </div>
    <div class="sub-text mt-10">
      <a-tag color="#8595a8" size="small">
        {{ subText }}
      </a-tag>
    </div>
    <div class="h-line" v-if="showRightLine"></div>
  </div>
    <icon-font type="iconjingqingqidai" :size="150" v-if="showFuture" class="ml-20"/>
</template>

<script setup lang="ts">
import {defineComponent} from "vue";
import {Icon} from "@arco-design/web-vue";
import {baseConfig} from "@/config";

const component = defineComponent({
  name: 'DailyItem'
});

defineProps({
  icon: String,
  size: Number,
  text: String,
  subText: String,
  showRightLine: {
    type: Boolean,
    default:() => false
  },
  showFuture:{
    type: Boolean,
    default: ()=> false
  }
})

const IconFont = Icon.addFromIconFontCn({src: baseConfig.iconfont});


</script>

<style lang="scss" scoped>
.daily-item-container{
  position: relative;
  padding: 0 30px;
}
.main-text{
  font-size: 14px;
  color: #222;
}
.sub-text,.header-icon,.main-text{
  text-align: center;
}
.h-line{
  display: inline-block;
  position: absolute;
  top: 36px;
  right: 0;
  width: 1px;
  height: 74px;
  border-left: 1px solid #e5e9ef;
}
</style>
