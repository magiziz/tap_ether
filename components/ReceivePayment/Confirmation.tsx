import { Box, Text } from "../main";

export function Confirmation() {
  return (
    <Box flexDirection="column" alignItems="center" maxWidth="320px" gap="16px">
      <Text
        color="grey90"
        fontFamily="SF-Bold"
        textAlign="center"
        fontSize="20px"
      >
        Choose Token
      </Text>

      <Text
        color="grey90"
        fontFamily="SF-Bold"
        textAlign="center"
        fontSize="12px"
        maxWidth="280px"
      >
        Choose the token and amount you want to receive, then send a request.
      </Text>
    </Box>
  );
}
