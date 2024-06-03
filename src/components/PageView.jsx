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
    // console.log(data.x, data.y);
    // signatureMeta.current.position.x = data.lastX;
    // signatureMeta.current.position.y = data.lastY;
    const newX = data.lastX;
    const newY = data.lastY;
    const newWidth = width;
    const newHeight = height;

    setWidth(newWidth);
    setHeight(newHeight);
    setX(newX);
    setY(newY);

    const img = document.querySelector("#myImage");
    const canvas = document.createElement("canvas");
    canvas.width = newWidth;
    canvas.height = newHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, newWidth, newHeight);
    canvas.toBlob(async (blob) => {
      signatureMeta.current.blob = await blob.arrayBuffer();
    });
  };

  const handleResizeStop = async (e, direction, ref, delta, position) => {
    signatureMeta.current = {
      height: ref.offsetHeight,
      width: ref.offsetWidth,
      x: position.x,
      y: position.y,
      blob: null,
    };
    const newWidth = ref.offsetWidth;
    const newHeight = ref.offsetHeight;
    const newX = position.x;
    const newY = position.y;

    setWidth(newWidth);
    setHeight(newHeight);
    setX(newX);
    setY(newY);



    const img = document.querySelector("#myImage");
    const canvas = document.createElement("canvas");
    canvas.width = ref.offsetWidth;
    canvas.height = ref.offsetHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(
      img,
      0,
      0,
      ref.offsetWidth,
      ref.offsetHeight,
    );
    canvas.toBlob(async (blob) => {
      signatureMeta.current.blob = await blob.arrayBuffer();
    });
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
          size={{ width, height }}
          position={{ x, y }}
          bounds="parent"
          onResizeStop={handleResizeStop}
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
