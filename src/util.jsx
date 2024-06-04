import { PDFDocument } from "pdf-lib";

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

function getImageBlobAndDimensions(file) {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error("No file provided"));
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const blob = new Blob([reader.result], { type: file.type });
      const blobUrl = URL.createObjectURL(blob);

      const img = new Image();
      img.onload = () => {
        resolve({
          blob,
          dimensions: {
            width: img.width,
            height: img.height,
          },
        });
      };
      img.onerror = reject;
      img.src = blobUrl;
    };

    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
}

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

function toNumber(value) {
  const number = value.match(/\d+/);
  return number ? parseInt(number[0], 10) : null;
}

const combinedPromise = async (
  data,
  dataToCreatePromise,
  promiseToCreateData,
) => {
  try {
    const promisedData = await promiseToCreateData(dataToCreatePromise);

    return { data, promisedData };
  } catch (error) {

    throw error;
  }
};

const downloadPdf = async (pdfFile, signature, signatureMeta) => {
  const arrBff = await blobToArrayBuffer(pdfFile);
  const pdfDoc = await PDFDocument.load(arrBff);

  let pngSignatureBytesPromises = [];
  signature.forEach((item) => {
    pngSignatureBytesPromises.push(
      combinedPromise(item.id, item.blob, blobToArrayBuffer),
    );
  });


  let pngSignaturesBytes = await Promise.all(pngSignatureBytesPromises);
  let pngSignaturePromises = [];
  pngSignaturesBytes.forEach((item) => {
      console.log(item)
    pngSignaturePromises.push(
      combinedPromise(item.data, item.promisedData, pdfDoc.embedPng),
    );
  });
  let pngSignatures = await Promise.all(pngSignaturePromises);


  signatureMeta.current.forEach((item) => {
    const page = pdfDoc.getPage(item.pageIndex);
    const signatureToDraw = pngSignatures.filter(
      (f) => f.data === item.signatureIndex,
    )[0];

    page.drawImage(signatureToDraw.promisedData, {
      height: item.height,
      width: item.width,
      x: item.x,
      y: page.getHeight() - item.height - item.y,
    });
  });

  const signedPdfBytes = await pdfDoc.save();

  const blob = new Blob([uint8ArrayToBlob(signedPdfBytes)], {
    type: "application/pdf",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "untitled.pdf";
  document.body.appendChild(a);
  a.click();
  URL.revokeObjectURL(url);
  document.body.removeChild(a);
};

const toPercentage = (value) => `${Math.round(value * 100)}%`;

export {
  readFileAsync,
  readFileAsBlobAsync,
  blobToArrayBuffer,
  arrayBufferToUint8Array,
  uint8ArrayToBlob,
  toPercentage,
  downloadPdf,
  getImageBlobAndDimensions,
  toNumber,
};
