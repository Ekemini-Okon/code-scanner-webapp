const output = document.getElementById("output");

function onScanSuccess(decodedText) {
  output.textContent = decodedText;
}

const html5QrCode = new Html5Qrcode("video");

document.getElementById("start").addEventListener("click", () => {
  Html5Qrcode.getCameras().then(cameras => {
    if (cameras.length > 0) {
      html5QrCode.start(
        cameras[0].id,
        { fps: 10, qrbox: 250 },
        onScanSuccess
      );
    }
  });
});
