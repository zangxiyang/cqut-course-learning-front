<template>
<user-card-right-layout show-title title="我的课程">
  我的课程
</user-card-right-layout>
</template>

<script setup lang="ts">
import {defineComponent} from "vue";
import UserCardRightLayout from "@/layout/UserCardRightLayout.vue";

const component = defineComponent({
  name: 'UserCourse'
});
</script>

<style scoped>

</style>
