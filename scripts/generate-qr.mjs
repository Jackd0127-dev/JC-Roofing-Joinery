import QRCode from "qrcode";

await QRCode.toFile("public/brand/novas-qr.png", "https://novasagency.com", {
  width: 512,
  margin: 3,
  errorCorrectionLevel: "M",
  color: {
    dark: "#46211A",
    light: "#F1D3B2",
  },
});

console.log("Generated local Novas Agency QR asset.");
