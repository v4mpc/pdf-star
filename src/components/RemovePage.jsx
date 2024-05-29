import { DeleteOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useCallback } from "react";

import { PDFDocument } from "pdf-lib";
import { useApp } from "../AppContext.jsx";

const RemovePage = () => {
  const { file, selectedIndex, handleAddModifiedFile } = useApp();

  const handleRemovePage = useCallback(async () => {
    if (file) {
      const pdfDoc = await PDFDocument.load(file.arrayBuffer());
      pdfDoc.removePage(selectedIndex);
      const modifiedPdfBytes = await pdfDoc.save();
      handleAddModifiedFile(modifiedPdfBytes);
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
