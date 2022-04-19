<template>
<default-layout>
  <div class="maxer-container w-1280">
    测试
  </div>
</default-layout>
</template>

<script setup lang="ts">
import {defineComponent} from "vue";
import CHeader from "@/components/header/index.vue";
import DefaultLayout from "@/layout/DefaultLayout.vue";
import useUserStore from "@/store/user";
import {storeToRefs} from "pinia";


const component = defineComponent({
  name: 'Home'
});



</script>

<style scoped>

</style>
