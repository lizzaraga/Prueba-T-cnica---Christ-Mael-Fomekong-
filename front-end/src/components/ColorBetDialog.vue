<script setup lang="ts">
import {ref} from "vue";
import {EColor, IColorBet} from "../models/data";

const dialog = ref<HTMLDialogElement>()
defineEmits<{
  (ev: 'choose', p: IColorBet): void
}>()
defineExpose({ dialog })

const color = ref<EColor>()
const colors = [ EColor.Red, EColor.Black ]
</script>

<template>
  <dialog class="rounded-xl" ref="dialog" id="colorBetDialog">
    <form @submit.prevent class="flex flex-col p-4 w-[350px] rounded-xl">
      <h2 class="text-lg font-semibold">Bet on color</h2>
      <hr class="my-3">
      <label for="betColor" class="text-sm font-semibold">Select a color</label>
      <select class="text-sm font-semibold" name="betColor" id="betColor" v-model="color">
        <option v-for="c in colors" :key="c" :value="c">{{ c }}</option>
      </select>
      
      <div class="flex gap-3 mt-6">
        <button :disabled="!color" @click="$emit('choose', {color: color!})" class="px-4 py-2 text-sm font-semibold border rounded-xl text-slate-50 bg-slate-600 hover:bg-slate-700">Confirm</button>
        <button @click="dialog?.close()" class="px-4 py-2 text-sm font-semibold border rounded-xl">Cancel</button>
      </div>
    </form>
  </dialog>
</template>

<style scoped>

</style>
