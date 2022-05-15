<script setup lang="ts">
</script>

<template>
  <router-view v-slot="{Component}">
    <keep-alive>
      <component :is="Component" v-if="!$route.meta.ignoreCache" :key="$route.path"/>
    </keep-alive>
    <component :is="Component" :key="$route.path" v-if="$route.meta.ignoreCache || $route.meta.ignoreCache === undefined"/>
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
