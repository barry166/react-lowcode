import React, { useMemo, useState, CSSProperties } from "react";
import { Table as AntdTable } from "antd";
import { useDrop } from "react-dnd";
import useComponentStore from "@/editor/store/components";
import useComponentConfigStore from "@/editor/store/componentsConfig";
import { extraCommonProps, omitProps } from "@/editor/utils/material";
import TableColumn from "../TableColumn/design";
import { getComponentById } from "@/editor/store/util";

interface TableProps {
  id: string;
  children?: React.ReactNode;
  style?: CSSProperties;
  size?: "large" | "middle" | "small";
}

const Table: React.FC<TableProps> = (props) => {
  const { id, style, ...restProps } = props;
  const { components, addComponent } = useComponentStore();
  const { componentsConfig, getComponentConfig } = useComponentConfigStore();
  // const [columnsCount, setColumnsCount] = useState(1);

  const columns = useMemo(() => {
    const tableComponent = getComponentById(id, components);
    const columnComponents = tableComponent?.children || [];
    // console.log("columnComponents", columnComponents);
    return columnComponents.map((column) => {
      const childComponent = column.children?.[0];
      const ChildComponent = childComponent
        ? getComponentConfig(childComponent)?.component.design
        : null;
      return {
        ...column.props,
        key: column.id,
        dataIndex: column?.props?.dataIndex,
        title: (
          <TableColumn {...column} id={column.id} size={restProps?.size}>
            {column?.props?.title}
          </TableColumn>
        ),
        render: () =>
          ChildComponent ? <ChildComponent {...childComponent?.props} /> : null,
      };
    });
  }, [id, components, restProps, getComponentConfig]);

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

  const rowData = useMemo(() => {
    return [{ key: "single-row" }];
  }, []);

  return (
    <div
      {...extraCommonProps(restProps)}
      ref={drop}
      className="border border-transparent"
      style={{
        ...style,
        backgroundColor: isOver ? "#f5f7fe" : "transparent",
      }}
    >
      <AntdTable
        {...omitProps(restProps, ["style", "data-component-id"])}
        columns={columns}
        dataSource={rowData}
      />
      {/* <div>拖拽组件到此处添加新列</div> */}
    </div>
  );
};

export default Table;
