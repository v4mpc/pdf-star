import {Button, Upload} from "antd";
import {SignatureOutlined} from "@ant-design/icons";
import {getImageBlobAndDimensions, readFileAsBlobAsync} from "../util";
import {useApp} from "../AppContext";

const Sign = () => {
    const {handleAddSignature} = useApp();
    const props = {
        name: "file",
        multiple: false,
        accept: "image/*",
        showUploadList: false,
        async onChange({file}) {
            const {originFileObj} = file;
            if (originFileObj) {
                const signatureData = await getImageBlobAndDimensions(originFileObj);
                await handleAddSignature(signatureData);
            }
        },
    };


    return (
        <Upload {...props}>
            <Button type="text" icon={<SignatureOutlined/>}>
                Sign
            </Button>
        </Upload>
    );
};

export default Sign;
