<template>
  <footer class="cqut-footer">
    <div class="maxer-container w-1280">
      <div class="footer-container f-jc-sb al-c">
        <div class="footer-row">
          <div class="footer-row-item">
            <icon-copyright/>
            Copyright 2022-{{ year }} 重庆理工大学 版权所有
          </div>
          <div class="footer-row-item">
            <a href="https://beian.miit.gov.cn/" target="_blank">渝ICP备05001039号-1</a>
          </div>
          <div class="footer-row-item">
            <a href="https://www.beian.gov.cn/portal/registerSystemInfo?recordcode=50011302000163" target="_blank">渝公网安备 50011302000163号</a>
          </div>
        </div>
        <div class="footer-row">
          <div class="footer-row-item">
            <a-tag class="cur-p" size="large" color="#e7e7e7" style="border-radius: 6px">
              <span style="color: #6d6d6d">Powered and Designed by Eendtech.</span>
            </a-tag>
          </div>
        </div>
      </div>

      <div class="footer-container">
        <div class="footer-row">
          <div class="footer-row-item">
            <span class="cur-d"><strong>友情链接</strong></span>
            <a href="https://www.cqut.edu.cn/" target="_blank" class="ml-10">重庆理工大学</a>
            <a href="https://ehall.cqut.edu.cn/" target="_blank" class="ml-10">重庆理工大学办事大厅</a>
            <a href="https://ljxq.cqut.edu.cn/" target="_blank" class="ml-10">重庆理工大学两江校区</a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import {defineComponent} from "vue";

const component = defineComponent({
  name: 'CFooter'
});

const year = new Date().getFullYear().toString();
</script>

<style lang="scss" scoped>
.cqut-footer {
  border-top: 1px solid #efefef;
  position: relative;
  padding: 50px 0;
  background-color: #F6F7F8;
  font-size: 14px;
  color: #6d6d6d;
  a{
    color: #6d6d6d;
    &:hover{
      color: #1a66ff;
    }
  }
}

.footer-row {
  display: flex;
}

.footer-container{
  margin-bottom: 15px;

  &:last-child{
    margin-bottom: 0;
  }
}

.footer-row-item {
  display: flex;
  align-items: center;
  position: relative;
  padding: 0 10px;
  &:first-child{
    padding-left: 0;
    padding-right: 10px;
  }
  &:last-child{
    &:after{
      display: none;
    }
  }
  &:after{
    content: '';
    display: inline-block;
    position: absolute;
    right: 0;
    top: 1px;
    width: 1px;
    height: 13px;
    background-color: #bcbcbc;
  }
}
</style>
