<template>
  <div class="home-right-side">
    <!-- 首页右侧 -->
    <card class="notice">
      <div class="title-container flex al-c">
        <icon-font type="iconjingdongjinrongjinzhu" :size="20"/>
        <h4 class="title ml-5 text-ellipsis">
          重庆理工大学课程学习平台上线啦！重庆理工大学课程学习平台上线啦！
        </h4>
      </div>
      <div class="main-container">
        <p>一个氛围超好的线上线下教育学习平台，海量资料、资源、课程源码，少年尽情学习吧！</p>
      </div>
    </card>

    <card class="mt-20">
      <template #header>
        关于开发者
      </template>
      <a-row :gutter="10" align="center">
        <a-col :span="4">
          <a-avatar :size="36">
            <img src="https://www.imsle.com/seale.jpg" alt="Avatar Image">
          </a-avatar>
        </a-col>
        <a-col :span="20">
          <p class="safe-text">
            开发者Seale，全栈开发。
          </p>
          <p class="safe-text">
            重庆理工大学 - 数据科学与大数据技术
          </p>
        </a-col>
      </a-row>
    </card>

    <card class="rank mt-20">
      <template #header>
        <div class="f-jc-sb al-c">
          <span>排行榜</span>
          <a-button type="text" size="small">更多</a-button>
        </div>
      </template>
      <div class="rank-container">
        <rank-item nick-name="Seale酱" desc="本周积分: 100" :rank="1"/>
        <rank-item nick-name="Seale酱" desc="本周积分: 80" :rank="2"/>
        <rank-item nick-name="Seale酱" desc="本周积分: 40" :rank="3"/>
        <rank-item nick-name="Seale酱" desc="本周积分: 37" :rank="4"/>
      </div>
    </card>
  </div>
</template>

<script setup lang="ts">
import {defineComponent} from "vue";
import Card from "@/components/card/index.vue";
import {Icon} from "@arco-design/web-vue";
import {baseConfig} from "@/config";
import RankItem from "@/view/Home/component/HomeRightSide/component/rank-item/index.vue";

const component = defineComponent({
  name: 'HomeRightSide'
});

const IconFont = Icon.addFromIconFontCn({src: baseConfig.iconfont})
</script>

<style lang="scss" scoped>
.notice {
  .title-container {
    padding: 5px 0;
    overflow: hidden;
  }

  .title {
    font-size: 17px;
    font-weight: 500;
    width: 100%;
  }

  .main-container {
    font-size: 13px;
    color: rgba(0, 0, 0, .45);
    line-height: 18px;
  }
}

.safe-text {
  font-size: 14px;
  color: rgba(0, 0, 0, .45);
  line-height: 20px;
}

</style>
