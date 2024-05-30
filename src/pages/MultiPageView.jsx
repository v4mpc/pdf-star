import { memo, useCallback, useMemo } from "react";
import { pdfjs, Document } from "react-pdf";
// import pdfFile from "./samples/book.pdf";
import pdfFile from "./samples/A6.pdf";
import styles from "./MultiPageView.module.css";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import SelectableThumbnail from "../components/SelectableThumbnail.jsx";
import { useApp } from "../AppContext.jsx";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdf.worker.min.mjs",
  import.meta.url,
).toString();

const options = {
  cMapUrl: "/cmaps/",
  standardFontDataUrl: "/standard_fonts/",
};

const MultiPageView = memo(() => {
  const { file,numPages, handleSetNumPages, selectedIndex, handleSetSelectedIndex } =
    useApp();


  function onDocumentLoadSuccess({ numPages }) {
    handleSetNumPages(numPages);
  }

  console.log("rerendering mutlipage view");

  const handleItemClicked = useCallback(({ pageIndex }) => {
    handleSetSelectedIndex(pageIndex);
  }, []);

  const pages = useMemo(
    () =>
      Array.from(new Array(numPages), (el, index) => (
        <SelectableThumbnail
          index={index}
          isSelected={selectedIndex === index}
          onClick={handleItemClicked}
          key={index}
        />
      )),
    [numPages, handleItemClicked, selectedIndex],
  );

  return (
    <div>
      <div className={styles.container}>
        <Document
          className={styles.containerDocument}
          file={file}
          loading=""
          onLoadSuccess={onDocumentLoadSuccess}
          options={options}
        >
          {pages}
        </Document>
      </div>
    </div>
  );
});

export default MultiPageView;
