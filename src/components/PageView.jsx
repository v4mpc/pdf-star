import { Page } from "react-pdf";
import styles from "./PageView.module.css";

import { Rnd } from "react-rnd";
import { useApp } from "../AppContext";
import { Space, Button, Flex } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const PageView = ({ scale, index }) => {
  const { signature, handleRemoveSignature } = useApp();
  let { signatureMeta } = useApp();

  const handleOnDrag = (e, data, pageIndex, signatureIndex) => {
    let foundSignature = signatureMeta.current.filter(
      (curr) => curr.id === signatureIndex,
    );
    if (index !== -1) {
      foundSignature.x = data.lastX;
      foundSignature.y = data.lastY;
      foundSignature.pageIndex = pageIndex;
    } else {
      signatureMeta.current.push({
        height: signature[signatureIndex].dimensions.height,
        width: signature[signatureIndex].dimensions.width,
        x: data.lastX,
        y: data.lastY,
        id: signatureIndex,
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
        signature.map((s) => (
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
            key={s.id}
            style={{
              zIndex: 999,
            }}
            bounds="parent"
            onResizeStop={(e, direction, ref, delta, position) =>
              handleResizeStop(e, direction, ref, delta, position, index, s.id)
            }
            onDragStop={(e, data) => handleOnDrag(e, data, index, s.id)}
          >
            <div className={styles.imageContainer}>
              <img
                draggable="false"
                style={{
                  width: "100%",
                  height: "100%",
                }}
                src={URL.createObjectURL(s.blob)}
                alt="signature"
              />
              <Button
                size="small"
                type="primary"
                className={styles.deleteButton}
                onClick={() => handleRemoveSignature(s.id)}
                danger={true}
                key={`button-${s.id}`}
                shape="circle"
                icon={<DeleteOutlined />}
              />
            </div>
          </Rnd>
        ))}
    </Page>
  );
};

export default PageView;
