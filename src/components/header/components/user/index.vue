<template>
  <div class="right">
    <div class="container flex al-c">
      <span class="right-item" @click="clickRegisterLoginModal(0)">登录</span>
      <span style="color: #d9dde1">/</span>
      <span class="right-item" @click="clickRegisterLoginModal(1)">注册</span>
    </div>
  </div>


  <!-- 登录注册模态框 -->
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
        <a-form :model="modalLoginForm" layout="vertical" class="modal-form" @submit="handleLogin">
          <a-form-item field="userName"
                       :validate-trigger="['change','input']"
                       :rules="[{required: true, message:'用户名不能为空'},
                       {minLength: 4, message: '用户名最短不能低于4个字符'}]"
                       label="账号">
            <a-input v-model="modalLoginForm.userName" placeholder="请输入用户名" allow-clear/>
          </a-form-item>
          <a-form-item field="passWord"
                       :validate-trigger="['change','input']"
                       :rules="[{required: true, message:'密码不能为空'},
                       {minLength: 6, message: '密码最短不能低于6个字符'}]"
                       label="密码">
            <a-input-password v-model="modalLoginForm.passWord" placeholder="请输入密码" allow-clear/>
          </a-form-item>
          <a-button type="primary" status="danger" shape="round" long html-type="submit">登录</a-button>
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
                    :loading="registerLoading">立即注册
          </a-button>
        </a-form>
      </template>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
import {defineComponent, reactive, ref} from "vue";
import useUserStore from "@/store/user";
import {Message} from "@arco-design/web-vue";
import {loginRequest, registerRequest, sendSmsCodeRequest} from "@/api/auth";
import {IModelLoginForm, IModelRegisterForm} from "@/components/header/model";
import {setAuthorization} from "@/utils/request";
import {UserState} from "@/store/user/types";

const component = defineComponent({
  name: 'HeaderUser'
});


const userStore = useUserStore();


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
  if (!errors) {
    const body = values as IModelRegisterForm;
    fetchRegister(body);
  }
}
// 请求注册
const fetchRegister = async (body: IModelRegisterForm) => {
  registerLoading.value = true
  try {
    const {code, message} = await registerRequest(body);
    if (code === 200) {
      Message.success("注册成功");
      // TODO 直接进行登录
      visible.value = false // 关闭模态框
      // 将注册表单清空
      resetRegisterForm();
    } else {
      Message.error(message)
    }
  } catch (e) {

  } finally {
    registerLoading.value = false;
  }
}

// 登录逻辑
const loginLoading = ref(false);
const handleLogin = ({values, errors}) => {
  if (!errors) {
    const body = values as IModelLoginForm
    fetchLogin(body);
  }

}
const fetchLogin = async (body: IModelLoginForm) => {
  loginLoading.value = true;  // 开启登录动画
  try {
    const {code, data, message} = await loginRequest(body);
    if (code === 200) {
      // 设置token
      setAuthorization({token: data.token, expireAt: 7})
      userStore.setInfo(data as UserState)
    } else {
      Message.error(message);
    }
  } catch (e) {

  } finally {
    loginLoading.value = false
  }
}


const modalLoginForm = reactive<IModelLoginForm>({});

const modalRegisterForm = reactive<IModelRegisterForm>({});

const resetRegisterForm = () => {
  for (let i in modalRegisterForm) delete modalRegisterForm[i]
}
const resetLoginForm = () => {
  for (let i in modalLoginForm) delete modalLoginForm[i]
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


</style>
