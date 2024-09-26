import { CSSProperties } from "react";
import useMaterielDropHook from "@/editor/hooks/useMaterielDropHook";

interface PageProps {
  id: string;
  children: React.ReactNode;
  style: CSSProperties;
}

const Page: React.FC<PageProps> = (props) => {
  const { id, style, ...restProps } = props;
  const [{ isOver }, drop] = useMaterielDropHook(["Button", "Container", "Modal"], id);

  return (
    <div
      {...restProps}
      ref={drop}
      className="page px-4 py-4 h-full border border-transparent"
      style={{ ...style, borderStyle: isOver ? "dashed" : "solid" }}
    >
      {props.children}
    </div>
  );
};

export default Page;
