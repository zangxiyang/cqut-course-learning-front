<template>
  <div class="course-bottom-box" v-bind="$attrs">
    <div class="course-bottom-nav">
      <div class="maxer-container w-1280">
        <ul class="flex al-c">
          <li :class="{'active': item.index === navIndex, 'disabled': item.disabled === true}"
              v-for="item in navConfig" :key="item.index" @click="onNavClick(item.index,item.disabled)">
            {{ item.name }}
          </li>
        </ul>
      </div>
    </div>
    <div class="course-bottom-container">
      <div class="maxer-container w-1280">
        <header class="operation mt-20 f-jc-sb">
          <div class="empty"></div>
          <a-button type="primary" status="danger" shape="round" size="large" @click="visiblePublish = true">我要发布
          </a-button>
        </header>
        <div class="course-bottom-nav-content">
          <div class="nav-content-panel">
            <a-comment
                author="用户名"
                content="Comment body content.Comment body content.Comment body content."
                datetime="2022年05月05日">
              <template #actions>
              <span class="action" key="heart" @click="onGoodClick">
                <span v-if="good">
                <IconHeartFill :style="{ color: '#f53f3f' }"/>
                </span>
                <span v-else>
                  <IconHeart/>
                </span>
                  {{ 83 + (good ? 1 : 0) }}
              </span>
                <span class="action" key="reply">
                  <IconMessage/> 回复
                </span>
              </template>
              <template #avatar>
                <a-avatar>
                  <img
                      alt="avatar"
                      src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
                  />
                </a-avatar>
              </template>
            </a-comment>
          </div>
        </div>

      </div>
    </div>

    <cqut-modal v-model="visiblePublish">
      <div class="group f-jc-c al-c">
        <a-button type="primary" shape="round" size="large" status="danger">我要评论</a-button>
        <a-button type="primary" class="ml-20" shape="round" size="large" status="danger">我要提问</a-button>
      </div>
    </cqut-modal>
  </div>
</template>

<script setup lang="ts">
import {defineComponent, PropType, ref} from "vue";
import {IModelCourseNav} from "@/view/Course/view/CourseVideo/component/course-video-bottom/model";
import {Message} from "@arco-design/web-vue";
import CqutModal from "@/components/cqut-modal/index.vue";


const component = defineComponent({
  name: 'CourseVideoBottom'
});

const props = defineProps({
  videoId: Number as PropType<number>
})
Message.info(`ID: ${props.videoId}`)

const navConfig: IModelCourseNav[] = [
  {
    name: '评论',
    index: 0
  },
  {
    name: '问答',
    index: 1
  },
  {
    name: '笔记',
    index: 2,
    disabled: true
  }
]
const navIndex = ref(0);

const onNavClick = (index: number, isDisabled: boolean = false): void => {
  if (isDisabled === true) {
    Message.error("程序猿正在努力开发中")
    return;
  }
  navIndex.value = index;
}


// 点赞

const good = ref(false);
const onGoodClick = () => {
  good.value = !good.value;
}


// 发布模态框
const visiblePublish = ref(false);
const onPublishClick = () => {

}


</script>

<style lang="scss" scoped>
.course-bottom-nav {
  background-color: #fff;
  height: 68px;
  width: 100%;
  box-shadow: 0 4px 8px 0 rgba(28, 31, 33, .1);

  ul {
    padding: 12px 16px;
  }

  li {
    position: relative;
    margin-right: 90px;
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

.course-bottom-container {
  min-height: 300px;
}

.course-bottom-nav-content {
  .action {
    cursor: pointer;
    user-select: none;
    -webkit-user-select: none;
  }
}

.modal-close{
  cursor: pointer;
  transition: .15s ease-in-out;
  &:hover{
    color: #f20d0d;
  }
}
</style>
