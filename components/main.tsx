import React, { useMemo } from "react";
import type {
  ViewProps as ViewProps_reactNative,
  TextProps as TextProps_reactNative,
  TextStyle as TextStyle_reactNative,
  ViewStyle as ViewStyle_reactNative,
} from "react-native";
import {
  View as View_reactNative,
  Text as Text_reactNative,
} from "react-native";

import type { Colors, Spaces } from "@/css/vars";
import { spaces, colors } from "@/css/vars";

type ReactNativeStyles = TextStyle_reactNative | ViewStyle_reactNative;

type WrapperProps = (ViewProps_reactNative | TextProps_reactNative) & {
  as: React.ElementType;
  background?: Colors;
  color?: Colors;
  position?: ReactNativeStyles["position"];
  display?: ReactNativeStyles["display"];
  justifyContent?: ReactNativeStyles["justifyContent"];
  alignItems?: ReactNativeStyles["alignItems"];
  flex?: ReactNativeStyles["flex"];
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

function getProperty<T>(properties: T, value?: string) {
  return properties[value as keyof T];
}

export function Wrapper({
  as: Component,
  style: styleProp,
  background,
  color,
  position,
  height,
  maxHeight,
  minHeight,
  width,
  maxWidth,
  minWidth,
  marginTop,
  marginRight,
  marginLeft,
  marginBottom,
  paddingTop,
  paddingRight,
  paddingLeft,
  paddingBottom,
  children,
  ...props
}: WrapperProps) {
  const styles:
    | ViewProps_reactNative["style"]
    | TextProps_reactNative["style"] = useMemo(
    () => ({
      position,
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
      paddingTop: getProperty(spaces, paddingTop),
      paddingRight: getProperty(spaces, paddingRight),
      paddingLeft: getProperty(spaces, paddingLeft),
      paddingBottom: getProperty(spaces, paddingBottom),
    }),
    [
      background,
      color,
      height,
      marginBottom,
      marginLeft,
      marginRight,
      marginTop,
      maxHeight,
      maxWidth,
      minHeight,
      minWidth,
      paddingBottom,
      paddingLeft,
      paddingRight,
      paddingTop,
      position,
      width,
    ]
  );

  const style = useMemo(() => [styles, styleProp], [styleProp, styles]);

  return (
    <Component style={style} {...props}>
      {children}
    </Component>
  );
}

export function Box(props: Omit<WrapperProps, "as">) {
  return <Wrapper {...props} as={View_reactNative} />;
}

export function Text(props: Omit<WrapperProps, "as">) {
  return <Wrapper {...props} as={Text_reactNative} />;
}
