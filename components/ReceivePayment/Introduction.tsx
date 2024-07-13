import { Box, Text } from "../main";

export function Introduction() {
  return (
    <Box flexDirection="column" alignItems="center" maxWidth="320px" gap="16px">
      <Text
        color="grey90"
        fontFamily="SF-Bold"
        textAlign="center"
        fontSize="20px"
      >
        Choose a token and amount
      </Text>

      <Text
        color="grey90"
        fontFamily="SF-Bold"
        textAlign="center"
        fontSize="12px"
        style={{maxWidth:240}}
      >
        Choose the chain, token, and amount you want to receive.
      </Text>
    </Box>
  );
}
