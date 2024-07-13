import React from "react";

import { Box } from "../main";

import { ChooseWallet } from "./ChooseWallet";
import { Introduction } from "./Introduction";

const NfcAirdrop = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap="26px"
      marginTop="16px"
    >
      <Introduction />
      <ChooseWallet />
    </Box>
  );
};

export default NfcAirdrop;
