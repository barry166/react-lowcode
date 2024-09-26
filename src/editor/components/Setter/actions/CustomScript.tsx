import { EventAction } from "@/editor/types";
import Editor from "@monaco-editor/react";

interface IProps {
  value?: EventAction["config"];
  onChange: (config: any) => void;
}
const CustomScript: React.FC<IProps> = (props) => {
  const { value, onChange } = props;

  console.log("value", value);

  const handleChange = (e?: string) => {
    onChange({ content: e });
  };

  return (
    <div className="mt-2 h-[300px]">
      <Editor
        height="100%"
        defaultLanguage="javascript"
        onChange={handleChange}
        value={value?.content}
        options={{
          lineNumbers: "off",
          minimap: { enabled: false },
          renderLineHighlight: "none",
          fontSize: 14,
        }}
      />
    </div>
  );
};

export default CustomScript;
