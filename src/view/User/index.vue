<template>
  <default-layout>
    <div class="maxer-container w-1140">
      <div class="user-card">
        <a-row>
          <a-col :span="4">
            <div class="user-card-left">
              <span class="user-card-title">个人中心</span>
              <ul class="left-ul">
                <li class="left-ul-item"
                    :class="{'on': $route.meta.userNavName === 'home'}"
                    @click="$router.push('/user/home')">
                  <icon-font class="item-icon" type="iconshouye1"/>
                  <span class="item-name">
                  首<b style="width: 28px;display: inline-block"></b>页
                </span>
                </li>
                <li class="left-ul-item"
                    @click="$router.push('/user/setting')"
                    :class="{'on': $route.meta.userNavName === 'setting'}">
                  <icon-font class="item-icon" type="iconuser1"/>
                  <span class="item-name">
                  我的信息
                </span>
                </li>
                <li class="left-ul-item"
                    @click="$router.push('/user/course')"
                    :class="{'on': $route.meta.userNavName === 'course'}">
                  <icon-font class="item-icon" type="iconzuopin"/>
                  <span class="item-name">
                  我的课程
                </span>
                </li>
                <li class="left-ul-item"
                    @click="$router.push('/user/message')"
                    :class="{'on': $route.meta.userNavName === 'message'}">
                  <icon-font class="item-icon" type="iconwenda"/>
                  <span class="item-name">
                  我的消息
                </span>
                </li>
              </ul>
            </div>
          </a-col>
          <a-col :span="20">
            <router-view/>
          </a-col>
        </a-row>
      </div>
    </div>
  </default-layout>
</template>

<script setup lang="ts">
import {defineComponent} from "vue";
import DefaultLayout from "@/layout/DefaultLayout.vue";
import {Icon} from "@arco-design/web-vue";
import {baseConfig} from "@/config";

const component = defineComponent({
  name: 'User'
});

const IconFont = Icon.addFromIconFontCn({src: baseConfig.iconfont})






</script>

<style lang="scss" scoped>

.user-card {
  overflow: hidden;
  width: 980px;
  margin: 10px auto 100px;
  border: 1px solid #e1e2e5;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .14);
  background-color: #fafafa;
  border-radius: 4px;


  .user-card-left {
    height: 100%;
    overflow: hidden;

    .left-ul {
      border-bottom: 1px solid #e1e2e5;
    }

    .left-ul-item {
      cursor: pointer;
      height: 48px;
      line-height: 48px;
      display: flex;
      align-items: center;
      user-select: none;

      &.on {
        background-color: #19a1e6;

        .item-name {
          color: #fff;
        }

        .item-icon {
          color: #fff;
        }
      }

      .item-icon {
        vertical-align: middle;
        display: inline-block;
        width: 18px;
        height: 36px;
        margin-left: 16px;
        color: #222;
      }

      .item-name {
        margin-left: 12px;
        font-size: 14px;
        color: #222;
      }
    }
  }

  .user-card-title {
    display: block;
    height: 50px;
    text-align: center;
    line-height: 50px;
    font-size: 16px;
    color: #99a2aa;
    cursor: default;
    border-bottom: 1px solid #e1e2e5;
  }


}
</style>
