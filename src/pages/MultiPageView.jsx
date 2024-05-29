import { useState, memo, useCallback, useMemo } from "react";
import { pdfjs, Document, Page, Thumbnail } from "react-pdf";
import pdfFile from "./samples/book.pdf";
// import pdfFile from "./samples/A6.pdf";
import styles from "./MultiPageView.module.css";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import selectableThumbnail from "../components/SelectableThumbnail.jsx";
import SelectableThumbnail from "../components/SelectableThumbnail.jsx";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdf.worker.min.js",
  import.meta.url,
).toString();

const options = {
  cMapUrl: "/cmaps/",
  standardFontDataUrl: "/standard_fonts/",
};

const MemoSelectableThumbnail = memo(({ index, selectedIndex, onClick }) => {
  return (
    <SelectableThumbnail
      index={index}
      selectedIndex={selectedIndex}
      onItemClicked={onClick}
    />
  );
});

const MultiPageView = () => {
  const [file, setFile] = useState(pdfFile);
  const [numPages, setNumPages] = useState();
  const [selectedIndex, setSelectedIndex] = useState(null);

  function onDocumentLoadSuccess({ numPages: nextNumPages }) {
    setNumPages(nextNumPages);
  }

  const handleItemClicked = useCallback(({ pageIndex }) => {
    setSelectedIndex((curr) => (curr === pageIndex ? null : pageIndex));
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
          onLoadSuccess={onDocumentLoadSuccess}
          options={options}
        >
          {pages}
        </Document>
      </div>
    </div>
  );
};

export default MultiPageView;
