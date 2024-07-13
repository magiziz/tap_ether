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
        Payer wallet
      </Text>

      <Text
        color="grey90"
        fontFamily="SF-Bold"
        textAlign="center"
        fontSize="12px"
      >
        Bring your iPhone and tap it with another iPhone. They will be able to
        connect to their wallet to initialize the payment.
      </Text>
    </Box>
  );
}
