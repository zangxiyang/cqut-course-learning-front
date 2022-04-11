<template>
  <header id="cqut-header">
    <div class="header-container maxer-container w-1280 f-jc-sb al-c">
      <div class="left-container flex al-c">
        <div class="logo mr-20">LOGO</div>
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

      <div class="right">
        <div class="container flex al-c">
          <span class="right-item" @click="clickRegisterLoginModal(0)">登录</span>
          <span style="color: #d9dde1">/</span>
          <span class="right-item" @click="clickRegisterLoginModal(1)">注册</span>
        </div>
      </div>
    </div>
  </header>
  <a-modal v-model:visible="visible"
           simple hide-cancel closable :maskClosable="false">
    <template #title>
      <div class="modal-header flex al-c">
        <div class="modal-header-item" :class="{'active': modalClickIndex === 0}" @click="modalClickIndex = 0">账号登录
        </div>
        <div class="modal-header-item ml-30" :class="{'active': modalClickIndex === 1}" @click="modalClickIndex = 1">
          快速注册
        </div>
        <div class="close flex al-c" @click="handleClose">
          <icon-close/>
        </div>
      </div>
    </template>
    <template #footer>
      登录/注册即代表同意课程学习平台<a href="JavaScript:" style="color: #1a66ff">《隐私政策》</a>
    </template>
    <div class="content">
      <template v-if="modalClickIndex === 0">
        <a-form :model="modalLoginForm" layout="vertical" class="modal-form">
          <a-form-item field="userName">
            <a-input v-model="modalLoginForm.userName" placeholder="请输入用户名" allow-clear/>
          </a-form-item>
          <a-form-item field="passWord">
            <a-input-password v-model="modalLoginForm.passWord" placeholder="请输入密码" allow-clear/>
          </a-form-item>
          <a-button type="primary" status="danger" shape="round" long>登录</a-button>
        </a-form>
      </template>
      <template v-if="modalClickIndex === 1">
        <a-form :model="modalRegisterForm" layout="vertical" class="modal-form" @submit="handleRegister">
          <a-form-item field="userName"
                       label="账号"
                       :validate-trigger="['change','input']"
                       :rules="[{required: true, message:'用户名不能为空'},
                       {minLength: 4, message: '用户名最短不能低于4个字符'}]">
            <a-input v-model="modalRegisterForm.userName" placeholder="请输入用户名" allow-clear/>
          </a-form-item>
          <a-form-item field="passWord"
                       label="密码"
                       :rules="[{required: true, message:'密码不能为空'},
                       {minLength: 6, message: '密码最短不能低于6个字符'}]"
                       :validate-trigger="['change','input']">
            <a-input-password v-model="modalRegisterForm.passWord" placeholder="请输入密码" allow-clear/>
          </a-form-item>
          <a-form-item field="phone" label="手机号"
                       :rules="[{required: true, message:'手机号不能为空'},
                       {minLength: 11, maxLength:11, message: '请输入11位手机号'}]"
                       :validate-trigger="['change','input']">
            <a-input v-model="modalRegisterForm.phone" placeholder="请输入手机号" allow-clear>
              <template #prepend>
                +86
              </template>
            </a-input>
          </a-form-item>
          <a-form-item field="code" label="验证码"
                       :rules="[{required: true, message:'验证码不能为空'},
                       {minLength: 6, maxLength:6, message: '请输入6位验证码'}]"
                       :validate-trigger="['change','input']">
            <div class="code">
              <a-input
                  type="number"
                  :max-length="6"
                  v-model="modalRegisterForm.code" placeholder="请输入短信验证码" hide-button/>
              <div class="right-send-button flex al-c">
                <span class="send-code-js"
                      v-if="!sendSmsCodeLoading"
                      @click="handleSendSmsCode"
                      :class="{'disabled': sendCodeStatus.status}">
                    {{ sendCodeStatus.text }}
                </span>
                <template v-else>
                  <icon-loading style="color: #f20d0d"/>
                </template>
              </div>
            </div>
          </a-form-item>
          <a-button class="mt-10" html-type="submit"
              type="primary" status="danger" shape="round" long
          :loading="registerLoading">立即注册</a-button>
        </a-form>
      </template>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
import {defineComponent, reactive, ref} from "vue";
import {headerNavConfig} from "@/config";
import {Message} from "@arco-design/web-vue";
import {IModelLoginForm, IModelRegisterForm} from "@/components/header/model";
import {registerRequest, sendSmsCodeRequest} from "@/api/auth";
import _ from "lodash";

const component = defineComponent({
  name: 'CHeader'
});


/**
 * 登录注册模态框
 */
const visible = ref(false);
const modalClickIndex = ref(0);
const clickRegisterLoginModal = (index: number) => {
  modalClickIndex.value = index;
  visible.value = true

}
const handleClose = () => {
  visible.value = false
}
const sendCodeStatus = reactive<{
  text?: string,
  status?: boolean
}>({
  text: '获取验证码',
  status: false
});

const handleSendSmsCode = () => {
  if (!sendCodeStatus.status && modalRegisterForm.phone != undefined) {
    fetchSendSmsCode();
  } else if (modalRegisterForm.phone == undefined) {
    Message.error("手机号不能为空");
  }
}

// 请求加载动画
const sendSmsCodeLoading = ref(false);
// 请求后端接口
const fetchSendSmsCode = async () => {
  // 开始加载动画
  sendSmsCodeLoading.value = true
  try {
    const {code, message} = await sendSmsCodeRequest(modalRegisterForm.phone)
    // 关闭加载动画
    sendSmsCodeLoading.value = false;
    if (code === 200) {
      startCountDown(); //开始倒计时
      Message.success("短信发送成功，请注意查收");
    } else {
      Message.error(`${message}`);
    }
  } catch (e) {
    // 处理错误
    console.log(e);
  }
}

// 倒计时逻辑
const startCountDown = (time: number = 60) => {
  const timeCountDown = () => {
    sendCodeStatus.status = true
    sendCodeStatus.text = `${timeNum}s`
    timeNum--;
  }
  let timeNum = time;
  // 前1s进行初始化
  timeCountDown();
  const countDown = setInterval(() => {
    if (timeNum > 0 && timeNum <= time) {
      // 发送技能还在冷却中
      timeCountDown();
    } else {
      // 发送技能冷却完毕
      sendCodeStatus.status = false;
      sendCodeStatus.text = '获取验证码'
      // 清除定时器
      clearInterval(countDown);
    }
  }, 1000)

}

// 注册逻辑
const registerLoading = ref(false);
const handleRegister = ({values, errors}) => {
  if (!errors){
    const body = values as IModelRegisterForm;
    fetchRegister(body);
  }
}
// 请求这次
const fetchRegister = async (body: IModelRegisterForm)=>{
  registerLoading.value = true
  try {
    const {code,message} = await registerRequest(body);
    if (code === 200){
      Message.success("注册成功");
      // TODO 直接进行登录
      visible.value =false // 关闭模态框
      // 将注册表单清空
      resetRegisterForm();
    } else {
      Message.error(message)
    }
  }catch (e) {

  } finally {
    registerLoading.value = false;
  }
}


const modalLoginForm = reactive<IModelLoginForm>({});

const modalRegisterForm = reactive<IModelRegisterForm>({});

const resetRegisterForm = () => {
  for (let i in modalRegisterForm) delete modalRegisterForm[i]
}

</script>

<style lang="scss" scoped>
@import "../src/assets/scss/core";


.modal-form {
  .code {
    position: relative;
    width: 100%;
    .right-send-button {
      position: absolute;
      right: 15px;
      top: 0;
      height: 100%;
    }

    .send-code-js {
      cursor: pointer;
      color: #1a66ff;

      &:hover {
        color: #19a1e6;
      }

      &.disabled {
        color: #888888;
        cursor: not-allowed;
      }
    }

    ::v-deep(.arco-input) {
      padding-right: 40px;
    }
  }

  ::v-deep(.arco-input-wrapper) {
    padding-top: 5px;
    padding-bottom: 5px;
    font-size: 16px;
    border-radius: 10px;
  }

  ::v-deep(.arco-input-wrapper.arco-input-focus, .arco-input-wrapper:focus-within) {
    border-color: #f20d0d;
  }

  ::v-deep(.arco-btn-primary.arco-btn-status-danger) {
    height: 45px;
    font-size: 17px;
  }

  ::v-deep(.arco-input-outer) {
    .arco-input-prepend {
      border-bottom-left-radius: 10px;
      border-top-left-radius: 10px;
    }

    .arco-input-wrapper {
      border-radius: 0;
      border-bottom-right-radius: 10px;
      border-top-right-radius: 10px;
    }

  }
}

.modal-header {
  .close {
    cursor: pointer;
    position: absolute;
    top: 10px;
    right: 10px;

    &:hover {
      color: #f20d0d;
    }
  }
}

.modal-header-item {
  position: relative;
  font-size: 19px;
  cursor: pointer;
  height: 35px;

  &.active {
    color: #f20d0d;

    &:after {
      content: '';
      cursor: pointer;
      width: 16px;
      height: 4px;
      line-height: 4px;
      background-color: #f20d0d;
      border-radius: 2px;
      display: block;
      margin: 0 auto;
    }
  }
}

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
  }

  .disabled {
    color: #a7a7a7;
    cursor: not-allowed;
  }

  .right {
    font-size: 16px;

    .right-item {
      cursor: pointer;
      height: 71px;
      padding-left: 10px;
      padding-right: 10px;
      @extend .flex, .al-c;

      &:hover {
        color: #c68556;
      }
    }
  }
}
</style>
