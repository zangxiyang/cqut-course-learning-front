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
          <a-select v-model="detail.classId"
                    :options="classIdOptions"
                    @focus="fetchClassList"
                    :loading="loading" placeholder="暂未设置"/>
        </a-form-item>
        <a-form-item field="school" label="学校信息">
          <a-input v-model="detail.school" allow-clear placeholder="暂无"/>
        </a-form-item>
        <a-form-item field="description" label="自我介绍">
          <a-textarea v-model="detail.description" allow-clear placeholder="暂无"/>
        </a-form-item>
      </a-form>
      <div class="mt-20 f-jc-c">
        <a-button type="primary" class="cqut-button large"
                  @click="fetchUpdateUserDetail"
                  size="large" :loading="updateLoading">保存</a-button>
      </div>
    </div>
  </user-card-right-layout>
</template>

<script setup lang="ts">
import {computed, defineComponent, reactive, ref} from "vue";
import UserCardRightLayout from "@/layout/UserCardRightLayout.vue";
import {IModelUserDetailResp} from "@/api/auth/model";
import {updateUserDetailRequest, userDetailRequest} from "@/api/auth";
import useUserStore from "@/store/user";
import {classListRequest} from "@/api/course";
import {IModelClassResp} from "@/api/course/model";
import {IModelSelectListItem} from "@/view/Course/component/select-list/model";
import {Option} from "@arco-design/web-vue/es/select/interface";
import {Message} from "@arco-design/web-vue";

const component = defineComponent({
  name: 'UserSetting'
});

const userStore = useUserStore();
const detail = ref<Partial<IModelUserDetailResp>>({
  sex: 0,
  description: null,
  nickName: null,
  school: null,

});

const loading = ref(true);
const user = useUserStore();
const fetchUserDetail = async () => {
  loading.value = true;
  try {
    const {data} = await userDetailRequest(userStore.id)
    detail.value = {...data}
    user.setInfo({...data});
    if (classIdOptions.value.length === 0){
      classListData.value.push({
        className: detail.value.className,
        id: detail.value.classId
      })
    }
  } catch (e) {
    console.log(e)
  } finally {
    loading.value = false;
  }

}

fetchUserDetail();


// 班级
const classListData = ref<Partial<IModelClassResp>[]>([]);
const classIdOptions = computed<Option[]>(() => {
  return classListData.value.map((value) => {
    return {
      label: value.className,
      value: value.id,
    };
  });
});
const classLoading = ref<boolean>(false);
const fetchClassList = async () => {
  classLoading.value = true;
  try {
    const { data } = await classListRequest();
    classListData.value = data;
  } catch (err) {

  } finally {
    classLoading.value = false;
  }
};

// 保存用户信息
const updateLoading = ref(false);
const fetchUpdateUserDetail = async ()=>{
  updateLoading.value = true;
  try {
    await updateUserDetailRequest({
      userId: detail.value.id,
      ...detail.value
    });
    Message.success("更新信息成功");
  } finally {
    updateLoading.value = false;
  }
}

</script>

<style lang="scss" scoped>
.setting-container {
  padding-bottom: 50px;
}
</style>
