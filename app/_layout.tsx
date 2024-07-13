import { Asset } from "expo-asset";
import * as Font from "expo-font";
import { useEffect, useState } from "react";

import AppKitProvider from "@/components/AppKitProvider/AppKitProvider";
import { Layout } from "@/components/Layout/Layout";
import { wallets } from "@/utils/wallets";

const App = () => {
  const [isFontsLoaded, setIsFontsLoaded] = useState(false);
  const [isImagesLoaded, setIsImagesLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () =>
      Font.loadAsync({
        "SF-Bold": require("../assets/fonts/SF-Bold.otf"),
        "SF-Medium": require("../assets/fonts/SF-Medium.otf"),
        "SF-Regular": require("../assets/fonts/SF-Regular.otf"),
        "SF-Semibold": require("../assets/fonts/SF-Semibold.otf"),
      });

    const preloadImages = async () => {
      const images = wallets.map((wallet) =>
        Asset.fromModule(wallet.src).downloadAsync()
      );
      await Promise.all(images);
    };

    loadFonts()
      .then(() => setIsFontsLoaded(true))
      .catch(() => null);
    preloadImages()
      .then(() => setIsImagesLoaded(true))
      .catch(() => null);
  }, []);

  // Wait for fonts to load
  if (!isFontsLoaded || !isImagesLoaded) return null;

  return (
    <AppKitProvider>
      <Layout />
    </AppKitProvider>
  );
};

export default App;
