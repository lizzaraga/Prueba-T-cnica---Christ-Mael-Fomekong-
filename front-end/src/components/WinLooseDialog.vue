<script setup lang="ts">
import {ref} from "vue";

defineProps<{
  result?: number
}>()

const emit = defineEmits<{
  (ev: 'close'): void
}>()

const dialog = ref<HTMLDialogElement>()

defineExpose({ dialog })

const onCloseDialog = () => {
  emit('close')
  dialog.value?.close()
}

</script>

<template>
  <dialog class="rounded-xl" ref="dialog" id="winLooseDialog" >
    <div class="flex flex-col p-4 w-[350px] rounded-xl" v-if="result != undefined">
      <h2 class="text-lg font-semibold">{{ result > 0 ? 'Winner' : 'Looser' }}</h2>
      <hr class="my-3">

      <p v-html="result > 0 ? `Congratulations ! You have won, your amount will increase by <b>${result}</b>`  : `Unfortunately ! you have lost, your amount will decrease by <b>${Math.abs(result)}</b>`">

      </p>
      <div class="flex gap-3 mt-6">
        <button @click="onCloseDialog" class="px-4 py-2 text-sm font-semibold border rounded-xl text-slate-50 bg-slate-600 hover:bg-slate-700">Ok</button>
      </div>
    </div>
  </dialog>
</template>

<style scoped>

</style>
