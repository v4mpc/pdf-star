import { DeleteOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useCallback } from "react";

import { PDFDocument } from "pdf-lib";
import { useApp } from "../AppContext.jsx";
import {
  blobToArrayBuffer,

  uint8ArrayToBlob,
} from "../util.jsx";

const RemovePage = () => {
  const { file, handleAddFile, selectedIndex } =
    useApp();

  const handleRemovePage = useCallback(async () => {
    if (file) {
      const arrBff = await blobToArrayBuffer(file);
      const pdfDoc = await PDFDocument.load(arrBff);
      pdfDoc.removePage(selectedIndex);
      const modifiedPdfBytes = await pdfDoc.save();
      handleAddFile(uint8ArrayToBlob(modifiedPdfBytes));
    }
  }, [file, selectedIndex]);

  return (
    <Button
      type="text"
      danger={true}
      icon={<DeleteOutlined />}
      onClick={handleRemovePage}
    >
      Delete
    </Button>
  );
};

export default RemovePage;
