<template>
  <header class="operation f-jc-r mt-20">
    <a-button type="primary" status="danger" shape="round" size="large"
              @click="visible = true"
              v-permission="checkPermission">发布作业</a-button>
  </header>
  <a-card class="mt-20 mb-20">
    <a-list :loading="loading">
      <a-list-item v-for="item in list" :key="item.id">
        <a-list-item-meta>
          <template #avatar>
            <a-avatar shape="square">
              <icon-bookmark />
            </a-avatar>
          </template>
          <template #title>
            <h3>{{ item.title }}</h3>
          </template>
          <template #description>
            <div class="content">{{ item.content }}</div>
            <div class="file mt-10" v-if="item.fileUrl !== null && item.fileUrl !== ''">
              <a-link :href="item.fileUrl" target="_blank" :hoverable="false">
                <template #icon>
                  <icon-file :size="17"/>
                </template>
                下载附件
              </a-link>
            </div>
          </template>
        </a-list-item-meta>
        <template #extra>
          <span class="notice-date">
            发布于&nbsp;{{ item.date }}
          </span>
          <div class="action f-jc-r mt-10" v-permission="checkPermission">
            <a-popconfirm content="再次确认是否删除?" type="warning"
                          :ok-button-props="{status: 'warning'}"
                          @ok="fetchDelCourseHomeworkRequest(item.id)"
                          okText="删除" cancelText="算了">
              <a-button size="mini" type="primary" status="danger">删除</a-button>
            </a-popconfirm>
          </div>
        </template>
      </a-list-item>

    </a-list>
    <div class="pagination-container mt-20 f-jc-c al-c" v-show="!loading && list.length !== 0">
      <a-pagination :page-size="pagination.size"
                    @change="changePage"
                    :total="pagination.total" :current="pagination.page"/>
    </div>
  </a-card>


    <cqut-modal v-model="visible">
      <a-form :model="form" class="form-modal" @submit="ok" layout="vertical">
        <a-form-item field="title" label="作业标题" :rules="[
            {required:true ,message:'作业标题不能为空'}
            ]">
          <a-input v-model="form.title" placeholder="请填写标题" allow-clear/>
        </a-form-item>
        <a-form-item field="content" label="作业内容" :rules="[
            {required:true ,message:'作业内容不能为空'}
        ]">
          <a-textarea allow-clear v-model="form.content" show-word-limit :max-length="300"/>
        </a-form-item>
        <a-form-item field="fileUrl" label="作业附件">
          <a-upload draggable
                    :data="{
                      userId: id,
                      fileName: `作业附件-${new Date().getTime()}`,
                      fileType: 'homework',
                    }"
                    @success="uploadCallback"
                    :limit="1"
                    :action="action"/>
        </a-form-item>
        <a-button type="primary" status="danger" shape="round" class="mt-10"
                  :loading="modalLoading"
                  html-type="submit">发布作业
        </a-button>
      </a-form>
    </cqut-modal>
</template>

<script setup lang="ts">
import {PropType, ref} from "vue";
import useUserStore from "@/store/user";
import {storeToRefs} from "pinia";
import {useRoute} from "vue-router";
import {IModelHomeworkResp} from "@/api/course/model";
import {BasePagination, BaseParams} from "@/api/model";
import {
  courseHomeworkRequest, delCourseHomeworkRequest,
  queryCourseHomeworkRequest
} from "@/api/course";
import CqutModal from "@/components/cqut-modal/index.vue";
import {Message} from "@arco-design/web-vue";
import {FileItem} from "@arco-design/web-vue/es/upload";

const props = defineProps({
  id: Number as PropType<number>
})

const userStore = useUserStore();
const {role, id} = storeToRefs(userStore);

const loading = ref(false);
const list = ref<IModelHomeworkResp[]>([]);
const pagination = ref<BasePagination>({
  page: 1,
  size: 10,
  total: 0
})
const fetchHomeworkList = async (params: BaseParams = {page: pagination.value.page, size: pagination.value.size}) => {
  loading.value = true;
  try {
    const {data} = await queryCourseHomeworkRequest(params, props.id);
    list.value = data.list;
    pagination.value = {
      page: data.pageNum,
      size: data.pageSize,
      total: data.total
    }
  } finally {
    loading.value = false;
  }
}
fetchHomeworkList()

//  翻页
const changePage = (page: number) => {
  fetchHomeworkList({page, size: pagination.value.size});
}


// 判断是否对该课程有管理权限
const route = useRoute();
const checkPermission = (): boolean => {
  if (role.value === 'admin') {
    return true;
  } else if (role.value === 'teacher') {
    // 如果是教师则判断是否为当前课程的所属教师
    const teacherId = Number(route.query.teacherId);
    if (id?.value === teacherId) {
      // 当前id和课程所属id一致的话
      return true;
    }
  }
  return false;
}


// 模态框
const visible = ref(false);
const form = ref({
  title: '',
  content: '',
  fileUrl: null
})
// 发布通知
const ok = ({values, errors}) => {
  if (!errors) {
    fetchCourseNoticeRequest();
  }

}
const modalLoading = ref(false);
const fetchCourseNoticeRequest = async () => {
  modalLoading.value = true;
  try {
    const {code, message} = await courseHomeworkRequest({
      ...form.value,
      courseId: props.id
    });
    if (code === 200) {
      // 成功
      Message.success(message);
      visible.value = false;
      await fetchHomeworkList();
    }
  } finally {
    modalLoading.value = false;
  }

}

const popLoading = ref(false);
const fetchDelCourseHomeworkRequest = async (id: number)=>{
  popLoading.value = true;
  try {
    const {code,message} = await delCourseHomeworkRequest(id);
    if (code === 200){
      Message.success(message);
      await fetchHomeworkList();
    }
  } finally {
    popLoading.value = false;
  }
}

// 作业附件上传
const action = `${import.meta.env.VITE_APP_BASE_URL}/course-cos/cos/upload/doc`

const uploadCallback = (fileItem: FileItem)=>{
  const resp = fileItem.response;
  if (resp.code === 200){
    Message.success("上传成功");
    form.value.fileUrl = resp.data.url;
  } else {
    Message.error("上传失败");
  }
}

</script>

<style scoped>

</style>
