import { Input as AntdInput } from "antd";
import { extraCommonProps } from "@/editor/utils/material";

interface InputProps {
  placeholder?: string;
}

const Input: React.FC<InputProps> = (props) => {
  return (
    <AntdInput placeholder={props.placeholder} {...extraCommonProps(props)} />
  );
};

export default Input;
