import { useState, memo, useMemo } from "react";
import { pdfjs, Document, Page } from "react-pdf";
import pdfFile from "./samples/book.pdf";
// import pdfFile from "./samples/A6.pdf";
import styles from "./SinglePageView.module.css";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import { useApp } from "../AppContext.jsx";
import { readFileAsync } from "../util.jsx";
import { Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons';


pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdf.worker.min.mjs",
  import.meta.url,
).toString();

const options = {
  cMapUrl: "/cmaps/",
  standardFontDataUrl: "/standard_fonts/",
};

const resizeObserverOptions = {};

const maxWidth = 800;

const SinglePageView = memo(({ file }) => {
  const [containerWidth, setContainerWidth] = useState();

  const { numPages, handleSetNumPages, selectedIndex, handleSetSelectedIndex } =
    useApp();

  function onDocumentLoadSuccess({ numPages }) {
    handleSetNumPages(numPages);
  }

  return (
    <div>
      <div className={styles.container}>
        <Document
          className={styles.containerDocument}
          file={file}
          loading=""
          scale={0.5}
          onLoadSuccess={onDocumentLoadSuccess}
          options={options}
        >
          {Array.from(new Array(numPages), (el, index) => (
            <Page
              className={styles.page}
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              width={
                containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth
              }
            />
          ))}
        </Document>
      </div>
    </div>
  );
});

export default SinglePageView;
