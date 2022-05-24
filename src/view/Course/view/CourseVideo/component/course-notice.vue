<template>
  <header class="operation f-jc-sb mt-20">
    <div class="empty"></div>
    <a-button type="primary" status="danger" shape="round" size="large"
              @click="visible = true"
              v-permission="['admin','teacher']">发布通知</a-button>
  </header>
  <a-card class="mt-20 mb-20">
    <a-list :loading="loading">
      <a-list-item v-for="item in list" :key="item.id">
        <a-list-item-meta
            :description="item.content">
          <template #avatar>
            <a-avatar shape="square">
              <icon-message/>
            </a-avatar>
          </template>
          <template #title>
            <h3>{{ item.title }}</h3>
          </template>
        </a-list-item-meta>
        <template #extra>
          <span class="notice-date">
            发布于&nbsp;{{item.date}}
          </span>
        </template>
      </a-list-item>

    </a-list>
    <div class="pagination-container mt-20 f-jc-c al-c" v-show="!loading">
      <a-pagination :page-size="pagination.size"
                    @change="changePage"
                    :total="pagination.total" :current="pagination.page"/>
    </div>
  </a-card>


  <cqut-modal v-model="visible">
    <a-form :model="form" class="form-modal" @submit="ok" layout="vertical">
      <a-form-item field="title" label="通知标题" :rules="[
          {required:true ,message:'通知标题不能为空'}
          ]">
        <a-input v-model="form.title" placeholder="请填写标题" allow-clear/>
      </a-form-item>
      <a-form-item field="content" label="通知内容" :rules="[
          {required:true ,message:'通知内容不能为空'}
      ]">
        <a-textarea allow-clear v-model="form.content" show-word-limit :max-length="300"/>
      </a-form-item>
      <a-button type="primary" status="danger" shape="round" class="mt-10"
                :loading="modalLoading"
                html-type="submit">发布通知</a-button>
    </a-form>
  </cqut-modal>




</template>

<script setup lang="ts">

import {defineProps, ref} from "vue";
import {BasePagination, BaseParams} from "@/api/model";
import {courseNoticeRequest, queryCourseNoticeRequest} from "@/api/course";
import {IModelNoticeResp} from "@/api/course/model";
import CqutModal from "@/components/cqut-modal/index.vue";
import {Message} from "@arco-design/web-vue";

const props = defineProps<{
  id: number
}>();

const pagination = ref<BasePagination>({
  page: 1,
  size: 10,
  total: 0
})
const loading = ref(false);
const list = ref<IModelNoticeResp[]>([]);
const fetchNoticeList = async (params: BaseParams = {page: pagination.value.page, size: pagination.value.size})=>{
  loading.value = true;
  try {
    const {data} = await queryCourseNoticeRequest(params, props.id);
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
fetchNoticeList()

//  翻页
const changePage = (page: number) => {
  fetchNoticeList({page, size:pagination.value.size});
}



// 发布通知模态框
const visible = ref(false);
const form = ref({
  title: '',
  content: ''
})
// 发布通知
const ok = ({values, errors}) =>{
  if (!errors){
    fetchCourseNoticeRequest();
  }

}
const modalLoading = ref(false);
const fetchCourseNoticeRequest = async ()=>{
  modalLoading.value = true;
  try {
    const {code,message} = await courseNoticeRequest({
      ...form.value,
      courseId: props.id
    });
    if (code === 200){
      // 成功
      Message.success(message);
      visible.value = false;
      await fetchNoticeList();
    }
  }finally {
    modalLoading.value = false;
  }

}

</script>

<style lang="scss" scoped>
.notice-date{
  font-size: 13px;
  color: #6d6d6d;
}
.form-modal{
  margin-top: 50px;
}
</style>
