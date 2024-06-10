import {computed, ref} from "vue";
import {BetProcessor, EColor, IBet, IBetStrategy} from "../models/data";
import {IBetResult} from "../models/apis/res";

export function useBetProcessor(initialAmount: number){
    const color = ref<EColor>()
    const number = ref<number>()
    const isEven = ref<boolean>()
    const resultHistory = ref<number[]>([])

    const remainingAmount = computed(() => {
        return initialAmount + resultHistory.value.reduce((acc, cur) => acc + cur, 0)
    })
    const latestResult = computed(() => resultHistory.value[resultHistory.value.length - 1])

    const betProcessor = new BetProcessor()
    const setStrategy = (strategy: IBetStrategy<IBet, IBetResult>) => {
        betProcessor.setStrategy(strategy)
    }
    const getBetResultAmount = (betResult: IBetResult) => {
        const result = betProcessor.processBet(betResult)
        resultHistory.value.push(parseInt(result!+''))
        return result
    }

    return{
        color,
        number,
        isEven,
        remainingAmount,
        resultHistory,
        latestResult,
        setStrategy,
        getBetResultAmount
    }
}
