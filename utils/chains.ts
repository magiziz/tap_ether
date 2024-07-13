import { ChainId } from "./tokens";

export const chainImages = {
  [ChainId.Mainnet]: {
    src: require("../assets/chains/1.png"),
  },
  [ChainId.Optimism]: {
    src: require("../assets/chains/10.png"),
  },
  [ChainId.Base]: {
    src: require("../assets/chains/8453.png"),
  },
};
