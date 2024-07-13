import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

export async function getNfcShareFile({
  wcUri,
  walletName,
}: {
  wcUri: string;
  walletName: string;
}) {
  const deepLink = wcUri;

  const htmlContent = `
<!DOCTYPE html>
<html>
  <head>
    <title>Deep Link</title>
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      body {
        display: flex;
        justify-content: center;
        height: 100vh;
        background-color: #1d1f21;
        font-family: Arial, sans-serif;
        padding: 36px;
      }

      .link-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
        text-align: center;
        margin-top: 8rem;
      }

      .deep-link {
        font-size: 38px;
        font-weight: bold;
        color: #000000;
        padding: 18px 20px;
        border-radius: 98px;
        background: #ffd859;
        max-width: 480px;
        width: 100%;
        text-decoration: none;
      }

      p {
        margin-bottom: 32px;
        color: #95969b;
        font-size: 32px;
      }

      h1 {
        font-size: 60px;
        margin-bottom: 12px;
        color: #95969b;
      }
    </style>
  </head>
  <body>
    <div class="link-container">
      <h1>Connect to ${walletName}</h1>
      <p>You will be redirected to ${walletName} to connect your wallet.</p>
      <a href="${deepLink}" class="deep-link">Connect</a>
    </div>
  </body>
</html>
`;

  const fileUri = FileSystem.documentDirectory + "redirect.html";

  try {
    await FileSystem.writeAsStringAsync(fileUri, htmlContent, {
      encoding: FileSystem.EncodingType.UTF8,
    });

    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(fileUri);
    } else {
      alert("Sharing is not available on your phone. Please turn on sharing.");
    }
  } catch {
    alert("An error occurred while trying to access NFC");
  }

  return null;
}
