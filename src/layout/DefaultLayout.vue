<template>
  <c-header/>
  <main class="mt-20">
    <slot/>
  </main>
  <c-footer/>
</template>

<script setup lang="ts">
import {defineComponent} from "vue";
import CHeader from "@/components/header/index.vue";
import CFooter from "@/components/footer/index.vue";

const component = defineComponent({
  name: 'DefaultLayout'
});
</script>

<style scoped>

</style>
