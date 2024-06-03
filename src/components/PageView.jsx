import { Page } from "react-pdf";
import styles from "./PageView.module.css";

import { Rnd } from "react-rnd";
import { useApp } from "../AppContext";
import { useState } from "react";

// const maxWidth = 800;
const PageView = ({ scale, index }) => {
  const { signature } = useApp();
  let { signatureMeta } = useApp();
  const [width, setWidth] = useState(200);
  const [height, setHeight] = useState(200);
  const [x, setX] = useState(100);
  const [y, setY] = useState(100);

  const handleOnDrag = (e, data) => {
    if (signatureMeta.current !== null) {
      signatureMeta.current.x = data.lastX;
      signatureMeta.current.y = data.lastY;
    } else {
      signatureMeta.current = {
        height: signature.dimensions.height,
        width: signature.dimensions.width,
        x: data.lastX,
        y: data.lastY,
      };
    }
  };

  const handleResizeStop = async (e, direction, ref, delta, position) => {
    signatureMeta.current = {
      height: ref.offsetHeight,
      width: ref.offsetWidth,
      x: position.x,
      y: position.y,
    };
  };

  return (
    <Page
      className={styles.page}
      key={`page_${index + 1}`}
      pageNumber={index + 1}
      scale={1}
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
            // backgroundColor: "blue",
          }}
          bounds="parent"
          onResizeStop={handleResizeStop}
          onDragStop={handleOnDrag}
        >
          <img
            id="myImage"
            draggable="false"
            style={{
              width: "100%",
              height: "100%",
            }}
            src={URL.createObjectURL(signature.blob)}
            alt="signature"
          />
        </Rnd>
      )}
    </Page>
  );
};

export default PageView;
