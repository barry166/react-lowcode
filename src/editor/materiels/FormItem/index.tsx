import Design from "./design";
import Runtime from "./runtime";

export default {
  design: Design,
  runtime: Runtime,
  setter: [
    {
      type: "textArea",
      propKey: "label",
      label: "显示文本",
    },
    {
      type: "input",
      propKey: "name",
      label: "表单项name",
    },
  ],
};
