<template>
  <div class="course-item-container" v-if="courseInfo.id !== -1" @click="onItemClick">
    <header class="thumb"
            :style="{backgroundImage: courseInfo.thumb != null ?`url(${courseInfo.thumb})`: `url(${defaultImg})`}">
    </header>
    <div class="item-info mt-5 mb-5">
      <a href="JavaScript:">
        {{ courseInfo.name }}
      </a>
    </div>
    <div class="item-meta f-jc-sb al-c">
      <span class="author-teacher">
        <icon-font type="iconiconuser-copy"/>
        {{courseInfo.authorTeacherName}}
      </span>
      <span class="date">
        <icon-font type="iconshijian1"/>
        {{ courseInfo.publishDate }}
      </span>
    </div>
  </div>
  <div v-else-if="courseInfo.id === -1" class="empty"></div>
</template>

<script setup lang="ts">
import {defineComponent} from "vue";
import {IModelCourse} from "@/components/course-list/model";
import defaultImg from '@/assets/img/d5be2168ffbe2de1e3eb76fa3f46faaa898a8b63.jpg'
import {Icon} from "@arco-design/web-vue";
import {baseConfig} from "@/config";
import {useRouter} from "vue-router";

const component = defineComponent({
  name: 'CourseItem'
});

const props = defineProps<{
  courseInfo: IModelCourse
}>()

const IconFont = Icon.addFromIconFontCn({src:baseConfig.iconfont});

const router = useRouter();

const onItemClick = ()=>{
  router.push(`/course/${props.courseInfo.id}`);
}



</script>

<style lang="scss" scoped>
.course-item-container{
  width: 210px;
  margin-bottom: 20px;
  .thumb{
    cursor: pointer;
    width: 190px;
    height: 120px;
    margin: 0 auto;
    background-size: cover;
    position: relative;
    overflow: hidden;
    border-radius: 4px;
    background-position: center center;
  }
  .item-meta{
    cursor: default;
    font-size: 12px;
  }
  .item-info{
    line-height: 20px;
    overflow: hidden;
    letter-spacing: .3px;
    a{
      display: block;
      color: inherit;
      height: 38px;
      transition: color .2s ease;
      &:hover{
        color: #00a1d6;
      }
    }
  }

  .item-meta,.item-info{
    padding: 0 10px;
  }
}
.empty{
  width: 210px;
}
</style>
