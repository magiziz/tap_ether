import { Box, Text } from "../main";

export function Introduction() {
  return (
    <Box flexDirection="column" alignItems="center" maxWgidth="320px" gap="16px">
      <Text
        color="grey90"
        fontFamily="SF-Bold"
        textAlign="center"
        fontSize="20px"
      >
        Payment
      </Text>

      <Text
        color="grey90"
        fontFamily="SF-Bold"
        textAlign="center"
        fontSize="12px"
        maxWidth="280px"
      >
        Choose the token you want to receive as payment and send a request.
      </Text>
    </Box>
  );
}
