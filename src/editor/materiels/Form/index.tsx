import Design from "./design";
import Runtime from "./runtime";

export default {
  design: Design,
  runtime: Runtime,
  events: [
    {
      type: "onFinish",
      label: "提交事件",
    },
  ],
  methods: [
    {
      label: "获取表单值",
      name: "getValues",
    },
    {
      label: "提交表单",
      name: "submit",
    },
  ],
};
