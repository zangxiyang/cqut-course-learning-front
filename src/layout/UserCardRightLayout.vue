<template>
  <div class="user-card-right">
    <div class="right-title flex al-c" v-if="showTitle">
      <div class="right-title-icon"></div>
      <div class="right-title-text ml-5 cur-d">{{ title }}</div>
    </div>
    <div class="user-card-right-warp">
      <slot/>
    </div>
  </div>
</template>

<script setup lang="ts">



const props = defineProps({
  title: String,
  showTitle: {
    type: Boolean,
    default:()=> false
  }
})

</script>

<style lang="scss" scoped>
.user-card-right {
  min-height: 890px;
  background-color: #fff;
  border-left: 1px solid #ddd;

  .right-title {
    user-select: none;
    height: 50px;
    padding-left: 30px;
    border-bottom: 1px solid #dddddd;
  }

  .right-title-icon {
    width: 4px;
    height: 16px;
    background-color: #00a1d6;
    border-radius: 4px;
  }

  .right-title-text {
    color: #00a1d6;
    font-size: 14px;
    cursor: default;
  }

  .user-card-right-warp {
    padding: 20px 30px 0;
    position: relative;
  }

}
</style>
