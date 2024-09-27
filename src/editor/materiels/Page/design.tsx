import { CSSProperties } from "react";
import useMaterielDropHook from "@/editor/hooks/useMaterielDropHook";

interface PageProps {
  id: string;
  children: React.ReactNode;
  style: CSSProperties;
}

const Page: React.FC<PageProps> = (props) => {
  const { id, style, ...restProps } = props;
  const [{ isOver }, drop] = useMaterielDropHook(
    ["Button", "Input", "Container", "Modal", "Table"],
    id,
  );

  return (
    <div
      {...restProps}
      ref={drop}
      className="page px-4 py-4 h-full border border-transparent"
      style={{
        ...style,
        borderStyle: isOver ? "dashed" : "solid",
        backgroundColor: isOver ? "#f5f7fe" : "transparent",
      }}
      // style={{ ...style, backgroundColor: isOver ? "#f5f7fe" : "transparent" }}
    >
      {props.children}
    </div>
  );
};

export default Page;
