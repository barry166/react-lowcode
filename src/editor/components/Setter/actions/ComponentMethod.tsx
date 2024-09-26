import useComponentStore, { IComponent } from "@/editor/store/components";
import useComponentsConfigStore from "@/editor/store/componentsConfig";
import { getComponentById } from "@/editor/store/util";
import { EventAction } from "@/editor/types";
import { Select, TreeSelect } from "antd";
import { DataNode } from "antd/es/tree";
import { useMemo, useState } from "react";

interface IProps {
  value?: EventAction["config"];
  onChange: (config: any) => void;
}
const ComponentMethod: React.FC<IProps> = (props) => {
  const { value, onChange } = props;
  const { components } = useComponentStore();
  const { componentsConfig } = useComponentsConfigStore();
  const [selectedId, setSelectedId] = useState("");
  const [selectedComponent, setSelectedComponent] = useState<IComponent>();
  console.log("ComponentMethod", value);

  const treeData = useMemo(() => {
    const convertComponentsToTreeData = (components: IComponent[]): DataNode[] => {
      return components.map((component: IComponent) => {
        const { id, desc, children } = component;
        return {
          title: desc,
          key: id,
          value: component.id,
          children: children ? convertComponentsToTreeData(children) : [],
        };
      });
    };
    return convertComponentsToTreeData(components);
  }, [components]);

  const handleTreeSelect = (componentId: string) => {
    setSelectedId(componentId);
    const component = getComponentById(componentId, components);
    component && setSelectedComponent(component);
    onChange({ ...value, componentId });
  };

  const methodsOptions = useMemo(() => {
    console.log("methodsOptions...");

    if (!selectedComponent) return;
    const methods = componentsConfig[selectedComponent.type]?.component?.methods || [];
    return methods.map((method) => ({
      label: method.label,
      value: method.name,
    }));
  }, [value, selectedComponent, componentsConfig]);

  const handleMethodChange = (v: string) => {
    onChange({ ...value, name: v, componentId: selectedId });
  };

  return (
    <div className="mt-2">
      <div className="flex items-center">
        <span>选择组件：</span>
        <TreeSelect
          showSearch
          style={{ flex: 1 }}
          value={value?.componentId}
          dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
          placeholder="Please select"
          allowClear
          treeDefaultExpandAll
          onChange={handleTreeSelect}
          treeData={treeData}
        />
      </div>
      <div className="flex mt-4 items-center">
        {methodsOptions?.length && (
          <>
            <span>组件方法：</span>
            <Select
              value={value?.name}
              style={{ flex: 1 }}
              options={methodsOptions}
              onChange={handleMethodChange}
            />
          </>
        )}
      </div>
    </div>
  );
};
export default ComponentMethod;
