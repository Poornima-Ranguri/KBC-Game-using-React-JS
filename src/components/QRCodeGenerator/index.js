import React from "react";
import { QRCodeCanvas } from "qrcode.react"; // Correct import

const QRCodeGenerator = () => {
  const mobileUrl = `${window.location.origin}/mobile`;

  return (
    <div>
      <h2>Scan to Join</h2>
      <QRCodeCanvas value={mobileUrl} /> {/* Updated usage */}
    </div>
  );
};

export default QRCodeGenerator;
