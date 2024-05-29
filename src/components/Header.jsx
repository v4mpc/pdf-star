import { Flex, Segmented, Dropdown, Space, Select, Button } from "antd";

import {
    AppstoreOutlined,
    BarsOutlined,
    DownOutlined, FilePdfOutlined,
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
  <header style={{padding:"10px"}}>
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
  </header>
);
export default Header;
