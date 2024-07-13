import { Box } from "../main";

import { ConnectOrEnterAddress } from "./ConnectOrEnterAddress";
import { Introduction } from "./Introduction";

export function ConnectWallet() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap="26px"
      marginTop="60px"
    >
      <Introduction />
      <ConnectOrEnterAddress />
    </Box>
  );
}
