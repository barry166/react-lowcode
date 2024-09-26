import React, { useMemo, useState } from "react";
import { Table as AntdTable } from "antd";
import { useDrop } from "react-dnd";
import useComponentStore from "@/editor/store/components";
import useComponentConfigStore from "@/editor/store/componentsConfig";
import { extraCommonProps } from "@/editor/utils/material";
import TableColumn from "../TableColumn/design";
import { getComponentById } from "@/editor/store/util";

interface TableProps {
  id: string;
  children?: React.ReactNode;
}

const Table: React.FC<TableProps> = (props) => {
  const { id, ...restProps } = props;
  const { components, addComponent } = useComponentStore();
  const { componentsConfig } = useComponentConfigStore();
  const [columnsCount, setColumnsCount] = useState(1);

  const columns = useMemo(() => {
    const tableComponent = getComponentById(id, components);
    const columnComponents = tableComponent?.children || [];
    console.log("columnComponents", columnComponents);
    return columnComponents.map((column) => {
      return {
        ...column.props,
        key: column.id,
        title: (
          <TableColumn {...column} id={column.id}>
            {column?.props?.title}
          </TableColumn>
        ),
      };
    });
  }, [id, components]);

  // console.log("columns", columns);

  const [{ isOver }, drop] = useDrop({
    accept: ["Button", "DatePicker", "Input"], // 可以作为列的组件类型
    drop: (item: { type: string; desc: string }) => {
      const columnId = `column-${Date.now()}`;
      const childId = `${item.type}-${Date.now()}`;

      // 添加 TableColumn
      addComponent(id, {
        id: columnId,
        type: "TableColumn",
        desc: "表格列",
        props: {
          ...componentsConfig["TableColumn"]!.defaultProps,
          dataIndex: columnId,
        },
        parentId: id,
      });

      // 添加实际的组件作为 TableColumn 的子组件
      addComponent(columnId, {
        id: childId,
        type: item.type,
        desc: item.desc,
        props: componentsConfig[item.type]!.defaultProps || {},
        parentId: columnId,
      });
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop}
      className="border border-transparent"
      style={{ border: isOver ? "1px dashed #1890ff" : "none" }}
    >
      <AntdTable
        {...extraCommonProps(restProps)}
        columns={columns}
        dataSource={[]}
      />
      {/* <div>拖拽组件到此处添加新列</div> */}
    </div>
  );
};

export default Table;
