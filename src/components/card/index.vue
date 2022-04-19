<template>
  <div class="c-card">
    <div class="c-card-header" v-if="$slots.header">
      <slot name="header"/>
    </div>
    <main class="c-card-main">
      <slot/>
    </main>
  </div>
</template>

<script setup lang="ts">
import {defineComponent} from "vue";

const component = defineComponent({
  name: 'Card'
});
</script>

<style lang="scss" scoped>
.c-card {
  box-sizing: border-box;
  position: relative;
  border: 1px solid #e5e9ef;
  font-size: 14px;
  list-style: none;
  background: #fff;
  border-radius: 5px;
  .c-card-header{
    border-bottom: 1px solid #e5e9ef;
    padding: 20px 15px 16px;
    font-size: 16px;
  }
  .c-card-main{
    padding: 20px 15px;
  }
}
</style>
