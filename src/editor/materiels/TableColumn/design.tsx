import { extraCommonProps } from "@/editor/utils/material";
import { useMemo } from "react";

interface TableColumnProps {
  id: string;
  children: React.ReactNode;
  size?: "large" | "middle" | "small";
}

const TableColumnDesign: React.FC<TableColumnProps> = (props) => {
  const { id, children, ...restProps } = props;

  const { size = "large" } = restProps;
  const classNames = useMemo(() => {
    if (size === "large") {
      return "m-[-16px] p-[16px]";
    }
    if (size === "middle") {
      return "m-[-12px] p-[12px]";
    }
    return "m-[-8px] p-[8px]";
  }, [size]);

  return (
    <div
      {...extraCommonProps(restProps)}
      data-component-id={id}
      className={`${classNames} h-full cursor-pointer`}
    >
      {children}
    </div>
  );
};

export default TableColumnDesign;
