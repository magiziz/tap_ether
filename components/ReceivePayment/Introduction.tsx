import { Box, Text } from "../main";

interface IntroductionProps {
  isPaymentReady: boolean;
}

export function Introduction({ isPaymentReady }: IntroductionProps) {
  const text = isPaymentReady
    ? "Requesting signature verification and sending the token."
    : "Choose the token and amount you want to receive, then send a request.";

  const title = isPaymentReady
    ? "Confirming payment..."
    : "Choose a token and amount";

  return (
    <Box flexDirection="column" alignItems="center" maxWidth="320px" gap="16px">
      <Text
        color="grey90"
        fontFamily="SF-Bold"
        textAlign="center"
        fontSize="20px"
      >
        {title}
      </Text>

      <Text
        color="grey90"
        fontFamily="SF-Bold"
        textAlign="center"
        fontSize="12px"
        maxWidth="280px"
      >
        {text}
      </Text>
    </Box>
  );
}
