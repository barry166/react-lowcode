import { CSSProperties } from "react";
import useMaterielDropHook from "@/editor/hooks/useMaterielDropHook";

interface ContainerProps {
  id: string;
  children: React.ReactNode;
  style: CSSProperties
}

const Container: React.FC<ContainerProps> = (props) => {
  const { id, style, ...restProps } = props;
  const [{ isOver }, drop] = useMaterielDropHook(["Button", "Container", "Modal"], id);
  return (
    <div
      {...restProps}
      ref={drop}
      className="container py-4 border border-gray-500 border-transparent"
      data-is-over={isOver}
      style={{ ...style, backgroundColor: isOver ? "#f5f7fe" : "transparent" }}
    >
      {props.children}
    </div>
  );
};

export default Container;
