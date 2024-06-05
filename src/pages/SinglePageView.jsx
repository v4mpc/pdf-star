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
 const {currentPage}=useApp();
  let { pageMeta } = useApp();

  const { numPages, handleSetNumPages, scale, pdfInfo } = useApp();

  function onDocumentLoadSuccess(pdf) {
    handleSetNumPages(pdf.numPages);
  }



  return (
    <div>
      <div className={styles.container}>
        <Document
          className={styles.containerDocument}
          file={file}
          loading=""
          scale={scale}
          onLoadSuccess={onDocumentLoadSuccess}
          options={options}
        >

            <PageView scale={scale} index={currentPage-1} key={currentPage-1}  />

        </Document>
      </div>
    </div>
  );
};

export default SinglePageView;
