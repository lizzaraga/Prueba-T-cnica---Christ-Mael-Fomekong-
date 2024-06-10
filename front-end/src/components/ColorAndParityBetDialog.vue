<script setup lang="ts">
import {ref} from "vue";
import {EColor, IColorAndNumberParityBet} from "../models/data";

const dialog = ref<HTMLDialogElement>()
defineEmits<{
  (ev: 'choose', p: IColorAndNumberParityBet): void
}>()
defineExpose({ dialog })

const color = ref<EColor>()
const isEven = ref<boolean>(false)
const colors = [ EColor.Red, EColor.Black ]
</script>

<template>
  <dialog class="rounded-xl" ref="dialog" id="colorBetDialog">
    <form @submit.prevent class="flex flex-col p-4 w-[350px] rounded-xl">
      <h2 class="text-lg font-semibold">Bet on one color and his parity</h2>
      <hr class="my-3">

      <div class="flex flex-col">
        <label class="text-sm font-semibold" for="betColor">Select a color</label>
        <select name="betColor" id="betColor" v-model="color">
          <option v-for="c in colors" :key="c" :value="c">{{ c }}</option>
        </select>
      </div>

      <div class="flex flex-col mt-3">
        <label class="text-sm font-semibold">Select the parity</label>
        <div class="grid grid-cols-2">
          <div class="flex gap-3">
            <input type="radio" name="betParity" id="even" v-model="isEven" :value="true">
            <label for="even">Is Even</label>
          </div>
          <div class="flex gap-3">
            <input type="radio" name="betParity" id="odd" v-model="isEven" :value="false">
            <label for="odd">Is Odd</label>
          </div>
        </div>
      </div>

      <div class="flex gap-3 mt-6">
        <button :disabled="!color" @click="$emit('choose', {color: color!, isEven})" class="px-4 py-2 text-sm font-semibold border rounded-xl text-slate-50 bg-slate-600 hover:bg-slate-700">Confirm</button>
        <button @click="dialog?.close()" class="px-4 py-2 text-sm font-semibold border rounded-xl">Cancel</button>
      </div>
    </form>
  </dialog>
</template>

<style scoped>

</style>
