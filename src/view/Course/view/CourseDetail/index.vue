<template>
  <default-layout>
    课程详情 {{ id }}
  </default-layout>
</template>

<script setup lang="ts">
import {defineComponent} from "vue";
import DefaultLayout from "@/layout/DefaultLayout.vue";

const component = defineComponent({
  name: 'CourseDetail'
});

const props = defineProps({
  id: Number
})
</script>

<style scoped>

</style>
