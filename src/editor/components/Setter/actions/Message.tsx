import { EventAction } from "@/editor/types";
import { Form, Input, Radio } from "antd";

interface IProps {
  value?: EventAction["config"];
  onChange: (config: any) => void;
}

const Message: React.FC<IProps> = (props) => {
  const { value, onChange } = props;
  const [form] = Form.useForm();

  const handleChange = (_: any, allValue: any) => {
    onChange({ ...value, ...allValue });
  };

  return (
    <>
      <Form
        layout="horizontal"
        form={form}
        initialValues={{ type: "info", ...value }}
        onValuesChange={handleChange}
      >
        <Form.Item label="消息类型" name="type">
          <Radio.Group>
            <Radio.Button value="info">提示</Radio.Button>
            <Radio.Button value="success">成功</Radio.Button>
            <Radio.Button value="warning">警告</Radio.Button>
            <Radio.Button value="error">错误</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="提示内容" name="content">
          <Input.TextArea placeholder="" rows={3} />
        </Form.Item>
      </Form>
    </>
  );
};

export default Message;
