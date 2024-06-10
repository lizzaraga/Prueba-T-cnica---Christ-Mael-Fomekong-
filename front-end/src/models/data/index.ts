import {IBetResult} from "../apis/res";


export enum EColor{
    Red = "Red",
    Black = "Black"
}
export interface IBet{

}

export interface IColorBet extends IBet{
    color: EColor
}

export interface ISpecificColorAndNumberBet extends IBet{
    color: EColor,
    number: number
}

export interface IColorAndNumberParityBet extends IBet{
    color: EColor,
    isEven: boolean
}
export declare interface IBetStrategy<B extends IBet, BR extends IBetResult>{
    madeBet: B,
    betAmount: number,
    processBet(betResult: BR): number
}


export class ColorBetStrategy implements IBetStrategy<IColorBet, IBetResult>{
    madeBet: IColorBet;
    betAmount: number;

    constructor(bet: IColorBet, betAmount: number) {
        this.madeBet = bet
        this.betAmount = betAmount
    }
    processBet(betResult: IBetResult): number {
        return betResult.color.toLowerCase() == this.madeBet.color.toLowerCase() ? this.betAmount / 2  : -this.betAmount;
    }
}

export class ColorAndNumberParityBetStrategy implements IBetStrategy<IColorAndNumberParityBet, IBetResult>{
    madeBet: IColorAndNumberParityBet;
    betAmount: number;

    constructor(bet: IColorAndNumberParityBet, betAmount: number) {
        this.madeBet = bet
        this.betAmount = betAmount
    }
    processBet(betResult: IBetResult): number {
        if((betResult.color.toLowerCase() == this.madeBet.color.toLowerCase()) && (this.isNumberEven(betResult.number) == this.madeBet.isEven))
            return this.betAmount
        return -this.betAmount;
    }

    private isNumberEven(number: number) {
        return number % 2 == 0;
    }
}

export class SpecificColorAndNumberBetStrategy implements IBetStrategy<ISpecificColorAndNumberBet, IBetResult>{
    madeBet: ISpecificColorAndNumberBet;
    betAmount: number

    constructor(bet: ISpecificColorAndNumberBet, betAmount: number) {
        this.madeBet = bet
        this.betAmount = betAmount

    }
    processBet(betResult: IBetResult): number {
        if((betResult.color.toLowerCase() == this.madeBet.color.toLowerCase()) && (betResult.number == this.madeBet.number))
            return this.betAmount * 2
        return -this.betAmount;
    }

}

export class BetProcessor<S extends IBetStrategy<B, BR>, B extends IBet, BR extends IBetResult>{
    strategy: S | null = null

    setStrategy(strategy: S) {
        this.strategy = strategy
    }

    processBet(betResult: BR){
        return this.strategy?.processBet(betResult)
    }
}


/*const betProcessor = new BetProcessor()
betProcessor.setStrategy(new ColorBetStrategy({ color: 'Red' }, 500))
betProcessor.processBet({ color: "" })*/
