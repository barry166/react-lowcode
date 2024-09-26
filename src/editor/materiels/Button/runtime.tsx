import { Button as AntdButton } from "antd";

interface ButtonProps {
  text: React.ReactNode;
}

const Button: React.FC<ButtonProps> = (props) => {
  const { text, ...restProps } = props;
  return <AntdButton {...restProps}>{props.text}</AntdButton>;
};

export default Button;
