import { Button, Flex, Layout, message, Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { useApp } from "../AppContext.jsx";
import { readFileAsBlobAsync, readFileAsync } from "../util.jsx";

import Draggable from "react-draggable";

const { Header, Footer, Sider, Content } = Layout;
const { Dragger } = Upload;

const Home = () => {
  const { file, handleAddFile, handleSetSelectedPageView } = useApp();
  const props = {
    name: "file",
    multiple: false,
    accept: "application/pdf",
    async onChange({ file }) {
      const { originFileObj } = file;
      if (originFileObj) {
        const blob = await readFileAsBlobAsync(originFileObj);
        handleAddFile(blob);
        handleSetSelectedPageView("single");
      }
    },
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag PDF file to this area to open
        </p>
        <p className="ant-upload-hint">Single Pdf file is supported.</p>
      </Dragger>
    </div>
  );
};
export default Home;
