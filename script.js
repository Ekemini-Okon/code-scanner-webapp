const output = document.getElementById("output");
const startBtn = document.getElementById("startBtn");
const fileInput = document.getElementById("fileInput");

const html5QrCode = new Html5Qrcode("reader");

// ===== LIVE CAMERA SCAN =====
startBtn.addEventListener("click", () => {
  Html5Qrcode.getCameras().then(cameras => {
    if (cameras.length > 0) {
      html5QrCode.start(
        cameras[0].id,
        { fps: 10, qrbox: 250 },
        decodedText => {
          output.textContent = decodedText;
        }
      );
    } else {
      output.textContent = "No camera detected.";
    }
  }).catch(err => {
    output.textContent = "Camera error: " + err;
  });
});

// ===== IMAGE UPLOAD SCAN =====
fileInput.addEventListener("change", e => {
  const file = e.target.files[0];
  if (!file) return;

  html5QrCode.scanFile(file, true)
    .then(decodedText => {
      output.textContent = decodedText;
    })
    .catch(() => {
      output.textContent = "No valid code found in image.";
    });
});
