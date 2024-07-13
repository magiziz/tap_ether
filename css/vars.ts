import type { DimensionValue } from "react-native";

export const colors = {
  greenA10: "rgba(29, 184, 71, 0.1)",
  green10: "#EAFCE8",
  green20: "#CDFACD",
  green30: "#A6F5AC",
  green40: "#74E082",
  green50: "#4BD166",
  green60: "#1DB847",
  green70: "#189943",
  green80: "#09752D",
  green90: "#2F2C22",
  green100: "#1D1F21",

  blueA10: "rgba(14, 118, 253, 0.1)",
  blue10: "#EDF9FF",
  blue20: "#D1EDFF",
  blue30: "#A3D7FF",
  blue40: "#6BBFFF",
  blue50: "#3898FF",
  blue60: "#0E76FD",
  blue70: "#1761E0",
  blue80: "#0B4AB8",
  blue90: "#053085",
  blue100: "#001E59",

  purpleA10: "rgba(95, 90, 250, 0.1)",
  purple10: "#F7F5FF",
  purple20: "#E7E0FF",
  purple30: "#C6B8FF",
  purple40: "#9E8FFF",
  purple50: "#7A70FF",
  purple60: "#5F5AFA",
  purple70: "#5248E0",
  purple80: "#4936C2",
  purple90: "#38228F",
  purple100: "#2C0D6B",

  pinkA10: "rgba(255, 92, 160, 0.1)",
  pink10: "#FFF0FA",
  pink20: "#FFD6F1",
  pink30: "#FFB8E2",
  pink40: "#FF99CF",
  pink50: "#FF7AB8",
  pink60: "#FF5CA0",
  pink70: "#E04887",
  pink80: "#CC3976",
  pink90: "#851B53",
  pink100: "#570040",

  redA10: "rgba(250, 66, 60, 0.1)",
  red10: "#FFF0F0",
  red20: "#FFD4D1",
  red30: "#FFACA3",
  red40: "#FF887A",
  red50: "#FF6257",
  red60: "#FA423C",
  red70: "#D13732",
  red80: "#B22824",
  red90: "#7A1714",
  red100: "#520907",

  orangeA10: "rgba(255, 128, 31, 0.1)",
  orange10: "#FFF6EB",
  orange20: "#FFE7CC",
  orange30: "#FFCF99",
  orange40: "#FFB266",
  orange50: "#FF983D",
  orange60: "#FF801F",
  orange70: "#E06E16",
  orange80: "#AD530E",
  orange90: "#703B12",
  orange100: "#3D1E0A",

  yellowA10: "rgba(250, 203, 15, 0.1)",
  yellow10: "#FFD859",
  yellow20: "#FFF5C2",
  yellow30: "#FFEE99",
  yellow40: "#FFE566",
  yellow50: "#FFDF3D",
  yellow60: "#FFD014",
  yellow70: "#EBAF09",
  yellow80: "#B88700",
  yellow90: "#7A600A",
  yellow100: "#42320B",

  grey10: "#F7F7F7",
  grey20: "rgba(9, 17, 31, 0.05)",
  grey30: "rgba(16, 21, 31, 0.1)",
  grey40: "rgba(16, 21, 31, 0.16)",
  grey50: "rgba(22, 25, 31, 0.24)",
  grey60: "rgba(26, 28, 31, 0.36)",
  grey70: "rgba(255, 255, 255, 0.03)",
  grey80: "#242529",
  grey90: "#95969B",
  grey100: "#000",

  white10: "#1B1C1E",
  white20: "rgba(245, 248, 255, 0.12)",
  white30: "rgba(245, 248, 255, 0.16)",
  white40: "rgba(245, 248, 255, 0.2)",
  white50: "rgba(245, 248, 255, 0.28)",
  white60: "rgba(245, 248, 255, 0.4)",
  white70: "rgba(245, 248, 255, 0.56)",
  white80: "rgba(245, 248, 255, 0.76)",
  white90: "rgba(247, 250, 255, 0.92)",
  white100: "#FFFFFF",

  blueGrey10: "#F5F5F7",
  blueGrey20: "#E6E9F0",
  blueGrey30: "#DADEE5",
  blueGrey40: "#CAD0D9",
  blueGrey50: "#AFB9C7",
  blueGrey60: "#929EAD",
  blueGrey70: "#78828F",
  blueGrey80: "#5F6670",
  blueGrey90: "#3C4047",
  blueGrey100: "#242529",

  cyan50: "#00E7F3",

  black: "#000000",
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
  "200px": 200,
  "280px": 280,
  "320px": 320,
  "384px": 384,
  "500px": 500,

  full: "100%" as DimensionValue,
};

export type Colors = keyof typeof colors;

export type Spaces = keyof typeof spaces;
export type Display = "flex" | "none";
