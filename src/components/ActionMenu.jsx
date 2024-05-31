import AppendFile from "./AppendFile.jsx";
import RemovePage from "./RemovePage.jsx";
import { Flex, Space } from "antd";
import { useApp } from "../AppContext.jsx";
import Sign from "./Sign";

const ActionMenu = () => {
  const { selectedPageView } = useApp();
  return (
    <Flex justify="center" style={{ backgroundColor: "white", padding: "4px" }}>
      <Space>
        {selectedPageView === "multi" && (
          <>
            <AppendFile />
            <RemovePage />
          </>
        )}

        {selectedPageView === "single" && <Sign />}
      </Space>
    </Flex>
  );
};

export default ActionMenu;
