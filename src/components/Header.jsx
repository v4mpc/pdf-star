import { Flex, Segmented, Space, Select, Button, InputNumber } from "antd";

import { memo } from "react";

import {
  AppstoreOutlined,
  DeleteOutlined,
  FilePdfOutlined,
  MinusOutlined,
  PlusOutlined,
  SaveOutlined,
  StepBackwardOutlined,
  StepForwardOutlined,
} from "@ant-design/icons";
import { useApp } from "../AppContext.jsx";
import { downloadPdf, toPercentage } from "../util.jsx";
import ActionMenu from "./ActionMenu.jsx";

const MIN_SCALE_VALUE = 0.25;
const MAX_SCALE_VALUE = 2;
const SCALE_STEP = 0.1;

const { Group: ButtonGroup } = Button;

const options = [
  {
    value: 0.25,
    label: "25%",
  },

  {
    value: 0.5,
    label: "50%",
  },

  {
    value: 0.75,
    label: "75%",
  },

  {
    value: 1,
    label: "100%",
  },

  {
    value: 1.5,
    label: "150%",
  },
  {
    value: 2,
    label: "200%",
  },
];

const Header = memo(() => {
  const {
    file,
    handleAddFile,
    handleSetSelectedPageView,
    scale,
    handleSetScale,
    signature,
    numPages,
    currentPage,
    handleSetCurrentPage,
    selectedPageView,
  } = useApp();

  let { signatureMeta } = useApp();

  const changeSignaturePosition = (scale) => {
    signatureMeta.current = signatureMeta.current.map((curr) => ({
      ...curr,
      x: curr.x / scale,
      y: curr.y / scale,
    }));
  };

  const increaseScale = () => {
    if (signature.length !== 0) return;
    const newScale = Math.min(MAX_SCALE_VALUE, scale + SCALE_STEP);
    handleSetScale(newScale);
    changeSignaturePosition(newScale);
  };

  const decreaseScale = () => {
    if (signature.length !== 0) return;
    const newScale = Math.max(MIN_SCALE_VALUE, scale - SCALE_STEP);
    handleSetScale(newScale);
    changeSignaturePosition(newScale);
  };

  const increasePageNumber = () => {
    handleSetCurrentPage(Math.min(numPages, currentPage + 1));
  };

  const decreasePageNumber = () => {
    handleSetCurrentPage(Math.max(1, currentPage - 1));
  };

  const handleSave = async () => {
    await downloadPdf(file, signature, signatureMeta);
  };

  const handlePageNumberChanged = (page) => {
    if (page >= 1 && page <= numPages) {
      handleSetCurrentPage(page);
    }
  };

  const handleRemove = () => {
    handleAddFile(null);
  };

  return (
    <header
      style={{
        position: "sticky",
        zIndex: "1000",
        top: 0,
      }}
    >
      <Flex
        justify="space-between"
        style={{
          backgroundColor: "grey",
          padding: "4px",
        }}
      >
        <Space direction="horizontal">
          <Segmented
            disabled={file === null}
            options={[
              {
                value: "single",
                icon: <FilePdfOutlined />,
              },
              {
                value: "multi",
                icon: <AppstoreOutlined />,
              },
            ]}
            onChange={handleSetSelectedPageView}
          />

          {file !== null && selectedPageView === "single" && (
            <Space>
              <Select
                value={toPercentage(scale)}
                style={{
                  width: 90,
                }}
                options={options}
                onChange={(value) => handleSetScale(value)}
              />

              <ButtonGroup>
                <Button
                  type="primary"
                  onClick={decreaseScale}
                  icon={<MinusOutlined />}
                ></Button>
                <Button
                  type="primary"
                  onClick={increaseScale}
                  icon={<PlusOutlined />}
                ></Button>
              </ButtonGroup>

              <InputNumber
                style={{ width: 60 }}
                controls={false}
                value={currentPage}
                min={1}
                // max={numPages}
                defaultValue={currentPage}
                onChange={handlePageNumberChanged}
              />
              <span style={{ color: "white" }}> / {numPages} pages</span>

              <ButtonGroup>
                <Button
                  type="primary"
                  onClick={decreasePageNumber}
                  icon={<StepBackwardOutlined />}
                ></Button>
                <Button
                  type="primary"
                  onClick={increasePageNumber}
                  icon={<StepForwardOutlined />}
                ></Button>
              </ButtonGroup>
            </Space>
          )}
        </Space>

        <Space direction="horizontal">
          <Button
            disabled={file === null}
            type="primary"
            onClick={async () => handleSave()}
            icon={<SaveOutlined />}
          >
            Save
          </Button>

          <Button
            disabled={file === null}
            type="primary"
            danger={true}
            onClick={handleRemove}
            icon={<DeleteOutlined />}
          >
            Remove
          </Button>
        </Space>
      </Flex>
      <ActionMenu />
    </header>
  );
});
export default Header;
