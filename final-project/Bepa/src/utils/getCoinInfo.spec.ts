import {describe, expect, it} from "vitest";
import {CoinName} from "../config";
import {getCoinInfo} from "./getCoinInfo";

describe('getCoinInfo', () => {
    it('should successfully get coin info', async () => {
        // Arrange
        const name = CoinName.BITCOIN;

        // Act
        const result = await getCoinInfo(name);

        // Assert
        expect(result).toBeDefined();
        expect(result.name).toEqual(name)
    })
})
