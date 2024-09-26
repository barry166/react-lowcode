import { DatePicker as AntdDatePicker } from "antd";
import { extraCommonProps } from "@/editor/utils/material";

const DatePicker: React.FC<any> = (props) => {
  return <AntdDatePicker {...extraCommonProps(props)} />;
};

export default DatePicker;
