<template>
  <header id="cqut-header">
    <div class="header-container maxer-container w-1280 f-jc-sb al-c">
      <div class="left-container flex al-c">
        <div class="logo mr-20">课程学习平台</div>
        <nav class="nav ml-20 flex al-c">
          <div class="nav-item" v-for="item in headerNavConfig" :key="item.title"
               :class="{'disabled': item.path === undefined}">
            <template v-if="item.path !== undefined">
              <router-link :to="item.path">
                {{ item.title }}
              </router-link>
            </template>
            <template v-else>
              <span @click="Message.error('程序猿正在抓紧开发！')">{{ item.title }}</span>
            </template>
          </div>
        </nav>
      </div>
      <header-user/>


    </div>
  </header>

</template>

<script setup lang="ts">
import {computed, defineComponent, reactive, ref} from "vue";
import {headerNavConfig} from "@/config";
import {Message} from "@arco-design/web-vue";
import {IModelLoginForm, IModelRegisterForm} from "@/components/header/model";
import {loginRequest, registerRequest, sendSmsCodeRequest} from "@/api/auth";
import _ from "lodash";
import useUserStore from "@/store/user";
import {mapStores, storeToRefs} from "pinia";
import {setAuthorization} from "@/utils/request";
import {IModelLoginResp} from "@/api/auth/model";
import {UserState} from "@/store/user/types";
import HeaderUser from "@/components/header/components/user/index.vue";

const component = defineComponent({
  name: 'CHeader'
});


</script>

<style lang="scss" scoped>
@import "../src/assets/scss/core";

#cqut-header {
  position: relative;
  box-sizing: border-box;
  background-color: #ffffff;
  min-height: 70px;
  max-height: 71px;
  border-bottom: 1px solid #f3f5f6;
  box-shadow: 0 1px 10px 0 #d9d9d9;

  .header-container {
    height: 71px;
  }

  .nav-item {
    height: 71px;
    margin-left: 20px;
    font-size: 18px;
    @extend .flex, .al-c, .cur-p;
    a{
      height: 100%;
      @extend .flex,.al-c;
    }
  }

  .disabled {
    color: #a7a7a7;
    cursor: not-allowed;
  }
}
</style>
