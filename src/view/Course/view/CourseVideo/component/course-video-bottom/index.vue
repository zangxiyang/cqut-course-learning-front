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
        <template v-if="navIndex === 0">
          <header class="operation f-jc-sb mt-20">
            <div class="empty"></div>
            <a-button type="primary" status="danger" shape="round" size="large" @click="visiblePublish = true">我要发布
            </a-button>
          </header>
          <div class="course-bottom-nav-content">
            <card class="mt-20 mb-20">
              <div class="nav-content-panel">
                <a-empty v-if="commentData.length === 0 && !commentLoading"/>
                <div class="f-jc-c mt-20" v-if="commentLoading">
                  <a-spin :size="32"/>
                </div>
                <a-comment
                    v-else
                    v-for="comment in commentData"
                    :author="comment.nickName"
                    :content="comment.content"
                    :datetime="comment.date">
                  <template #actions>
                    <span class="action reply" @click="openReplyModal(0, comment)">
                    <IconMessage/> 回复
                  </span>
                  </template>
                  <template #avatar>
                    <a-avatar v-if="comment.avatar != null">
                      <img
                          alt="avatar"
                          :src="comment.avatar"
                      />
                    </a-avatar>
                    <a-avatar v-else>
                      <icon-user/>
                    </a-avatar>
                  </template>
                  <a-comment v-for="child in comment.children"
                             style="margin-top: 20px"
                             v-if="comment.children.length > 0"
                             :author="child.nickName"
                             :datetime="child.date">
                    <template #actions>
                      <span class="action reply" @click="openReplyModal(0, child)">
                        <IconMessage/> 回复
                      </span>
                    </template>
                    <template #avatar>
                      <a-avatar v-if="child.avatar != null">
                        <img
                            alt="avatar"
                            :src="child.avatar"
                        />
                      </a-avatar>
                      <a-avatar v-else>
                        <icon-user/>
                      </a-avatar>
                    </template>
                    <template #content>
                      <span class="reply-pre mr-5 none-select">回复@{{ child.parentNickName }}:</span>
                      <span>{{ child.content }}</span>
                    </template>
                  </a-comment>
                </a-comment>

                <div class="pagination f-jc-c mt-20">
                  <a-pagination :current="commentPagination.page"
                                @change="onCommentChange"
                                :page-size="commentPagination.size"
                                v-show="!commentLoading && commentData.length > 0"
                                :total="commentPagination.total" show-total/>
                </div>
              </div>
            </card>
          </div>
        </template>
        <template v-if="navIndex === 1">
          <!-- 问答 -->
          <header class="operation f-jc-sb mt-20">
            <div class="empty"></div>
            <a-button type="primary" status="danger" shape="round" size="large" @click="visiblePublish = true">我要发布
            </a-button>
          </header>
          <div class="course-bottom-nav-content">
            <card class="mt-20 mb-20">
              <div class="nav-content-panel">
                <a-comment
                    v-for="item in [1,1,2,12,312,3,123,12,3,123]"
                    author="用户名"
                    content=""
                    datetime="2022年05月05日">
                  <template #content>
                    <h2>提问标题</h2>
                    <p>内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</p>
                  </template>
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
                    <span class="action reply" @click="openReplyModal(1)">
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

                <div class="pagination f-jc-c mt-20">
                  <a-pagination :total="500" show-total/>
                </div>
              </div>
            </card>
          </div>
        </template>

        <template v-if="navIndex === 2">
          <!-- 资料 -->
          <card class="mt-20 mb-20">
            <div class="doc-nav">
              <ul class="f-jc-c al-c">
                <li :class="{'active': item.index === docNavIndex}" @click="onDocNavClick(item.index)"
                    v-for="item in docNavConfig" :key="item.index">{{ item.title }}
                </li>
              </ul>
            </div>

            <template v-if="docNavIndex === 0">
              <!-- 课程文件 -->
              <a-list :loading="courseFileLoading">
                <a-list-item v-for="item in courseFileData">
                  <a-list-item-meta :title="item.fileName"
                                    :description="item.fileType">
                    <template #avatar>
                      <a-avatar shape="square">
                        <icon-file/>
                      </a-avatar>
                    </template>
                  </a-list-item-meta>
                  <template #actions>
                    <a :href="item.url" target="_blank">
                      <a-button type="primary" status="danger" size="mini" shape="round">
                        <template #icon>
                          <icon-download/>
                        </template>
                        下载
                      </a-button>
                    </a>
                  </template>
                </a-list-item>
              </a-list>
              <div class="pagination f-jc-c mt-20">
                <a-pagination :total="500" show-total/>
              </div>
            </template>

            <template v-if="docNavIndex === 1">
              <!-- 知识点文件 -->
              <a-list>
                <a-list-item>
                  <a-list-item-meta title="知识点文件.doc"
                                    description="第一章节教学资料">
                    <template #avatar>
                      <a-avatar shape="square">
                        <icon-file/>
                      </a-avatar>
                    </template>
                  </a-list-item-meta>
                  <template #actions>
                    <a-button type="primary" status="danger" size="mini" shape="round">
                      <template #icon>
                        <icon-download/>
                      </template>
                      下载
                    </a-button>
                  </template>
                </a-list-item>
              </a-list>
              <div class="pagination f-jc-c mt-20">
                <a-pagination :total="500" show-total/>
              </div>
            </template>
          </card>
        </template>
      </div>
    </div>

    <cqut-modal v-model="visiblePublish">
      <div class="group f-jc-c al-c">
        <a-button type="primary"
                  @click="onCommentClick" shape="round"
                  size="large" status="danger">我要评论
        </a-button>
        <a-button type="primary" class="ml-20" shape="round"
                  @click="onAskClick"
                  size="large" status="danger">我要提问
        </a-button>
      </div>
    </cqut-modal>

    <cqut-modal v-model="visibleAsk">
      <!-- 问答 -->
      <a-form :model="askForm" layout="vertical" style="margin-top: -20px" @submit="onAskFormSubmit">
        <a-form-item label="提问标题" field="title">
          <a-input v-model="askForm.title" placeholder="请输入提问的标题"/>
        </a-form-item>
        <a-form-item label="提问内容" field="content">
          <a-textarea v-model="askForm.content"
                      :auto-size="{minRows: 5, maxRows: 5}"
                      :max-length="200" allow-clear show-word-limit/>
        </a-form-item>
        <a-button type="primary" status="danger" shape="round" html-type="submit">提问</a-button>
      </a-form>
    </cqut-modal>

    <cqut-modal v-model="visibleComment">
      <!-- 评论 -->
      <a-form :model="commentForm" layout="vertical" @submit="onAskFormSubmit">
        <a-form-item label="评论内容" field="content">
          <a-textarea v-model="commentForm.content"
                      :auto-size="{minRows: 5, maxRows: 5}"
                      :max-length="200" allow-clear show-word-limit/>
        </a-form-item>
        <a-button type="primary" status="danger"
                  :loading="modalLoading"
                  @click="onPublishCommentButtonClick"
                  shape="round" html-type="submit">评论</a-button>
      </a-form>
    </cqut-modal>

    <cqut-modal v-model="visibleReply">
      <a-comment
          class="reply-comment"
          :author="replyComment.nickName"
          :datetime="replyComment.date">
        <template #content>
          <h2 v-if="replyMode === 1">
            提问标题
          </h2>
          <p>{{replyComment.content}}</p>
        </template>
        <template #avatar>
          <a-avatar v-if="replyComment.avatar == null">
            <icon-user/>
          </a-avatar>
          <a-avatar v-else>
            <img :src="replyComment.avatar" alt="avatar">
          </a-avatar>
        </template>
      </a-comment>

      <a-form :model="replyForm" class="mt-20"
              layout="vertical" @submit="onReplyFromSubmit">
        <a-form-item label="回复内容" field="content" :rules="[
            {required:true ,message:'回复内容为必填信息'}
            ]">
          <a-textarea v-model="replyForm.content"
                      :auto-size="{minRows: 5, maxRows: 5}"
                      :max-length="200" allow-clear show-word-limit/>
        </a-form-item>
        <a-button type="primary" status="danger" shape="round" html-type="submit" :loading="modalLoading">回复</a-button>
      </a-form>
    </cqut-modal>


  </div>
</template>

<script setup lang="ts">
import {defineComponent, inject, onMounted, PropType, Ref, ref} from "vue";
import {IModelCourseNav} from "@/view/Course/view/CourseVideo/component/course-video-bottom/model";
import {Message} from "@arco-design/web-vue";
import CqutModal from "@/components/cqut-modal/index.vue";
import {ValidatedError} from "@arco-design/web-vue/es/form/interface";
import Card from "@/components/card/index.vue";
import {commentCourseRequest, publishCommentCourseRequest, queryCourseFileRequest} from "@/api/course";
import {IModelCommentCourseRequest, IModelCommentCourseResp, IModelCourseFileResp} from "@/api/course/model";
import {BasePageRes, BasePagination, BaseParams} from "@/api/model";
import useUserStore from "@/store/user";
import {storeToRefs} from "pinia";
import user from "@/store/user";

// 依赖注入变量
const visibleAsk = inject('visibleAskProvide', ref(false));
const visibleComment = inject('visibleCommentProvide', ref(false));
const visibleReply = ref(false);

const component = defineComponent({
  name: 'CourseVideoBottom'
});
const userStore = storeToRefs(useUserStore());

const props = defineProps({
  courseId: Number as PropType<number>
})

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
    name: '资料',
    index: 2
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

// 资料

const docNavIndex = ref(0);
const docNavConfig = [{title: '课程资料', index: 0}, {title: '知识点资料', index: 1}];
const onDocNavClick = (index: number) => {
  docNavIndex.value = index;
}


// 点赞

const good = ref(false);
const onGoodClick = () => {
  good.value = !good.value;
}


console.log(visibleAsk)


// 发布模态框
const visiblePublish = ref(false);
const onCommentClick = () => {
  visiblePublish.value = false;
  visibleComment.value = true
}

const onAskClick = () => {
  visiblePublish.value = false;
  visibleAsk.value = true;
}

// 评论

const commentForm = ref<IModelCommentCourseRequest>({
  userId: userStore.id.value,
  courseId: props.courseId,
  content: '',
})

const onPublishCommentButtonClick = ()=>{
  fetchPublishCommentCourse();
}


// 问答
const askForm = ref({
  title: '',
  content: ''
});
const onAskFormSubmit = (record: Record<string, ValidatedError>) => {
  console.log(record)
}


// 回复
const modalLoading = ref(false);  // 模态框loading动画
const replyMode = ref(0);         // 0为评论，1为问答
const replyForm = ref<IModelCommentCourseRequest>({
  userId: userStore.id.value,
  courseId: props.courseId,
  content: '',
  parentId: null,
});
const replyComment = ref<Partial<IModelCommentCourseResp>>({})
// 回复按钮提交
const onReplyFromSubmit = async ({values, errors}) => {
  if (!errors){
    // 验证通过
    modalLoading.value = true;  // 开启加载中动画
    try {
      const {code,data} = await publishCommentCourseRequest({...values});
      if (code === 200){
        Message.success("回复成功");
        // 清空数据
        replyForm.value.content = '';
        replyForm.value.parentId = null;
        // 重新加载评论列表
        await fetchCommentCourse({page: commentPagination.value.page, size: commentPagination.value.size});
        // 关闭评论模态框
        visibleReply.value = false;
      }
    }finally {
      modalLoading.value = false;
    }
  }
}
const openReplyModal = (type: number, replyItem: IModelCommentCourseResp) => {
  replyMode.value = type;
  console.log(replyItem);
  replyComment.value = {
    ...replyItem
  };
  replyForm.value.parentId = replyItem.id;

  visibleReply.value = true;
}

// 发布评论
const fetchPublishCommentCourse = async ()=>{
  modalLoading.value = true;
  try {
    const {code,data} = await publishCommentCourseRequest(commentForm.value);
    if (code === 200){
      Message.success("发表评论成功");
      // 关闭评论模态框
      visibleComment.value = false;
      // 清空评论数据
      commentForm.value = {
        userId: userStore.id.value,
        courseId: props.courseId,
        content: '',
        parentId: null,
      };
      await fetchCommentCourse({page: commentPagination.value.page, size: commentPagination.value.size}); // 重新加载列表数据
    }
  } finally {
    modalLoading.value = false;
  }
}


// 请求课程评论
const commentLoading = ref(false);
const commentData = ref<IModelCommentCourseResp[]>([])
const commentPagination = ref<BasePagination>({
  page: 0,
  size: 10,
  total: 0
})
const fetchCommentCourse = async (params: BaseParams = {page: 1, size: 10}) => {
  commentLoading.value = true;
  try {
    const {data} = await commentCourseRequest(props.courseId, params)
    commentData.value = data.list;
    commentPagination.value = {
      page: data.pageNum,
      size: data.pageSize,
      total: data.total
    }

  } finally {
    commentLoading.value = false;
  }
}
fetchCommentCourse();

// 分页
const onCommentChange = (page: number)=>{

  fetchCommentCourse({page, size: commentPagination.value.size});
}

// 课程文件
const courseFilePagination = ref<BasePagination>({
  page: 1,
  size: 10,
  total: 0,
})
const courseFileLoading = ref(false);
const courseFileData = ref<IModelCourseFileResp[]>([]);
const fetchCourseFile = async (params: BaseParams = {page: 1, size: 10})=>{
  courseFileLoading.value = true;
  try {
    const {code,data} =  await queryCourseFileRequest(params, props.courseId)
    // 设置分页对象
    courseFilePagination.value = {
      page: data.pageNum,
      size: data.pageSize,
      total: data.total
    }
    // 存入data
    courseFileData.value = data.list;
  } finally {
    courseFileLoading.value = false;
  }
}
const onCourseFilePageChange = (page: number)=>{
  fetchCourseFile({page, size: courseFilePagination.value.size});
}
fetchCourseFile();


</script>

<style lang="scss" scoped>
.doc-nav {
  width: 100%;

  ul {
    padding: 10px 20px;
  }

  li {
    position: relative;
    margin-right: 40px;
    line-height: 40px;
    padding: 4px 10px;
    cursor: pointer;
    font-weight: 700;
    font-size: 17px;
    border-radius: 4px;
    transition: .2s ease-in-out;
    -webkit-transition: .2s ease-in-out;

    &:not(.active):hover {
      background-color: rgba(137, 137, 137, .1);
    }

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
    margin-right: 15px;
    cursor: pointer;
    user-select: none;
    -webkit-user-select: none;

    &.reply {
      transition: .15s ease-in-out;
      -webkit-transition: .15s ease-in-out;

      &:hover {
        color: #f20d0d;
      }
    }
  }
}

.modal-close {
  cursor: pointer;
  transition: .15s ease-in-out;

  &:hover {
    color: #f20d0d;
  }
}

.nav-content-panel {
  padding: 10px 50px;
}

.reply-comment {
  margin-top: 50px;
  text-align: start;
  padding: 10px;
  border: 1px dashed #eee;
  border-radius: 4px;
}

::v-deep(.course-bottom-container) {
  .arco-list-item {
    transition: .2s linear;
    -webkit-transition: .2s linear;

    &:hover {
      //background-color: var(--color-neutral-3);
      background-color: rgba(137, 137, 137, .1);
    }
  }
}

::v-deep(.arco-comment-inner-comment, .arco-comment:not(:first-of-type)){
  margin-top: 0;
}

.reply-pre{
  letter-spacing: 1px;
  color: #8a8a8a;
}
</style>
