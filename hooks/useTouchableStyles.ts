import { useState } from "react";
import { Animated } from "react-native";

interface UseTouchableStyleParameters {
  active: keyof typeof activeScaleValues;
  hover: keyof typeof hoverScaleValues;
}

// Define your scale values
export const hoverScaleValues = {
  grow: 1.025,
  growLg: 1.1,
};

export const activeScaleValues = {
  shrink: 0.95,
  shrinkSm: 0.9,
};

export const useTouchableStyle = ({
  active,
  hover,
}: UseTouchableStyleParameters) => {
  const [scale] = useState(new Animated.Value(1));

  const handlePressIn = () => {
    if (active) {
      Animated.timing(scale, {
        toValue: activeScaleValues[active as keyof typeof activeScaleValues],
        duration: 100,
        useNativeDriver: true,
      }).start();
    }
  };

  const handlePressOut = () => {
    if (hover) {
      Animated.timing(scale, {
        toValue: hoverScaleValues[hover as keyof typeof hoverScaleValues],
        duration: 100,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(scale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }).start();
    }
  };

  return {
    scale,
    handlePressIn,
    handlePressOut,
  };
};
