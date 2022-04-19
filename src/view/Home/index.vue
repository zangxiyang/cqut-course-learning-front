<template>
<default-layout>
  <div class="maxer-container w-1280">
    <a-row :gutter="20">
      <a-col :span="17">
        <home-main/>
      </a-col>
      <a-col :span="7">
        <home-right-side/>
      </a-col>
    </a-row>
  </div>
</default-layout>
</template>

<script setup lang="ts">
import {defineComponent} from "vue";
import CHeader from "@/components/header/index.vue";
import DefaultLayout from "@/layout/DefaultLayout.vue";
import useUserStore from "@/store/user";
import {storeToRefs} from "pinia";
import HomeMain from "@/view/Home/component/HomeMain/index.vue";
import HomeRightSide from "@/view/Home/component/HomeRightSide/index.vue";


const component = defineComponent({
  name: 'Home'
});



</script>

<style scoped>

</style>

<style>
body{
  background-color: #f0f2f5;
}
</style>
