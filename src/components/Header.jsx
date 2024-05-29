import { Flex, Segmented, Dropdown, Space, Select, Button } from "antd";

import {
  AppstoreOutlined,
  BarsOutlined,
  DeleteOutlined,
  DownOutlined,
  FileAddOutlined,
  FilePdfOutlined,
  MinusOutlined,
  PlusOutlined,
} from "@ant-design/icons";

const { Group: ButtonGroup } = Button;

const options = [
  {
    value: "25",
    label: "25%",
  },

  {
    value: "50",
    label: "50%",
  },

  {
    value: "75",
    label: "75%",
  },

  {
    value: "100",
    label: "100%",
  },
];

const Header = () => (
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
          padding:"4px"
      }}
    >
      <Space direction="horizontal">
        <Segmented
          options={[
            {
              value: "List",
              icon: <FilePdfOutlined />,
            },
            {
              value: "Kanban",
              icon: <AppstoreOutlined />,
            },
          ]}
        />

        <Select
          defaultValue="50"
          style={{
            width: 100,
          }}
          options={options}
        />

        <ButtonGroup>
          <Button type="primary" icon={<MinusOutlined />}></Button>
          <Button type="primary" icon={<PlusOutlined />}></Button>
        </ButtonGroup>
      </Space>
    </Flex>
    <Flex justify="center" style={{ backgroundColor: "white", padding:"4px" }}>
      <Space>
        <Button type="text" icon={<FileAddOutlined />}>
          Append File
        </Button>
        <Button type="text" danger={true} icon={<DeleteOutlined />}>
          Delete
        </Button>
      </Space>
    </Flex>
  </header>
);
export default Header;
