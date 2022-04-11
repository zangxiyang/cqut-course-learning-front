<script setup lang="ts">
import {ref, watch} from "vue";
import {useRoute} from "vue-router";

const cacheList = ref([]);
const route = useRoute();
watch(() => route,
    (newVal, oldVal) => {
    if (!newVal.meta.ignoreCache && cacheList.value.indexOf(newVal.name) === -1){
      cacheList.value.push(newVal.name);
      console.log(cacheList.value);
    }
    },
    {deep: true})
</script>

<template>
  <router-view v-slot="{Component}">
    <keep-alive :include="cacheList">
      <component :is="Component"/>
    </keep-alive>
  </router-view>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: #42b983;
}
</style>
