<template>
  <a-row :gutter="10" class="rank-item">
    <a-col :span="4">
      <a-avatar :size="36">
        <img :src="avatar" alt="Avatar Image" v-if="avatar">
        <img src="https://www.imsle.com/seale.jpg" alt="Avatar Image" v-else>
      </a-avatar>
    </a-col>
    <a-col :span="16">
      <h4 class="title">{{ nickName }}</h4>
      <p class="desc">{{desc}}</p>
    </a-col>
    <a-col :span="4">
      <span class="rank">{{rank}}</span>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import {defineComponent} from "vue";

const component = defineComponent({
  name: 'RankItem'
});

defineProps({
  avatar: String,
  nickName: String,
  desc: String,
  rank: Number
})
</script>

<style lang="scss" scoped>
.rank-item{
  margin: 20px 0;
  &:first-child{
    margin-top: 0;
  }
  &:last-child{
    margin-bottom: 0;
  }

  .rank{
    user-select: none;
    cursor: default;
    font-size: 2rem;
    font-weight: 500;
    color: rgba(0,0,0,.3);
  }
}
.title {
  font-weight: 400;
  font-size: 14px;
}

.desc {
  font-size: 13px;
  color: rgba(0, 0, 0, .45);
}

.desc, .title {
  padding: 3px 0;
}
</style>
