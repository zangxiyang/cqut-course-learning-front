<template>
<user-card-right-layout title="我的信息" show-title>
  我的信息
</user-card-right-layout>
</template>

<script setup lang="ts">
import {defineComponent} from "vue";
import UserCardRightLayout from "@/layout/UserCardRightLayout.vue";

const component = defineComponent({
  name: 'UserSetting'
});
</script>

<style scoped>

</style>
