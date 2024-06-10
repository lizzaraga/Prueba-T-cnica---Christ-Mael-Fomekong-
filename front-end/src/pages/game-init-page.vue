<script setup lang="ts">
import ReloadingGameDialog from "../components/ReloadingGameDialog.vue";
import {inject, Ref, ref} from "vue";
import {UserAccountService} from "../services/UserAccountService.ts";
import {IUserAccount} from "../models";
import {useRouter} from "vue-router";
import NewGameDialog from "../components/NewGameDialog.vue";

const { updateCurrentUser } = inject("currentUser") as { updateCurrentUser(user: IUserAccount): void }
const { updateInitialAmountBet } = inject("initialAmountBet") as { updateInitialAmountBet(value: number): void }
const userAccountService = new UserAccountService()
const router = useRouter()
const reloadingGameDialogRef = ref<{dialog: HTMLDialogElement}>()
const newGameDialogRef = ref<{dialog: HTMLDialogElement}>()

const isLoadingUser = ref(false)

const onOpenReloadingGameDialog = () => {
  reloadingGameDialogRef.value?.dialog.showModal()
}
const onOpenNewGameDialog = () => {
  newGameDialogRef.value?.dialog.showModal()
}
const onReloadUserChosenGame = async (name: string) => {
  try {
    isLoadingUser.value = true
    const userAccount = await userAccountService.loadByName(name)
    updateCurrentUser(userAccount)
    router.push('/game-board')
  }catch (err: any) {
    if(err.response.status == 404){
      alert("User does not exist")
    }
    else alert("Unexpected error occurs")
  }
  finally {
    isLoadingUser.value = false
  }
}

const onStartNewGame = ({ name, balance, amountBet }: {name: string, balance: number, amountBet: number}) => {
  updateCurrentUser({name, remainingAmount: balance})
  updateInitialAmountBet(amountBet)
  router.push('/game-board')
}
</script>

<template>
  <div class="h-screen flex flex-col gap-4 items-center justify-center">
    <h2 class="text-2xl font-bold text-slate-600 border-b p-4">
      Roulette Casino
    </h2>
    <div class="flex items-center gap-4">
      <button class="btn btn-primary" @click="onOpenNewGameDialog">New game</button>
      <button class="btn btn-outline" @click="onOpenReloadingGameDialog">Reloading my game</button>
    </div>
  </div>
  <reloading-game-dialog ref="reloadingGameDialogRef" @choose="onReloadUserChosenGame" />
  <new-game-dialog ref="newGameDialogRef" @choose="onStartNewGame"/>

  <div class="loader-backdrop z-20" v-if="isLoadingUser">
    <div class="loader-spinner"></div>
  </div>
</template>

<style scoped>

</style>
