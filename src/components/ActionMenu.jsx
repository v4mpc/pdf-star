import AppendFile from "./AppendFile.jsx";
import RemovePage from "./RemovePage.jsx";
import { SignatureOutlined } from "@ant-design/icons";
import { Flex, Segmented, Space, Select, Button } from "antd";
import { Tooltip } from "antd";
import {useApp} from "../AppContext.jsx";

const ActionMenu = () => {
    const {
        file,
        handleSetSelectedPageView,
        scale,
        handleSetScale,
        selectedPageView,
    } = useApp();
  return (
    <Flex justify="center" style={{ backgroundColor: "white", padding: "4px" }}>
      <Space>
        {selectedPageView === "multi" && (
          <>
            <AppendFile />
            <RemovePage />
          </>
        )}

        {selectedPageView === "single" && (

            <Tooltip title="coming soon">
                <Button type="text" icon={<SignatureOutlined />}>
                    Sign
                </Button>
            </Tooltip>
        )}
      </Space>
    </Flex>
  );
};

export default ActionMenu;
