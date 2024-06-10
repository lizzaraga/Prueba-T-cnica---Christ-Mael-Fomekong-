import {describe, expect, test} from "vitest";
import {
    BetProcessor,
    ColorAndNumberParityBetStrategy,
    ColorBetStrategy,
    EColor,
    SpecificColorAndNumberBetStrategy
} from "../models/data";

describe("BetProcessor", () => {
    let betProcessor = new BetProcessor()

    test("should return the half of the amount bet in case of right color", () => {
        betProcessor.setStrategy(new ColorBetStrategy({ color: EColor.Red }, 500))
        expect(betProcessor.processBet({ color: EColor.Red , number: 10})).toBe(250)
    })
    test("should return the amount bet as the lost amount in case of wrong color", () => {
        betProcessor.setStrategy(new ColorBetStrategy({ color: EColor.Red }, 500))
        expect(betProcessor.processBet({ color: EColor.Black , number: 10})).toBe(-500)
    })

    test("should return the amount bet multiply by 3 as gains in case of right color", () => {
        betProcessor.setStrategy(new SpecificColorAndNumberBetStrategy({ color: EColor.Red, number: 12}, 500))
        expect(betProcessor.processBet({ color: EColor.Red, number: 12 })).toBe(500 * 2)
    })

    test("should return the amount bet  as gain in case of right color and right even number", () => {
        betProcessor.setStrategy(new ColorAndNumberParityBetStrategy({ color: EColor.Red, isEven: true}, 250))
        expect(betProcessor.processBet({ color: EColor.Red, number: 12 })).toBe(250)
    })

    test("should return the amount bet  as gain in case of right color and right even number", () => {
        betProcessor.setStrategy(new ColorAndNumberParityBetStrategy({ color: EColor.Red, isEven: false}, 300))
        expect(betProcessor.processBet({ color: EColor.Red, number: 13 })).toBe(300)
    })

    test("should return the negative amount bet  as loose in case of any wrong between color or number nature", () => {
        betProcessor.setStrategy(new ColorAndNumberParityBetStrategy({ color: EColor.Black, isEven: false}, 300))
        expect(betProcessor.processBet({ color: EColor.Red, number: 13 })).toBe(-300)
    })
})
