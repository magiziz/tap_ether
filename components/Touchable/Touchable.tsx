import type { ReactNode } from "react";
import type { TouchableOpacityProps, ViewStyle } from "react-native";
import { TouchableOpacity, Animated } from "react-native";

import type {
  activeScaleValues,
  hoverScaleValues,
} from "@/hooks/useTouchableStyles";
import { useTouchableStyle } from "@/hooks/useTouchableStyles";

interface TouchableProps {
  children: ReactNode;
  active: keyof typeof activeScaleValues;
  hover: keyof typeof hoverScaleValues;
  viewStyle?: ViewStyle;
  touchableOpacityProps?: TouchableOpacityProps;
}

export function Touchable({
  children,
  active,
  touchableOpacityProps = {},
  hover,
  viewStyle,
}: TouchableProps) {
  const { scale, handlePressIn, handlePressOut } = useTouchableStyle({
    active,
    hover,
  });

  return (
    <Animated.View style={[{ transform: [{ scale }] }, viewStyle]}>
      <TouchableOpacity
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
        {...touchableOpacityProps}
      >
        {children}
      </TouchableOpacity>
    </Animated.View>
  );
}
