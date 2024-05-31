import { Page } from "react-pdf";
import styles from "./PageView.module.css";
import { useState } from "react";

import { Rnd } from "react-rnd";
import { useApp } from "../AppContext";

const maxWidth = 800;
const PageView = ({ scale, index }) => {
  const [elements, setElements] = useState([]);
  const { signature } = useApp();

  const handleClick = (event) => {
    const x = event.clientX;
    const y = event.clientY;

    console.log(event.clientX, event.clientY);

    if (elements.length === 0) setElements([...elements, { x, y }]);
  };

  const handleDragStop = ({ x, y }) => {
    console.log(x, y);
  };

  return (
    <div onClick={handleClick}>
      <Page
        className={styles.page}
        key={`page_${index + 1}`}
        pageNumber={index + 1}
        scale={scale}
        width={maxWidth}
      >
        {signature !== null && (
          <Rnd
            lockAspectRatio={true}
            resizeHandleClasses={{
              bottom: styles.handleBorderBottom,
              top: styles.handleBorderTop,
              right: styles.handleBorderRight,
              left: styles.handleBorderLeft,
              topLeft: styles.redCircle,
              topRight: styles.redCircle,
              bottomLeft: styles.redCircle,
              bottomRight: styles.redCircle,
            }}
            key={index}
            style={{
              zIndex: 999,
              backgroundColor: "blue",
            }}
            bounds="parent"
            onDragStop={handleDragStop}
            default={{
              x: 0,
              y: 0,
              height: signature.height,
              width: signature.width,
            }}
          >
            <img
              draggable="false"
              style={{
                width: "100%",
                height: "auto",
                display: "block",
              }}
              src={URL.createObjectURL(signature.blob)}
              alt="signature"
            />
          </Rnd>
        )}
      </Page>
    </div>
  );
};

export default PageView;
