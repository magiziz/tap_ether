import * as Font from "expo-font";
import { useEffect, useState } from "react";

import AppKitProvider from "@/components/AppKitProvider/AppKitProvider";
import { Layout } from "@/components/Layout/Layout";

const App = () => {
  const [isFontsLoaded, setIsFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () =>
      Font.loadAsync({
        "SF-Bold": require("../assets/fonts/SF-Bold.otf"),
        "SF-Medium": require("../assets/fonts/SF-Medium.otf"),
        "SF-Regular": require("../assets/fonts/SF-Regular.otf"),
        "SF-Semibold": require("../assets/fonts/SF-Semibold.otf"),
      });

    loadFonts().then(() => setIsFontsLoaded(true));
  }, []);

  // Wait for fonts to load
  if (!isFontsLoaded) return null;

  return (
    <AppKitProvider>
      <Layout />
    </AppKitProvider>
  );
};

export default App;
