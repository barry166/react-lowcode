import { DatePicker as AntdDatePicker } from "antd";
import dayjs, { type Dayjs } from "dayjs";

interface IProps {
  value?: Dayjs;
}

const DatePicker: React.FC<IProps> = (props) => {
  const { value, ...rest } = props;
  // 确保传入的值是有效的 dayjs 对象
  const dayjsValue = value && dayjs(value).isValid() ? dayjs(value) : null;

  // console.log("date picker", props, dayjsValue);

  return <AntdDatePicker {...rest} defaultValue={dayjsValue} />;
};

export default DatePicker;
