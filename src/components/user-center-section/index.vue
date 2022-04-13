<template>
<div class="user-center-section" :class="{'bottom-border': showBottomBorder}">
  <header class="center-header flex al-c">
    <icon-font :type="titleIcon" :size="iconSize"/>
    <span class="title">{{ title }}</span>
  </header>
  <main>
    <slot/>
  </main>
</div>
</template>

<script setup lang="ts">
import {defineComponent} from "vue";
import {Icon} from "@arco-design/web-vue";
import {baseConfig} from "@/config";

const component = defineComponent({
  name: 'UserCenterSection'
});

defineProps({
  titleIcon: String,
  iconSize: Number,
  title: String,
  showBottomBorder: {
    default: ()=> false,
    type: Boolean
  }
});

const IconFont = Icon.addFromIconFontCn({src: baseConfig.iconfont});

</script>

<style lang="scss" scoped>

main{
  padding: 10px 20px 40px;
}

.user-center-section{
  .center-header{
    .title{
      font-size: 20px;
      line-height: 40px;
      color: #222;
      margin-left: 5px;
      vertical-align: center;
    }
  }
}
.bottom-border{
  border-bottom: 1px solid #e5e9ef;
}
</style>
