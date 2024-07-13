import { Box, Text } from "../main";

export function Introduction() {
  return (
    <Box flexDirection="column" alignItems="center" maxWidth="280px" gap="16px">
      <Text
        color="grey90"
        fontFamily="SF-Bold"
        textAlign="center"
        fontSize="20px"
      >
        Connect Wallet
      </Text>

      <Text
        color="grey90"
        fontFamily="SF-Bold"
        textAlign="center"
        fontSize="12px"
      >
        Connect or enter the wallet address where you&apos;d like to receive the
        funds.
      </Text>
    </Box>
  );
}
