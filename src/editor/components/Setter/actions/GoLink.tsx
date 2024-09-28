import { EventAction } from "@/editor/types";
import { Input, Switch } from "antd";

interface IProps {
  value?: EventAction["config"];
  onChange: (config: any) => void;
}
const GoLink: React.FC<IProps> = (props) => {
  const { value, onChange } = props;

  const handleChange = (key: string, v: any) => {
    onChange({ ...value, [key]: v });
  };

  return (
    <div className="mt-2">
      <div className="flex mb-2">
        <span className="mr-2">页面地址：</span>
        <Input.TextArea
          style={{ width: 400 }}
          rows={3}
          size="small"
          onChange={(e) => handleChange("url", e.target.value)}
          value={value?.url}
        />
      </div>
      <div className="flex items-center">
        <span className="mr-2">新窗口打开：</span>
        <Switch
          size="small"
          value={value?.blank}
          onChange={(e) => handleChange("blank", e)}
        />
      </div>
    </div>
  );
};

export default GoLink;
