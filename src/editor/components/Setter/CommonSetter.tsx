import { Form, Input } from "antd";
import { IComponent } from "@/editor/store/components";

// 组件信息展示
const CommonSetter = ({ component }: { component: IComponent }) => {
  const renderLabel = (text: string) => <span className="text-[#77797f]">{text}</span>;
  return (
    <>
      <Form.Item label={renderLabel('组件名称')}>
        <Input size="small" readOnly value={component?.type} />
      </Form.Item>
      <Form.Item label={renderLabel('组件描述')}>
        <Input size="small" readOnly value={component?.desc} />
      </Form.Item>
      <Form.Item label={renderLabel('组件id')}>
        <Input size="small" readOnly value={component?.id} />
      </Form.Item>
    </>
  );
};

export default CommonSetter;