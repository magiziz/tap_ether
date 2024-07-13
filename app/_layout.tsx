import React from "react";
import { Text } from "react-native";

import AppKitProvider from "@/components/AppKitProvider";

const Layout = () => {
  return (
    <AppKitProvider>
      <Text style={{ fontSize: 50 }}>Hello World!</Text>
    </AppKitProvider>
  );
};

export default Layout;
