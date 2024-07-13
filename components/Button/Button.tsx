import type { ReactNode } from "react";

import type { BoxProps, TextProps } from "../main";
import { Box, Text } from "../main";
import { Touchable } from "../Touchable/Touchable";

interface ButtonProps {
  children: ReactNode;
  textProps?: TextProps;
  boxProps?: BoxProps;
  onPress?: () => void;
}

export function Button({
  children,
  onPress,
  textProps = {},
  boxProps = {},
}: ButtonProps) {
  return (
    <Touchable
      active="shrink"
      hover="grow"
      touchableOpacityProps={{
        onPress,
      }}
    >
      <Box {...boxProps}>
        <Text {...textProps}>{children}</Text>
      </Box>
    </Touchable>
  );
}
