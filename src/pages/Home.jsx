import { Button, Flex, Layout, message, Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";

const { Header, Footer, Sider, Content } = Layout;
const { Dragger } = Upload;

const props = {
  name: "file",
  multiple: false,
  accept: "application/pdf",
  action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};
const Home = () => (
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
export default Home;
