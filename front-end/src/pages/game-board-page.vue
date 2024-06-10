<script setup lang="ts">
import {useBetProcessor} from "../composables/useBetProcessor.ts";
import BetChoiceType from "../components/BetChoiceType.vue";
import {
  ColorAndNumberParityBetStrategy,
  ColorBetStrategy, IColorAndNumberParityBet, IColorBet, ISpecificColorAndNumberBet,
  SpecificColorAndNumberBetStrategy
} from "../models/data";
import {computed, inject, onBeforeMount, Ref, ref} from "vue";
import {BetService} from "../services/BetService.ts";
import { IBetResult } from "../models/apis/res";
import ColorBetDialog from "../components/ColorBetDialog.vue";
import WinLooseDialog from "../components/WinLooseDialog.vue";
import SpecColorAndNumberDialog from "../components/SpecColorAndNumberDialog.vue";
import ColorAndParityBetDialog from "../components/ColorAndParityBetDialog.vue";
import {IUserAccount} from "../models";
import {useRouter} from "vue-router";
import {UserAccountService} from "../services/UserAccountService.ts";
import {colorLetterMapper, name2IconTextMapper} from "../utils";

const { initialAmountBet, onResetInitialAmountBet } = inject("initialAmountBet") as { initialAmountBet: Readonly<Ref<number>>, onResetInitialAmountBet(): void }
const { currentUser, onResetCurrentUser} = inject('currentUser') as {currentUser: Readonly<Ref<IUserAccount>>, onResetCurrentUser(): void}
const router = useRouter()
onBeforeMount(() => {

  if(currentUser.value.name.length == 0) router.push('/game-init')
})
const betService = new BetService()
const userAccountService = new UserAccountService()

const colorBetDialogRef = ref<{dialog: HTMLDialogElement}>()
const specColorAndNumberBetDialogRef = ref<{dialog: HTMLDialogElement}>()
const colorAndNumberParityBetDialogRef = ref<{dialog: HTMLDialogElement}>()
const winLoseDialogRef = ref<{dialog: HTMLDialogElement}>()


const betAmount = ref(initialAmountBet.value)
const betChoiceTypeId = ref<string>()
const betResult = ref<IBetResult>()
const { color: colorChosen, number: numberChosen, isEven: parityChosen, remainingAmount, latestResult, setStrategy, getBetResultAmount } = useBetProcessor(currentUser.value.remainingAmount)
const isProcessingBet = ref(false)
const isSavingParty = ref(false)

/**
 * For style
 */
const iconText = name2IconTextMapper(currentUser.value.name)
const colorMap = computed(() => colorLetterMapper(currentUser.value.name))

/*
Functions
* */
const openColorBetDialog = (id: string) => {
  betChoiceTypeId.value = id
  colorBetDialogRef.value?.dialog.showModal()
}
const openSpecColorAndNumberBetDialog = (id: string) => {
  betChoiceTypeId.value = id
  specColorAndNumberBetDialogRef.value?.dialog.showModal()
}
const openColorAndNumberParityBetDialog = (id: string) => {
  betChoiceTypeId.value = id
  colorAndNumberParityBetDialogRef.value?.dialog.showModal()
}

const onColorBetChosen = (bet: IColorBet) => {
  colorChosen.value = bet.color
  colorBetDialogRef.value?.dialog.close()
}
const onSpecColorAndNumberBetChosen = (bet: ISpecificColorAndNumberBet) => {
  colorChosen.value = bet.color
  numberChosen.value = bet.number
  specColorAndNumberBetDialogRef.value?.dialog.close()
}

const onColorAndNumberParityBetChosen = (bet: IColorAndNumberParityBet) => {
  colorChosen.value = bet.color
  parityChosen.value = bet.isEven
  colorAndNumberParityBetDialogRef.value?.dialog.close()
}




const handleBetPlacement = async () => {
  try{
    isProcessingBet.value = true
    if(betAmount.value == 0) {
      alert("You can't bet anymore !")
      return
    }
    if(!betChoiceTypeId.value){
      alert("Please select one of the bet type to continue !")
      return;
    }
    switch (betChoiceTypeId.value){
      case 'oneColor':
        setStrategy(new ColorBetStrategy({color: colorChosen.value!}, betAmount.value))
        break
      case 'specColorAndNumber':
        setStrategy(new SpecificColorAndNumberBetStrategy({color: colorChosen.value!, number: numberChosen.value!}, betAmount.value))
        break
      case 'colorAndNumberParity':
        setStrategy(new ColorAndNumberParityBetStrategy({color: colorChosen.value!, isEven: parityChosen.value!}, betAmount.value))
        break
      default:
        throw new Error("Unknown bet type")
    }

    betResult.value = await betService.getBetResult()
    getBetResultAmount(betResult.value)
    winLoseDialogRef.value?.dialog.showModal()
  }
  finally {
    isProcessingBet.value = false
  }

}

const onSaveParty = async () => {
  try{
    isSavingParty.value = true
    await userAccountService.save({name: currentUser.value.name, remainingAmount: remainingAmount.value})
    alert("Your game party has been saved")
  }
  catch(err){
    alert("An unexpected error occurs during the saving of your game ! Try again later... ")
  }
  finally {
    isSavingParty.value = false

  }
}
const onResetGame = () => {
  betAmount.value = 0
  betChoiceTypeId.value = undefined
  betResult.value = undefined
  colorChosen.value = undefined
  numberChosen.value = undefined
  parityChosen.value = undefined
}

const onLeaveParty = async () => {
  await router.push('/game-init')
  onResetCurrentUser()
  onResetInitialAmountBet()
}

</script>

<template>
  <div class="h-screen flex justify-center">

    <div class="flex flex-col self-start p-4 mt-16 w-[450px] bg-slate-100 rounded-xl">
      <div class="flex justify-between items-center">
        <div class="flex items-center gap-2">
          <span :class="Object.values(colorMap)" class="uppercase w-[32px] h-[32px] rounded-full flex items-center justify-center font-semibold text-xs">
            {{ iconText }}
          </span>
          <span class="text-sm font-semibold capitalize">{{ currentUser.name }}</span>
        </div>
        <div class="flex gap-3">
          <button @click="onSaveParty" :disabled="isSavingParty" class="btn btn-primary">Save</button>
          <button @click="onLeaveParty" :disabled="isSavingParty" class="btn btn-outline">Leave</button>
        </div>
      </div>
      <hr class="my-3">
      <section id="bet-result" class="flex flex-col rounded-xl bg-slate-300 p-4 shadow-lg">
        <h3 class="text-sm text-slate-600 font-semibold">Result</h3>
        <div v-if="!betResult && isProcessingBet" class="flex items-center justify-center p-8">
          <span class="loader-spinner"></span>
        </div>
        <div class="flex justify-center items-center gap-4" v-if="betResult">
          <div class="flex flex-col items-center justify-center gap-2">
            <div class="rounded-full w-[50px] h-[50px] flex items-center justify-center text-xl font-mono font-bold shadow-xl" :class="`${betResult.color == 'Black' ? 'bg-slate-800': `bg-red-600`} text-slate-50`">
            </div>
            <span class="text-sm font-bold">Color ({{ betResult.color }})</span>
          </div>
          <hr class="w-[1px] bg-slate-400 opacity-80 border-slate-400 h-[50px]">
          <div class="flex flex-col items-center justify-center gap-2">
            <div class="rounded-full w-[50px] h-[50px] flex items-center justify-center text-xl  font-bold shadow-xl" :class="`bg-white text-slate-700`">
              {{ betResult.number }}
            </div>
            <span class="text-sm font-bold">Number ({{ betResult.number % 2 == 0 ? 'Even' : 'Odd' }})</span>
          </div>
        </div>

      </section>

      <section id="bet-choices" class="mt-4">
        <h3 class="text-md font-semibold">Which type of bet will you <br> want to made ?</h3>
        <div class="grid grid-cols-3 gap-3 mt-4">
          <BetChoiceType :is-selected="betChoiceTypeId == 'oneColor'" @click="openColorBetDialog('oneColor')" id="oneColor" class="text-sm font-semibold">
            One color
          </BetChoiceType>
          <BetChoiceType :is-selected="betChoiceTypeId == 'specColorAndNumber'" @click="openSpecColorAndNumberBetDialog('specColorAndNumber')" id="specColorAndNumber" class="text-sm font-semibold grid grid-rows-[1fr_auto_1fr]">
            <span class="flex items-center justify-center">One <br> color</span>
            <hr class="my-1">
            <span class="flex items-center justify-center">One <br> number</span>
          </BetChoiceType>
          <BetChoiceType :is-selected="betChoiceTypeId == 'colorAndNumberParity'" @click="openColorAndNumberParityBetDialog('colorAndNumberParity')" id="colorAndNumberParity" class="text-sm font-semibold grid grid-rows-[1fr_auto_1fr]">
            <span class="flex items-center justify-center">One <br> color</span>
            <hr class="my-1">
            <span class="flex items-center justify-center">Number <br> Parity</span>
          </BetChoiceType>
        </div>
      </section>

      <section id="bet-amount" class="mt-4">
        <h3 class="text-md font-semibold">How much do you want <br> to bet?</h3>
        <div class="border rounded-lg py-2 grid grid-cols-[1fr_2fr_1fr]">
          <div class="flex flex-col justify-center px-2">
            <span class="text-sm font-medium text-slate-600">Remaining amount</span>
            <span>{{ remainingAmount }}</span>
          </div>
          <div class="flex flex-col justify-center border-l border-r px-2 ">
            <input type="range" min="0" step="2" :max="remainingAmount!" v-model="betAmount" />
          </div>
          <div class="flex flex-col justify-center px-2">
            <span class="text-sm font-medium text-slate-600">Bet amount</span>
            <span>{{ betAmount }}</span>
          </div>
        </div>
      </section>

      <button @click="handleBetPlacement" class="mt-3 px-3 py-4 text-slate-100 bg-slate-700 hover:bg-slate-800 rounded-xl">Place the bet</button>
    </div>
  </div>

  <ColorBetDialog @choose="onColorBetChosen" ref="colorBetDialogRef"></ColorBetDialog>
  <SpecColorAndNumberDialog @choose="onSpecColorAndNumberBetChosen" ref="specColorAndNumberBetDialogRef"></SpecColorAndNumberDialog>
  <ColorAndParityBetDialog @choose="onColorAndNumberParityBetChosen" ref="colorAndNumberParityBetDialogRef"></ColorAndParityBetDialog>
  <WinLooseDialog @close="onResetGame" ref="winLoseDialogRef" :result="latestResult"/>
</template>

<style scoped>

</style>
