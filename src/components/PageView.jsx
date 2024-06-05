import { Page } from "react-pdf";
import styles from "./PageView.module.css";

import { Rnd } from "react-rnd";
import { useApp } from "../AppContext";
import {  Button} from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const PageView = ({ scale, index }) => {
  const { signature, handleRemoveSignature } = useApp();
  let { signatureMeta, pageMeta } = useApp();

  const handleDeleteSignature = (id) => {
    handleRemoveSignature(id);
  };

  const onPageLoadSuccess = (page) => {
    const { width, height } = page.getViewport({ scale: 1 });
    pageMeta.current.push({
      pageIndex: page._pageIndex,
      width,
      height,
    });

  };

  const handleOnDrag = (e, data, pageIndex, signatureId) => {
    let foundSignature = signatureMeta.current.filter(
      (curr) => curr.id === signatureId,
    );
    if (foundSignature.length > 0) {
      foundSignature[0].x = data.lastX;
      foundSignature[0].y = data.lastY;
      foundSignature[0].pageIndex = pageIndex;
    } else {
      let foundSignature = signature.filter((f) => f.id === signatureId)[0];
      signatureMeta.current.push({
        height: foundSignature.dimensions.height,
        width: foundSignature.dimensions.width,
        x: data.lastX,
        y: data.lastY,
        id: signatureId,
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
    signatureId,
  ) => {
    signatureMeta.current = signatureMeta.current.map((curr) =>
      curr.id === signatureId
        ? {
            height: ref.offsetHeight,
            width: ref.offsetWidth,
            x: position.x,
            y: position.y,
            id: signatureId,
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
      loading=""
      scale={1}
      onLoadSuccess={(page) => onPageLoadSuccess(page)}
    >
      {signature.length > 0 &&
        signature.map((s) =>
          s.pageIndex === index ? (
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
                handleResizeStop(
                  e,
                  direction,
                  ref,
                  delta,
                  position,
                  index,
                  s.id,
                )
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
                  onClick={() => handleDeleteSignature(s.id)}
                  danger={true}
                  key={`button-${s.id}`}
                  shape="circle"
                  icon={<DeleteOutlined />}
                />
              </div>
            </Rnd>
          ) : (
            <></>
          ),
        )}
    </Page>
  );
};

export default PageView;
