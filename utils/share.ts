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
        align-items: center;
        height: 100vh;
        background-color: #1d1f21;
        font-family: Arial, sans-serif;
      }

      .link-container {
        text-align: center;
      }

      .deep-link {
        font-size: 28px;
        font-weight: bold;
        color: #000000;
        padding: 12px;
        border-radius: 98px;
        background: #ffd859;
        text-decoration: none;
      }

      p {
        margin-bottom: 32px;
        color: #95969b;
        font-size: 28px;
      }

      h1 {
        font-size: 42px;
        margin-bottom: 12px;
        color: #95969b;
      }
    </style>
  </head>
  <body>
    <div class="link-container">
      <h1>Connect to ${walletName}</h1>
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
