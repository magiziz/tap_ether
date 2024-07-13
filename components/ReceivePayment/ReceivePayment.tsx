import { useState } from "react";

import { Box } from "../main";

import { Introduction } from "./Introduction";

export function ReceivePayment() {
  const [hasConfirmed, setHasConfirmed] = useState();
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap="26px"
      marginTop="16px"
    >
      <Introduction />
    </Box>
  );
}
