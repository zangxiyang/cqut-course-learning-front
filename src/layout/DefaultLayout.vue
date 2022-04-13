<template>
  <c-header/>
  <main class="mt-20 mb-20">
    <slot/>
  </main>
</template>

<script setup lang="ts">
import {defineComponent} from "vue";
import CHeader from "@/components/header/index.vue";

const component = defineComponent({
  name: 'DefaultLayout'
});
</script>

<style scoped>

</style>
