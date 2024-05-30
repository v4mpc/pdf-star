import { FileAddOutlined } from "@ant-design/icons";

import { Flex, Segmented, Space, Select, Button, Upload } from "antd";
import {
  blobToArrayBuffer,
  readFileAsBlobAsync,
  uint8ArrayToBlob,
} from "../util.jsx";
import { PDFDocument } from "pdf-lib";
import { useApp } from "../AppContext.jsx";

const AppendFile = () => {
  const { file, handleAddFile } = useApp();
  const handleAppend = async (blob) => {
    const pdfDoc = await PDFDocument.create();
    const arrBff = await blobToArrayBuffer(file);
    const pdf1Doc = await PDFDocument.load(arrBff);
    const pdf1Pages = await pdfDoc.copyPages(pdf1Doc, pdf1Doc.getPageIndices());
    pdf1Pages.forEach((page) => pdfDoc.addPage(page));

    const arrBff2 = await blobToArrayBuffer(blob);
    const pdf2Doc = await PDFDocument.load(arrBff2);
    const pdf2Pages = await pdfDoc.copyPages(pdf2Doc, pdf2Doc.getPageIndices());
    pdf2Pages.forEach((page) => pdfDoc.addPage(page));

    const combinedPdfBytes = await pdfDoc.save();
    handleAddFile(uint8ArrayToBlob(combinedPdfBytes));
  };

  const props = {
    name: "file",
    multiple: false,
    accept: "application/pdf",
    showUploadList: false,
    async onChange({ file }) {
      const { originFileObj } = file;
      if (originFileObj) {
        const blob = await readFileAsBlobAsync(originFileObj);
        await handleAppend(blob);
      }
    },
  };

  return (
    <Upload {...props}>
      <Button type="text" icon={<FileAddOutlined />}>
        Append File
      </Button>
    </Upload>
  );
};

export default AppendFile;
