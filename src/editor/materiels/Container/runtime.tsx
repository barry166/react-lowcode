import { CSSProperties } from "react";

interface ContainerProps {
  id: string;
  children: React.ReactNode;
  style: CSSProperties;
}

const Container: React.FC<ContainerProps> = (props) => {
  const { id, style, ...restProps } = props;
  return (
    <div {...restProps} className="container py-4 border border-gray-500 border-transparent">
      {props.children}
    </div>
  );
};

export default Container;
