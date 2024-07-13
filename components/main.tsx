import type { ReactNode } from "react";
import React, { useMemo } from "react";
import type {
  ViewProps as ViewProps_reactNative,
  TextProps as TextProps_reactNative,
  TextStyle as TextStyle_reactNative,
  ViewStyle as ViewStyle_reactNative,
  TextInputProps as TextInputProps_reactNative,
} from "react-native";
import {
  View as View_reactNative,
  Text as Text_reactNative,
  TextInput as TextInput_reactNative,
} from "react-native";

import type { Colors, Spaces } from "@/css/vars";
import { spaces, colors } from "@/css/vars";

type ReactNativeStyles = TextStyle_reactNative | ViewStyle_reactNative;

type WrapperProps<T extends unknown> = T & {
  as: React.ElementType;
  children?: ReactNode;
  background?: Colors;
  style?: ReactNativeStyles;
  color?: Colors;
  opacity?: ReactNativeStyles["opacity"];
  position?: ReactNativeStyles["position"];
  display?: ReactNativeStyles["display"];
  justifyContent?: ReactNativeStyles["justifyContent"];
  alignItems?: ReactNativeStyles["alignItems"];
  flex?: ReactNativeStyles["flex"];
  flexDirection?: ReactNativeStyles["flexDirection"];
  fontFamily?: "SF-Bold" | "SF-Medium" | "SF-Regular" | "SF-Semibold";
  textAlign?: TextStyle_reactNative["textAlign"];
  borderWidth?: TextStyle_reactNative["borderWidth"];
  flexWrap?: TextStyle_reactNative["flexWrap"];
  gap?: Spaces;
  borderRadius?: Spaces;
  borderColor?: Colors;
  fontSize?: Spaces;
  padding?: Spaces;
  height?: Spaces;
  maxHeight?: Spaces;
  minHeight?: Spaces;
  width?: Spaces;
  maxWidth?: Spaces;
  minWidth?: Spaces;
  marginLeft?: Spaces;
  marginTop?: Spaces;
  marginBottom?: Spaces;
  marginRight?: Spaces;
  paddingLeft?: Spaces;
  paddingTop?: Spaces;
  paddingBottom?: Spaces;
  paddingRight?: Spaces;
};

export type BoxProps = Omit<WrapperProps<ViewProps_reactNative>, "as">;
export type TextProps = Omit<WrapperProps<TextProps_reactNative>, "as">;
export type InputProps = Omit<WrapperProps<TextInputProps_reactNative>, "as">;

function getProperty<T>(properties: T, value?: string) {
  return properties[value as keyof T];
}

export function Wrapper<T>({
  as: Component,
  style: styleProp,
  fontFamily,
  background,
  flex,
  alignItems,
  justifyContent,
  flexDirection,
  color,
  opacity,
  position,
  height,
  maxHeight,
  minHeight,
  gap,
  borderColor,
  borderWidth,
  flexWrap,
  borderRadius,
  width,
  maxWidth,
  minWidth,
  marginTop,
  marginRight,
  marginLeft,
  marginBottom,
  fontSize,
  textAlign,
  padding,
  paddingTop,
  paddingRight,
  paddingLeft,
  paddingBottom,
  children,
  ...props
}: WrapperProps<T>) {
  const styles:
    | ViewProps_reactNative["style"]
    | TextProps_reactNative["style"] = useMemo(
    () => ({
      position,
      fontFamily,
      textAlign,
      flex,
      alignItems,
      justifyContent,
      flexDirection,
      borderWidth,
      opacity,
      flexWrap,
      borderColor: getProperty(colors, borderColor),
      fontSize: getProperty(spaces, fontSize),
      gap: getProperty(spaces, gap) as number | undefined,
      borderRadius: getProperty(spaces, borderRadius) as number | undefined,
      height: getProperty(spaces, height),
      maxHeight: getProperty(spaces, maxHeight),
      minHeight: getProperty(spaces, minHeight),
      width: getProperty(spaces, width),
      maxWidth: getProperty(spaces, maxWidth),
      minWidth: getProperty(spaces, minWidth),
      backgroundColor: getProperty(colors, background),
      color: getProperty(colors, color),
      marginTop: getProperty(spaces, marginTop),
      marginRight: getProperty(spaces, marginRight),
      marginLeft: getProperty(spaces, marginLeft),
      marginBottom: getProperty(spaces, marginBottom),
      padding: getProperty(spaces, padding),
      paddingTop: getProperty(spaces, paddingTop),
      paddingRight: getProperty(spaces, paddingRight),
      paddingLeft: getProperty(spaces, paddingLeft),
      paddingBottom: getProperty(spaces, paddingBottom),
    }),
    [
      position,
      fontFamily,
      textAlign,
      flex,
      alignItems,
      justifyContent,
      flexDirection,
      borderWidth,
      opacity,
      flexWrap,
      borderColor,
      fontSize,
      gap,
      borderRadius,
      height,
      maxHeight,
      minHeight,
      width,
      maxWidth,
      minWidth,
      background,
      color,
      marginTop,
      marginRight,
      marginLeft,
      marginBottom,
      padding,
      paddingTop,
      paddingRight,
      paddingLeft,
      paddingBottom,
    ]
  );

  const style = useMemo(() => [styles, styleProp], [styleProp, styles]);

  return (
    <Component style={style} {...props}>
      {children}
    </Component>
  );
}

export function Box(props: BoxProps) {
  return <Wrapper {...props} as={View_reactNative} />;
}

export function Text(props: TextProps) {
  return <Wrapper {...props} as={Text_reactNative} />;
}

export function Input(props: InputProps) {
  return <Wrapper {...props} as={TextInput_reactNative} />;
}
