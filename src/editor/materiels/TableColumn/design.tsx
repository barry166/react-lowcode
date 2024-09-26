import { extraCommonProps } from "@/editor/utils/material";

interface TableColumnProps {
  id: string;
  children: React.ReactNode;
}

const TableColumnDesign: React.FC<TableColumnProps> = (props) => {
  const { id, children, ...restProps } = props;

  return (
    <div
      {...extraCommonProps(restProps)}
      data-component-id={id}
      className="m-[-16px] p-[16px] h-full cursor-pointer"
    >
      {children}
    </div>
  );
};

export default TableColumnDesign;
