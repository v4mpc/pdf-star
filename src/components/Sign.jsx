import { Button, Upload, message } from "antd";
import { SignatureOutlined } from "@ant-design/icons";
import { getImageBlobAndDimensions, readFileAsBlobAsync } from "../util";
import { useApp } from "../AppContext";

const Sign = () => {
  const { file } = useApp();
  const { handleAddSignature, handleSetScale } = useApp();
  const props = {
    name: "file",
    multiple: false,
    accept: "image/*",
    showUploadList: false,
    async beforeUpload(file) {
      const signatureData = await getImageBlobAndDimensions(file);
      handleAddSignature(signatureData);
      handleSetScale(1);
      return false;
    },
  };

  return (
    <Upload {...props}>
      <Button type="text" icon={<SignatureOutlined />} disabled={file === null}>
        Sign
      </Button>
    </Upload>
  );
};

export default Sign;
