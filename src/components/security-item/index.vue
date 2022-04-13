<template>
  <div class="security-item-container flex">
    <div class="left-icon">
      <icon-font :type="icon" :size="size"/>
    </div>
    <div class="right-container">
      <p class="title">{{ title }}</p>
      <p class="desc">{{ desc }}</p>
      <div class="operation flex al-c">
        <template v-if="status">
          <span class="safe-btn disabled">{{ okStatusText }}</span>
          <span class="safe-a" @click="$router.push(changeButtonRouter)"> {{ changeButtonText }}></span>
        </template>
        <template v-else>
          <span class="safe-btn" @click="$router.push(noStatusRouter)">{{ noStatusText }}</span>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {defineComponent} from "vue";
import {Icon} from "@arco-design/web-vue";
import {baseConfig} from "@/config";

const component = defineComponent({
  name: 'SecurityItem'
});

defineProps({
  icon: String,
  size: Number,
  title: String,
  desc: String,
  status: {
    default: () => false,
    type: Boolean
  },
  okStatusText: {
    default: () => '已设置',
    type: String
  },
  noStatusText:{
    default: () => '前往设置',
    type: String
  },
  noStatusRouter: String,
  changeButtonText: {
    default: () => '更改',
    type: String
  },
  changeButtonRouter: String
})

const IconFont = Icon.addFromIconFontCn({src: baseConfig.iconfont});
</script>

<style lang="scss" scoped>
.left-icon {
  padding: 0 20px;
}

.right-container {
  .title {
    font-size: 16px;
    margin-bottom: 8px;
    color: #222;
  }

  .desc {
    color: #99a2aa;
    font-size: 12px;
    margin-bottom: 8px;
  }
}

.safe-a {
  display: inline-block;
  height: 24px;
  line-height: 24px;
  color: #00a1d6;
  margin-left: 10px;
  font-size: 13px;

  &:hover {
    color: #00b5e5;
    cursor: pointer;
  }
}
.safe-btn{
  cursor: pointer;
  background-color: #00a1d6;
  color: #fff;
  border-radius: 4px;
  text-align: center;
  display: inline-block;
  width: 70px;
  height: 24px;
  line-height: 24px;
  font-size: 12px;
  &.disabled{
    cursor: default;
    background-color: #e5e9ef;
    color: #abb4c1;
  }
}
</style>
