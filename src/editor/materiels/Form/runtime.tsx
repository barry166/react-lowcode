import { CSSProperties, forwardRef, useImperativeHandle, useMemo } from "react";
import { Form as AntdForm } from "antd";
import { getComponentById } from "@/editor/store/util";
import useComponentStore from "@/editor/store/components";
import useComponentsConfigStore from "@/editor/store/componentsConfig";

interface FormRuntimeProps {
  id: string;
  children?: React.ReactNode;
  style?: CSSProperties;
  onFinish?: (values: any) => void;
}

interface FormRef {
  submit: (values: any) => void;
  getValues: () => any;
}

const FormRuntime: React.ForwardRefRenderFunction<FormRef, FormRuntimeProps> = (
  props,
  ref,
) => {
  const { id, style, onFinish, ...restProps } = props;
  const { components } = useComponentStore();
  const { getComponentConfig } = useComponentsConfigStore();
  const [form] = AntdForm.useForm();

  useImperativeHandle(ref, () => ({
    submit: (values: any) => {
      form.submit();
      console.log("submit", form.getFieldsValue());
    },
    getValues: () => {
      return form.getFieldsValue();
    },
  }));

  const targetComponent = useMemo(
    () => getComponentById(id, components),
    [id, components],
  );

  const renderChildren = () => {
    if (!targetComponent) return null;
    const formItems = targetComponent?.children || [];
    if (!formItems || formItems.length === 0) return null;
    return formItems.map((item, index) => {
      const itemConfig = getComponentConfig(item);
      const ItemComponent = itemConfig?.component["runtime"];
      if (!ItemComponent) return null;
      return <ItemComponent key={index} id={item.id} {...item?.props} />;
    });
  };

  const save = (values: any) => {
    onFinish?.(values);
  };

  return (
    <div
      className="px-4 py-4 pt-8 m-auto min-h-20 border border-transparent"
      style={style}
    >
      <AntdForm {...restProps} style={style} form={form} onFinish={save}>
        {renderChildren()}
      </AntdForm>
    </div>
  );
};

export default forwardRef(FormRuntime);
