<script setup lang="ts">
import {ref, watch} from "vue";
import {useRoute} from "vue-router";
</script>

<template>
  <router-view v-slot="{Component}">
    <keep-alive>
      <component :is="Component" v-if="!$route.meta.ignoreCache"/>
    </keep-alive>
    <component :is="Component" v-if="$route.meta.ignoreCache || $route.meta.ignoreCache === undefined"/>
  </router-view>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: #f0f2f5;
}
body{
  background-color: #f6f7f8;
}
</style>
