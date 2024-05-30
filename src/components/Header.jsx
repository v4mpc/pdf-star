import { Flex, Segmented, Space, Select, Button } from "antd";

import { memo, useCallback } from "react";

import {
  AppstoreOutlined,
  DeleteOutlined,
  FileAddOutlined,
  FilePdfOutlined,
  MinusOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import RemovePage from "./RemovePage.jsx";
import { useApp } from "../AppContext.jsx";
import { toPercentage } from "../util.jsx";

const MIN_SCALE_VALUE = 0.25;
const MAX_SCALE_VALUE = 1;
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
];

const Header = memo(() => {
  const { file, handleSetSelectedPageView, scale, handleSetScale } = useApp();

  const increaseScale = () => {
    const newScale = scale + SCALE_STEP;
    handleSetScale(Math.min(MAX_SCALE_VALUE, newScale));
  };

  const decreaseScale = () => {
    const newScale = scale - SCALE_STEP;
    handleSetScale(Math.max(MIN_SCALE_VALUE, newScale));
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

          <Select
            value={toPercentage(scale)}
            style={{
              width: 100,
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
        </Space>
      </Flex>
      <Flex
        justify="center"
        style={{ backgroundColor: "white", padding: "4px" }}
      >
        <Space>
          <Button type="text" icon={<FileAddOutlined />}>
            Append File
          </Button>
          <RemovePage />
        </Space>
      </Flex>
    </header>
  );
});
export default Header;
