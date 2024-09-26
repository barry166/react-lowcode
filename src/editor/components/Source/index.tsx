import Editor from "@monaco-editor/react";
import useComponentStore from "@/editor/store/components";

// 源码组件
const Source = () => {
  const { components } = useComponentStore();

  return (
    <div className="h-full pt-4">
      <Editor
        height="100%"
        defaultLanguage="javascript"
        value={JSON.stringify(components, null, 2)}
        options={{
          lineNumbers: "off",
          minimap: { enabled: false },
          renderLineHighlight: "none",
          readOnly: true,
        }}
      />
    </div>
  );
};

export default Source;
