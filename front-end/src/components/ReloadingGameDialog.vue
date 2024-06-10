<script setup lang="ts">
import {ref} from "vue";

const dialog = ref<HTMLDialogElement>()
defineEmits<{
  (ev: 'choose', name: string): void
}>()
defineExpose({ dialog })

const name = ref<string>('')
</script>

<template>
  <dialog class="rounded-xl" ref="dialog" id="reloadingGameDialog">
    <form @submit.prevent class="flex flex-col p-4 w-[350px] rounded-xl">
      <h2 class="text-lg font-semibold">Game reloading</h2>
      <hr class="my-3">
      <div class="flex flex-col">
        <label class="text-sm font-semibold" for="name">Your name</label>
        <input type="text" name="name" id="name" v-model.trim="name" placeholder="Your name">
      </div>

      <div class="flex gap-3 mt-6">
        <button :disabled="!name" @click="$emit('choose', name)" class="px-4 py-2 text-sm font-semibold border rounded-xl text-slate-50 bg-slate-600 hover:bg-slate-700">Confirm</button>
        <button @click="dialog?.close()" class="px-4 py-2 text-sm font-semibold border rounded-xl">Cancel</button>
      </div>
    </form>
  </dialog>
</template>

<style scoped>

</style>
