import Design from "./design";
import Runtime from "./runtime";

export default {
  design: Design,
  runtime: Runtime,
  setter: [
    {
      type: "textArea",
      propKey: "placeholder",
      label: "默认提示",
    },
  ],
};
