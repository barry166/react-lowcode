import Design from "./design";
import Runtime from "./runtime";

export default {
  design: Design,
  runtime: Runtime,
  setter: [
    {
      type: "textArea",
      propKey: "url",
      label: "接口Url",
    },
    {
      propKey: "size",
      type: "select",
      label: "表格尺寸",
      options: [
        { label: "大", value: "large" },
        { label: "中", value: "middle" },
        { label: "小", value: "small" },
      ],
    },
  ],
};
