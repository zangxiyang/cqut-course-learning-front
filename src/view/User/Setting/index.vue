<template>
  <user-card-right-layout title="我的信息" show-title>
    <div class="setting-container animate__animated animate__fadeIn">
      <a-form :model="detail" class="border-bottom-line pb-20">
        <a-form-item field="userName" label="用户名">
          <span class="cur-d" v-if="!loading"> {{ detail.userName }}</span>
          <a-spin :loading="loading" v-if="loading"/>
        </a-form-item>
        <a-form-item field="nickName" label="昵称">
          <a-input v-model="detail.nickName" allow-clear placeholder="加载中..."/>
        </a-form-item>
        <a-form-item field="sex" label="性别">
          <a-select v-model="detail.sex" :loading="loading">
            <a-option :value="0">男</a-option>
            <a-option :value="1">女</a-option>
          </a-select>
        </a-form-item>
        <a-form-item field="class" label="班级信息">
          <a-select v-model="detail.className" :loading="loading" placeholder="暂未设置">
            <a-option value="一班">一班</a-option>
            <a-option value="二班">二班</a-option>
          </a-select>
        </a-form-item>
        <a-form-item field="school" label="学校信息">
          <a-input v-model="detail.school" allow-clear placeholder="暂无"/>
        </a-form-item>
        <a-form-item field="description" label="自我介绍">
          <a-textarea v-model="detail.description" allow-clear placeholder="暂无"/>
        </a-form-item>
      </a-form>
      <div class="mt-20 f-jc-c">
        <a-button type="primary" class="cqut-button large" size="large">保存</a-button>
      </div>
    </div>
  </user-card-right-layout>
</template>

<script setup lang="ts">
import {defineComponent, reactive, ref} from "vue";
import UserCardRightLayout from "@/layout/UserCardRightLayout.vue";
import {IModelUserDetailResp} from "@/api/auth/model";
import {userDetailRequest} from "@/api/auth";
import useUserStore from "@/store/user";

const component = defineComponent({
  name: 'UserSetting'
});

const userStore = useUserStore();
const detail = ref<Partial<IModelUserDetailResp>>({
  sex: 0
});

const loading = ref(true);
const fetchUserDetail = async () => {
  loading.value = true;
  try {
    const {data} = await userDetailRequest(userStore.id)
    detail.value = {...data}
  } catch (e) {
    console.log(e)
  } finally {
    loading.value = false;
  }

}

fetchUserDetail();


</script>

<style lang="scss" scoped>
.setting-container {
  padding-bottom: 50px;
}
</style>
