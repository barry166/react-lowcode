import TableColumnDesign from "./design";
import TableColumnRuntime from "./runtime";

export default {
  design: TableColumnDesign,
  runtime: TableColumnRuntime,
  setter: [
    {
      type: "input",
      propKey: "title",
      label: "列标题",
    },
    {
      type: "input",
      propKey: "dataIndex",
      label: "列id",
    },
  ],
};
