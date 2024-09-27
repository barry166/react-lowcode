import { CSSProperties } from "react";
import { Button as AntdButton, ButtonProps } from "antd";
import { extraCommonProps } from "@/editor/utils/material";

interface IProps extends ButtonProps {
  text: React.ReactNode;
  style?: CSSProperties;
}

const Button: React.FC<IProps> = (props) => {
  const { text, type, ...restProps } = props;
  return (
    <AntdButton type={type} {...extraCommonProps(restProps)}>
      {text}
    </AntdButton>
  );
};

export default Button;
