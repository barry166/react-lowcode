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
  ],
};
