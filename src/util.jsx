const readFileAsync = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
};

const readFileAsBlobAsync = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const blob = new Blob([reader.result], { type: file.type });
      resolve(blob);
    };
    reader.onerror = reject;
    reader.readAsArrayBuffer(file); // Read file as ArrayBuffer to create Blob
  });
};

const blobToArrayBuffer = (blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = reject;
    reader.readAsArrayBuffer(blob);
  });
};

const arrayBufferToUint8Array = (arrayBuffer) => {
  return new Uint8Array(arrayBuffer);
};

const uint8ArrayToBlob = (uint8Array, mimeType = "application/pdf") => {
  return new Blob([uint8Array], { type: mimeType });
};

const toPercentage = (value) => `${Math.round(value * 100)}%`;

export {
  readFileAsync,
  readFileAsBlobAsync,
  blobToArrayBuffer,
  arrayBufferToUint8Array,
  uint8ArrayToBlob,
  toPercentage,
};
