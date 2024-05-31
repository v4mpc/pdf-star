import { useState, memo } from "react";
import { pdfjs, Document, Page } from "react-pdf";
import styles from "./SinglePageView.module.css";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import { useApp } from "../AppContext.jsx";
import PageView from "../components/PageView";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdf.worker.min.mjs",
  import.meta.url,
).toString();

const options = {
  cMapUrl: "/cmaps/",
  standardFontDataUrl: "/standard_fonts/",
};

const maxWidth = 800;

const SinglePageView = ({ file }) => {
  const [containerWidth] = useState();

  const { numPages, handleSetNumPages, scale } = useApp();

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
            <PageView scale={scale} index={index} key={index} />
          ))}
        </Document>
      </div>
    </div>
  );
};

export default SinglePageView;
