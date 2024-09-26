import { useMemo } from "react";
import useComponentStore, { IComponent } from "@/editor/store/components";
import { Tree } from "antd";
import { DataNode } from "antd/es/tree";
import { Key } from "antd/es/table/interface";

const Outline = () => {
  const { components, setCurrentComponent } = useComponentStore();

  const treeData = useMemo(() => {
    const convertComponentsToTreeData = (components: IComponent[]): DataNode[] => {
      return components.map((component: IComponent) => {
        const { id, desc, children } = component;
        return {
          title: desc,
          key: id,
          children: children ? convertComponentsToTreeData(children) : [],
        };
      });
    };
    return convertComponentsToTreeData(components);
  }, [components]);

  const onSelect = (selectedKeys: Key[]) => {
    selectedKeys.length && setCurrentComponent(selectedKeys[0] as string);
  };

  return (
    <div className="py-4 px-2">
      <Tree defaultExpandAll showLine treeData={treeData} onSelect={onSelect} />
    </div>
  );
};

export default Outline;
