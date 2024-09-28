import { useMemo, CSSProperties } from "react";
import { Form as AntdForm } from "antd";
import { getComponentById } from "@/editor/store/util";
import useComponentStore from "@/editor/store/components";
import useComponentsConfigStore from "@/editor/store/componentsConfig";

interface FormItemRuntimeProps {
  id: string;
  children?: React.ReactNode;
  style?: CSSProperties;
}

export default function FormItemRuntime(props: FormItemRuntimeProps) {
  const { id, style, ...restProps } = props;
  const { components } = useComponentStore();
  const { getComponentConfig } = useComponentsConfigStore();

  const targetComponent = useMemo(
    () => getComponentById(id, components),
    [id, components],
  );

  const renderChildren = () => {
    if (!targetComponent) return null;
    // 取出form-item下组件
    const childrenComponent = targetComponent?.children?.[0];
    if (!childrenComponent) return null;
    const childrenConfig = getComponentConfig(childrenComponent);
    if (!childrenConfig) return null;
    const ItemComponent = childrenConfig?.component["runtime"];
    if (!ItemComponent) return null;
    return (
      <ItemComponent
        key={childrenComponent.id}
        id={childrenComponent.id}
        {...childrenComponent?.props}
      />
    );
  };

  return (
    <AntdForm.Item {...restProps} style={style}>
      {renderChildren()}
    </AntdForm.Item>
  );
}
