import { Button, Flex, Layout, message, Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { useApp } from "../AppContext.jsx";
import {readFileAsBlobAsync, readFileAsync} from "../util.jsx";

const { Header, Footer, Sider, Content } = Layout;
const { Dragger } = Upload;

const Home = () => {
  const { file, handleAddFile } = useApp();
  const props = {
    name: "file",
    multiple: false,
    accept: "application/pdf",
    async onChange({ file }) {
      const { originFileObj } = file;
      if (originFileObj) {
        // const arrayBuffer = await readFileAsync(originFileObj);
        // const uint8Array = new Uint8Array(arrayBuffer.slice(0));
          const blob = await readFileAsBlobAsync(originFileObj);
        handleAddFile(blob);
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
