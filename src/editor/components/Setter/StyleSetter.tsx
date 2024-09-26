import useComponentStore from "@/editor/store/components";
import { cssToObject, objectToCSS } from "@/editor/utils";
import Editor from "@monaco-editor/react";
import { debounce } from "lodash-es";
import { useEffect, useState } from "react";

const defaultContent = `
/* 组件样式写在.comp里 */
.comp {
   
}
`;

function extractCssString(cssString: string) {
  const regex = new RegExp(`.comp\\s*{([^}]+)}`, "i");
  const match = cssString.match(regex);
  return match ? match[1].trim() : "";
}

const StyleSetter = () => {
  const { curComponent, updateComponentStyle } = useComponentStore();
  const [css, setCss] = useState("");

  useEffect(() => {
    const styleContent = !curComponent?.style
      ? defaultContent
      : `
/* 组件样式写在.comp里 */
.comp {
  ${objectToCSS(curComponent?.style)}
}`;
    // 仅当新生成的样式内容与当前内容不同时更新，以避免打断用户的编辑操作
    if (styleContent.trim() !== css.trim()) {
      setCss(styleContent);
    }
  }, [curComponent?.style]);

  if (!curComponent) return null;

  const handleEditorChange = (value: string | undefined) => {
    console.log("value", value);
    if (!value) {
      updateComponentStyle(curComponent.id, {});
    } else {
      const cssContent = extractCssString(value);
      const style = cssToObject(cssContent);
      console.log("cssContent", cssContent, style);
      if (!style) {
        updateComponentStyle(curComponent.id, {});
      }
      updateComponentStyle(curComponent.id, style);
    }
  };

  return (
    <div className="h-full">
      <Editor
        height="100%"
        defaultLanguage="css"
        onChange={debounce(handleEditorChange, 1000)}
        value={css}
        options={{
          lineNumbers: "off",
          minimap: { enabled: false },
          renderLineHighlight: "none",
          fixedOverflowWidgets: true,
          fontSize: 14,
        }}
      />
    </div>
  );
};

export default StyleSetter;
