<script setup lang="ts">
import {computed, ref} from "vue";

const dialog = ref<HTMLDialogElement>()
defineEmits<{
  (ev: 'choose', payload: {name: string, balance: number, amountBet: number}): void
}>()
defineExpose({ dialog })

const fields = ref({
  name: '',
  balance: 0,
  amountBet: 0
})
const canPlay = computed(() => fields.value.name.length > 0 && fields.value.balance > 0 && fields.value.amountBet > 0)
</script>

<template>
  <dialog class="rounded-xl" ref="dialog" id="newGameDialog">
    <form @submit.prevent class="flex flex-col p-4 w-[350px] rounded-xl">
      <h2 class="text-lg font-semibold">Start a new game</h2>
      <hr class="my-3">
      <div class="flex flex-col mb-3">
        <label class="text-sm font-semibold" for="name">Your name</label>
        <input type="text" name="name" id="name" v-model.trim="fields.name" placeholder="Your name">
      </div>
      <div class="flex flex-col mb-3">
        <label class="text-sm font-semibold" for="balance">Your balance</label>
        <input type="number" name="balance" id="balance" v-model.trim.number="fields.balance" placeholder="Your balance">
      </div>
      <div class="flex flex-col ">
        <label class="text-sm font-semibold" for="amountBet">Initial bet amount</label>
        <div class="grid grid-cols-[1fr_auto] items-center gap-3">
          <input type="range" min="0" step="2" :max="fields.balance" name="amountBet" id="amountBet" v-model.trim.number="fields.amountBet" placeholder="Your initial bet amount">
          <span class="h-[25px] px-3 rounded-full bg-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center">
            {{ fields.amountBet }}
          </span>
        </div>
      </div>
      <div class="flex gap-3 mt-6">
        <button :disabled="!canPlay" @click="$emit('choose', fields)" class="px-4 py-2 text-sm font-semibold border rounded-xl text-slate-50 bg-slate-600 hover:bg-slate-700">Play</button>
        <button @click="dialog?.close()" class="px-4 py-2 text-sm font-semibold border rounded-xl">Cancel</button>
      </div>
    </form>
  </dialog>
</template>

<style scoped>

</style>
