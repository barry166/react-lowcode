const setter = [
  {
    type: "textArea",
    propKey: "text",
    label: "文案",
  },
  {
    type: "select",
    propKey: "type",
    label: "按钮类型",
    options: [
      { label: "主按钮", value: "primary" },
      { label: "链接按钮", value: "link" },
      { label: "文本按钮", value: "text" },
      { label: "虚线按钮", value: "dashed" },
      { label: "次按钮", value: "default" },
    ],
  },
  {
    propKey: "size",
    type: "select",
    label: "按钮尺寸",
    options: [
      { label: "大", value: "large" },
      { label: "中", value: "middle" },
      { label: "小", value: "small" },
    ],
  },
];

export default setter