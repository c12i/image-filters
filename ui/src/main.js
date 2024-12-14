import init, { ImageProcessor } from "image-filters";

let imageProcessor = null;
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

async function initializeWasm() {
  await init();
}

async function processImage(file) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;

      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

      // Initialize the ImageProcessor with the original image data
      imageProcessor = new ImageProcessor(
        imageData.data,
        canvas.width,
        canvas.height,
      );

      resolve();
    };
    img.src = URL.createObjectURL(file);
  });
}

async function applyFilter(filterName) {
  if (!imageProcessor) return;

  // Apply filter and get new image data
  const processedData = imageProcessor.apply_filter(filterName);

  // Create new ImageData and update canvas
  const newImageData = new ImageData(
    new Uint8ClampedArray(processedData),
    canvas.width,
    canvas.height,
  );
  ctx.putImageData(newImageData, 0, 0);

  // Update preview image
  document.getElementById("preview-image").src = canvas.toDataURL();
}

function downloadImage() {
  const link = document.createElement("a");
  link.download = "filtered-image.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
}

// App entry-point
window.addEventListener("load", async () => {
  await initializeWasm();

  const previewImage = document.getElementById("preview-image");
  const placeholder = document.getElementById("upload-placeholder");
  const downloadButton = document.getElementById("download-image");

  // Handle image input
  document
    .getElementById("image-input")
    .addEventListener("change", async (e) => {
      if (e.target.files.length > 0) {
        await processImage(e.target.files[0]);

        // Show image and download button, hide placeholder
        previewImage.src = canvas.toDataURL();
        previewImage.style.display = "block";
        downloadButton.style.display = "block";
        placeholder.style.display = "none";
      }
    });

  // Handle apply-filter on clock
  document.getElementById("apply-filter").addEventListener("click", () => {
    const filterName = document.getElementById("filter-select").value;
    applyFilter(filterName);
  });

  // Handle download button click
  downloadButton.addEventListener("click", downloadImage);
});
