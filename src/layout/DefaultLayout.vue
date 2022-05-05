<template>
  <c-header/>
  <main :class="{'mt-20': noneMargin === false}">
    <slot/>
  </main>
  <c-footer/>
</template>

<script setup lang="ts">
import {defineComponent, PropType} from "vue";
import CHeader from "@/components/header/index.vue";
import CFooter from "@/components/footer/index.vue";

const component = defineComponent({
  name: 'DefaultLayout'
});
defineProps({
  noneMargin: {
    type: Boolean as PropType<boolean>,
    default: false
  }
})
</script>

<style scoped>

</style>
