<template>
  <user-card-right-layout class="animate__animated animate__fadeIn">
    <header class="mt-20">
      <div class="header-container flex al-c">
        <a-avatar :size="72">
          <template #trigger-icon>
            <template v-if="detail.sex === 0">
              <icon-man style="color: #1a66ff"/>
            </template>
            <template v-else>
              <icon-woman style="color: #ff45b9"/>
            </template>
          </template>
          <icon-user/>
        </a-avatar>
        <div class="user-info ml-10">
          <div class="userName flex al-c">
              <span class="name">
                {{ detail.nickName === undefined ? '加载中' : detail.nickName }}
              </span>

            <a-tag>
              <template #icon>
                <icon-user/>
              </template>
              {{ detail.userName === undefined ? '加载中' : detail.userName }}
            </a-tag>
            <a-tag class="ml-10">
              {{ detail.roleName === undefined ? '加载中' : detail.roleName }}
            </a-tag>
          </div>
          <div class="school mt-10 cur-d">
            <template v-if="detail.school === undefined">
              请求中
            </template>
            <template v-else-if="detail.school === null">
              <a href="JavaScript:" @click="$router.push('/user/setting')">
                学校信息暂未设置,点击前往设置
              </a>
            </template>
            <template v-else>
              {{ detail.school }}
            </template>
          </div>
          <div class="className mt-10 cur-d">
            <template v-if="detail.className === undefined">
              请求中
            </template>
            <template v-else-if="detail.className === null">
              <a href="JavaScript:" @click="$router.push('/user/setting')">
                班级信息暂未设置,点击前往设置
              </a>
            </template>
            <template v-else>
              {{ detail.className }}
            </template>
          </div>
        </div>
      </div>
    </header>
    <main>
      <div class="main-container">
        <user-center-section title="每日奖励" title-icon="iconjinbi" :icon-size="40" show-bottom-border>
          <div class="daily-group f-jc-c al-c mt-10">
            <daily-item icon="icongou1"
                        :size="80"
                        show-right-line
                        sub-text="奖励5积分"
                        text="每日登录"/>
            <daily-item icon="icongou1"
                        :size="80"
                        show-right-line
                        sub-text="奖励5积分"
                        text="每日观看视频"/>
            <daily-item show-future/>
          </div>
        </user-center-section>
        <user-center-section class="mt-20" title="账号安全" title-icon="iconzhanghaoanquan" :icon-size="40">
          <a-row :gutter="10" class="mt-10">
            <a-col :span="12">
              <security-item :size="55"
                             icon="iconemail"
                             :status="false"
                             ok-status-text="已绑定"
                             change-button-text="更改邮箱"
                             change-button-router="/user/setting"
                             no-status-text="前往绑定"
                             no-status-router="/user/setting"
                             title="我的邮箱"
                             desc="绑定邮箱以接收一些消息或作为安全邮箱"/>
            </a-col>
            <a-col :span="12">
              <security-item :size="55"
                             icon="iconphone1"
                             status
                             ok-status-text="已设置"
                             change-button-text="更改手机号"
                             change-button-router="/user/setting"
                             no-status-text="前往设置"
                             no-status-router="/user/setting"
                             title="我的手机"
                             desc="绑定手机以接收短信和确保账户安全"/>
            </a-col>
          </a-row>
        </user-center-section>
      </div>
    </main>
  </user-card-right-layout>
</template>

<script setup lang="ts">
import {defineComponent, onBeforeMount, reactive, ref} from "vue";
import UserCardRightLayout from "@/layout/UserCardRightLayout.vue";
import {userDetailRequest} from "@/api/auth";
import useUserStore from "@/store/user";
import {IModelUserDetailResp} from "@/api/auth/model";
import UserCenterSection from "@/components/user-center-section/index.vue";
import DailyItem from "@/components/daily-item/index.vue";
import SecurityItem from "@/components/security-item/index.vue";

const component = defineComponent({
  name: 'UserHome',
});

const userStore = useUserStore();
const detail = ref<Partial<IModelUserDetailResp>>({
  sex: 0,

});

const fetchUserDetail = async () => {
  const {data} = await userDetailRequest(userStore.id)
  detail.value = {...data}
}

fetchUserDetail();


</script>

<style lang="scss" scoped>
.header-container{
  padding-bottom: 30px;
  border-bottom: 1px solid #e5e9ef;
}
.main-container{
  padding: 30px 0;
}
.userName {
  .name {
    max-width: 200px;
    overflow: hidden;
    -webkit-line-clamp: 1;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: rgb(251, 114, 153);
    font-size: 18px;
    font-weight: 700;
    cursor: default;
    margin-right: 8px;
  }
}
</style>
