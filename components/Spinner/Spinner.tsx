import React, { useEffect } from "react";
import type { ViewStyle } from "react-native";
import Animated, {
  cancelAnimation,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

interface SpinnerProps {
  height: number;
  width: number;
  color?: string;
  style?: ViewStyle;
}

export const Spinner = ({
  style: styleProp,
  height,
  width,
  color = "#000000",
}: SpinnerProps) => {
  const rotation = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotateZ: `${rotation.value}deg`,
        },
      ],
    };
  }, [rotation.value]);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, {
        duration: 1000,
        easing: Easing.linear,
      }),
      200
    );
    return () => cancelAnimation(rotation);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Animated.View
      style={[
        // eslint-disable-next-line react-native/no-color-literals
        {
          height,
          width,
          borderRadius: 90,
          borderWidth: 3,
          borderTopColor: "transparent",
          borderRightColor: "transparent",
          borderBottomColor: "transparent",
          borderLeftColor: color,
        },
        animatedStyles,
        styleProp,
      ]}
    />
  );
};
