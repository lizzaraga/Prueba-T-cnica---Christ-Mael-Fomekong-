<script setup lang="ts">
defineProps<{
  isSelected: boolean
}>()
</script>

<template>
  <button  :class="{ 'text-slate-800 ring-4': isSelected, 'text-slate-500': !isSelected}" class="bet-choice border rounded-md px-2 h-[100px]
  text-slate-500
   ring-slate-600 transition-all">
    <slot/>
  </button>
</template>

<style scoped>

</style>
