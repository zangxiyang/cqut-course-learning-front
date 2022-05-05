<template>
  <a-modal :visible="modelValue" simple hide-cancel>
    <template #title>
      <div class="f-jc-sb w-full">
        <div class="empty"></div>
        <icon-close class="modal-close" @click="$emit('update:modelValue', false)"/>
      </div>
    </template>
    <template #footer>
      <div class="wrapper">
        <slot/>
      </div>
    </template>
  </a-modal>
</template>

<script setup lang="ts">
import {defineComponent, PropType} from "vue";

const component = defineComponent({
  name: 'CqutModal'
});

const props = defineProps({
  modelValue: Boolean as PropType<boolean>
});


const emits = defineEmits<{
  (e: 'update:modelValue', visible: boolean)
}>()


</script>

<style lang="scss" scoped>
.modal-close{
  cursor: pointer;
  transition: .15s ease-in-out;
  &:hover{
    color: #f20d0d;
  }
}
.wrapper{
  margin-top: -30px;
}
</style>
