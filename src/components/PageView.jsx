import { Page } from "react-pdf";
import styles from "./PageView.module.css";

import { Rnd } from "react-rnd";
import { useApp } from "../AppContext";

const PageView = ({ scale, index }) => {
  const { signature } = useApp();
  let { signatureMeta } = useApp();

  const handleOnDrag = (e, data, pageIndex, signatureIndex) => {
    const index = signatureMeta.current.findIndex(
      (item) => item.signatureIndex === signatureIndex,
    );
    if (index !== -1) {
      signatureMeta.current[index].x = data.lastX;
      signatureMeta.current[index].y = data.lastY;
      signatureMeta.current[index].pageIndex = pageIndex;
    } else {
      signatureMeta.current.push({
        height: signature[signatureIndex].dimensions.height,
        width: signature[signatureIndex].dimensions.width,
        x: data.lastX,
        y: data.lastY,
        signatureIndex: signatureIndex,
        pageIndex,
      });
    }
  };

  const handleResizeStop = async (
    e,
    direction,
    ref,
    delta,
    position,
    pageIndex,
    signatureIndex,
  ) => {
    signatureMeta.current = signatureMeta.current.map((curr) =>
      curr.signatureIndex === signatureIndex
        ? {
            height: ref.offsetHeight,
            width: ref.offsetWidth,
            x: position.x,
            y: position.y,
            signatureIndex: signatureIndex,
            pageIndex,
          }
        : curr,
    );
  };

  return (
    <Page
      className={styles.page}
      key={`page_${index + 1}`}
      pageNumber={index + 1}
      scale={1}
    >
      {signature.length > 0 &&
        signature.map((s, signatureIndex) => (
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
            key={signatureIndex}
            style={{
              zIndex: 999,
            }}
            bounds="parent"
            onResizeStop={(e, direction, ref, delta, position) =>
              handleResizeStop(
                e,
                direction,
                ref,
                delta,
                position,
                index,
                signatureIndex,
              )
            }
            onDragStop={(e, data) =>
              handleOnDrag(e, data, index, signatureIndex)
            }
          >
            <img
              draggable="false"
              style={{
                width: "100%",
                height: "100%",
              }}
              src={URL.createObjectURL(s.blob)}
              alt="signature"
            />
          </Rnd>
        ))}
    </Page>
  );
};

export default PageView;
