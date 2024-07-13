import type { DimensionValue } from "react-native";

export const colors = {
  transparent: "transparent",

  green: "#EAFCE8",

  blue: "#EDF9FF",

  purple: "#F7F5FF",

  pink: "#FFF0FA",

  red10: "#FFF0F0",

  orange: "#FFF6EB",

  yellow: "#FFFBE0",

  black: "black",

  white: "#1B1C1E",

  gray: "#F0F1F5",

  blueGray: "#F0F1F5",
};

export const spaces = {
  "0px": 0,
  "1px": 1,
  "1.5px": 1.5,
  "2px": 2,
  "3px": 3,
  "4px": 4,
  "5px": 5,
  "6px": 6,
  "7px": 7,
  "8px": 8,
  "9px": 9,
  "10px": 10,
  "12px": 12,
  "14px": 14,
  "15px": 15,
  "16px": 16,
  "18px": 18,
  "19px": 19,
  "20px": 20,
  "22px": 22,
  "24px": 24,
  "28px": 28,
  "26px": 26,
  "27px": 27,
  "30px": 30,
  "32px": 32,
  "34px": 34,
  "35px": 35,
  "36px": 36,
  "40px": 40,
  "44px": 44,
  "48px": 48,
  "50px": 50,
  "52px": 52,
  "60px": 60,
  "64px": 64,
  "65px": 65,
  "68px": 68,
  "72px": 72,
  "80px": 80,
  "100px": 100,
  "104px": 104,
  "120px": 120,
  "500px": 500,

  full: "100%" as DimensionValue,
};

export type Colors = keyof typeof colors;

export type Spaces = keyof typeof spaces;
export type Display = "flex" | "none";
