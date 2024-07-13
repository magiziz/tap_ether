export const wallets = [
  {
    name: "MetaMask",
    mobileLink: "metamask://wc",
    src: require("../assets/wallets/metamask.jpg"),
  },
  {
    name: "Trust Wallet",
    mobileLink: "trust://wc",
    src: require("../assets/wallets/trust.jpg"),
  },
  {
    name: "OKX Wallet",
    mobileLink: "kex://main/wc",
    src: require("../assets/wallets/okx.jpg"),
  },
  {
    name: "Zerion Wallet",
    mobileLink: "zerion://wc",
    src: require("../assets/wallets/zerion.jpg"),
  },
  {
    name: "1inch Wallet",
    mobileLink: "oneinch://wc",
    src: require("../assets/wallets/1inch.jpg"),
  },
];

export type Wallet = (typeof wallets)[number];
