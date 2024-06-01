import { Page } from "react-pdf";
import styles from "./PageView.module.css";
import { useState } from "react";

import { Rnd } from "react-rnd";
import { useApp } from "../AppContext";
import { toNumber } from "../util";

const maxWidth = 800;
const PageView = ({ scale, index }) => {
  const { signature } = useApp();
  let { signatureMeta } = useApp();

  const handleOnDrag = (e, data) => {
    // console.log(data.x, data.y);
    signatureMeta.current.position.x = data.lastX;
    signatureMeta.current.position.y = data.lastY;
  };

  const handleResizeStop = (e, dir, ref, delta, position) => {
    console.log("resize position", position);
    console.log(
      "width",
      toNumber(ref.style.width),
      "height",
      toNumber(ref.style.height),
    );
    signatureMeta.current = {
      height: toNumber(ref.style.height),
      width: toNumber(ref.style.width),
      position: { x: 0, y: 0 },
    };
  };

  return (
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
          onResizeStop={handleResizeStop}
          onDragStop={handleOnDrag}
          default={{
            x: 0,
            y: 0,
            height: signature.dimensions.height,
            width: signature.dimensions.width,
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
  );
};

export default PageView;
