<template>
  <router-view></router-view>
</template>

<script setup lang="ts">
import {provide, readonly, ref} from "vue";
import {IUserAccount} from "./models";

// This will represent the current player, we provide it in all application
const currentUser = ref<IUserAccount>({name: '', remainingAmount: 0})
const updateCurrentUser = (value: IUserAccount) => currentUser.value = value
const onResetCurrentUser = () => currentUser.value = { name: '', remainingAmount: 0 }

const initialAmountBet = ref(0)
const updateInitialAmountBet = (value: number) => initialAmountBet.value = value
const onResetInitialAmountBet = () => initialAmountBet.value = 0

provide('currentUser', { currentUser: readonly(currentUser), updateCurrentUser, onResetCurrentUser })
provide('initialAmountBet', { initialAmountBet: readonly(initialAmountBet), updateInitialAmountBet, onResetInitialAmountBet})
</script>
