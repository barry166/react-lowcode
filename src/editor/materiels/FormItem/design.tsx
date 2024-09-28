import { useCallback, useMemo } from "react";
import { Form as AntdForm } from "antd";
import useComponentStore from "@/editor/store/components";
import useComponentsConfigStore from "@/editor/store/componentsConfig";
import { getComponentById } from "@/editor/store/util";
import { extraCommonProps } from "@/editor/utils/material";

interface FormItemProps {
  id: string;
  label: string;
  name?: string;
}

const FormItemDesign: React.FC<FormItemProps> = (props) => {
  const { id, label, name, ...rest } = props;
  const { components } = useComponentStore();
  const { getComponentConfig } = useComponentsConfigStore();

  const formItemComponent = useMemo(
    () => getComponentById(id, components),
    [id, components],
  );

  const renderChildrenComponent = useCallback(() => {
    const itemChild = formItemComponent?.children?.[0];
    if (!itemChild) return null;
    const itemChildComponentConfig = getComponentConfig(itemChild);
    const ItemChildComponent = itemChildComponentConfig?.component["design"];
    if (!itemChildComponentConfig || !ItemChildComponent) return null;
    return <ItemChildComponent />;
  }, [formItemComponent, getComponentConfig]);

  return (
    <AntdForm.Item
      {...extraCommonProps(rest)}
      label={label}
      name={name}
      id={id}
      data-component-id={id}
    >
      {renderChildrenComponent()}
    </AntdForm.Item>
  );
};

export default FormItemDesign;
