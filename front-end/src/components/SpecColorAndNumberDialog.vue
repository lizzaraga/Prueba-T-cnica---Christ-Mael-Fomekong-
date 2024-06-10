<script setup lang="ts">
import {ref} from "vue";
import {EColor, ISpecificColorAndNumberBet} from "../models/data";

const dialog = ref<HTMLDialogElement>()
defineEmits<{
  (ev: 'choose', p: ISpecificColorAndNumberBet): void
}>()
defineExpose({ dialog })

const color = ref<EColor>()
const number = ref<number>(0)
const colors = [ EColor.Red, EColor.Black ]
</script>

<template>
  <dialog class="rounded-xl" ref="dialog" id="colorBetDialog">
    <form @submit.prevent class="flex flex-col p-4 w-[350px] rounded-xl">
      <h2 class="text-lg font-semibold">Bet on one color and number</h2>
      <hr class="my-3">

      <div class="flex flex-col">
        <label for="betColor" class="text-sm font-semibold">Select a color</label>
        <select name="betColor" id="betColor" v-model="color">
          <option v-for="c in colors" :key="c" :value="c">{{ c }}</option>
        </select>
      </div>

      <div class="flex flex-col mt-3">
        <label for="betNumber" class="text-sm font-semibold">Select a number</label>
        <div class="grid grid-cols-[1fr_auto] items-center gap-3">
          <input type="range" min="0" max="36" step="1" name="betNumber" id="betNumber" v-model="number">
          <span class="h-[25px] w-[25px] rounded-full bg-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center">
            {{ number }}
          </span>
        </div>
      </div>

      <div class="flex gap-3 mt-6">
        <button :disabled="!color" @click="$emit('choose', {color: color!, number})" class="px-4 py-2 text-sm font-semibold border rounded-xl text-slate-50 bg-slate-600 hover:bg-slate-700">Confirm</button>
        <button @click="dialog?.close()" class="px-4 py-2 text-sm font-semibold border rounded-xl">Cancel</button>
      </div>
    </form>
  </dialog>
</template>

<style scoped>

</style>
