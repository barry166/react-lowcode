import Design from "./design";
import Runtime from "./runtime";

export default {
  design: Design,
  runtime: Runtime,
  methods: [
    {
      label: "打开弹窗",
      name: "open",
    },
    {
      label: "关闭弹窗",
      name: "close",
    },
  ],
};
