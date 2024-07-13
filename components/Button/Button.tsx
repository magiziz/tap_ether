import type { ReactNode } from "react";

import type { BoxProps, TextProps } from "../main";
import { Box, Text } from "../main";
import { Touchable } from "../Touchable/Touchable";

interface ButtonProps {
  children: ReactNode;
  textProps?: TextProps;
  boxProps?: BoxProps;
  onPress?: () => void;
  withText?: boolean;
}

export function Button({
  children,
  onPress,
  textProps = {},
  boxProps = {},
  withText = true,
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
        {withText ? <Text {...textProps}>{children}</Text> : children}
      </Box>
    </Touchable>
  );
}
