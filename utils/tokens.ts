export enum ChainId {
  Mainnet = 1,
  Optimism = 10,
  Base = 8453,
}

export const tokenAddresses = {
  [ChainId.Mainnet]: {
    usdc: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    dai: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    weth: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  },
  [ChainId.Optimism]: {
    usdc: "0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85",
    dai: "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1",
    weth: "0x4200000000000000000000000000000000000006",
  },
  [ChainId.Base]: {
    usdc: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    dai: "0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb",
    weth: "0x4200000000000000000000000000000000000006",
  },
};

export const tokens = {
  usdc: {
    name: "USDC",
    decimals: 6,
    src: require("../assets/tokens/usdc.png"),
  },
  dai: {
    name: "DAI",
    decimals: 20,
    src: require("../assets/tokens/dai.png"),
  },
  weth: {
    name: "WETH",
    decimals: 20,
    src: require("../assets/tokens/weth.png"),
  },
};


export type Token = keyof typeof tokens;