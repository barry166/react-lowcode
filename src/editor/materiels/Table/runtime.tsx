import { useState, useEffect, useMemo } from "react";
import { Table as AntdTable } from "antd";
import useComponentStore from "@/editor/store/components";
import useComponentConfigStore from "@/editor/store/componentsConfig";
import { getComponentById } from "@/editor/store/util";

interface TableProps {
  id: string;
  url?: string;
}

const Table: React.FC<TableProps> = (props) => {
  const { id, url, ...restProps } = props;
  const { components } = useComponentStore();
  const { getComponentConfig } = useComponentConfigStore();
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!url) return;
    try {
      fetch(url)
        .then((res) => res.json())
        .then((res) => setData(res));
    } catch (error) {
      console.error(error);
    }
  }, [url]);

  const columns = useMemo(() => {
    const targetComponent = getComponentById(id, components);
    if (!targetComponent) return [];
    const childComponents = targetComponent?.children || [];
    return childComponents.map((child) => {
      const columnChildren = child?.children?.[0];
      return {
        title: child.props?.title,
        dataIndex: child.props?.dataIndex,
        render: (text: any, record: Record<string, any>) => {
          const childConfig = getComponentConfig(columnChildren);
          const ChildComponent = childConfig
            ? childConfig.component["runtime"]
            : null;
          return ChildComponent ? (
            <ChildComponent {...child.props} value={text} record={record} />
          ) : null;
        },
      };
    });
  }, [id, components, getComponentConfig]);

  return (
    <AntdTable
      {...restProps}
      columns={columns}
      dataSource={data}
      pagination={false}
      rowKey={(record) => record.id}
    />
  );
};

export default Table;
