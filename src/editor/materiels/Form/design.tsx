import { CSSProperties, useMemo, useState } from "react";
import { Form as AntdForm } from "antd";
import { useDrop } from "react-dnd";
import { extraCommonProps, omitProps } from "@/editor/utils/material";
import useComponentStore from "@/editor/store/components";
import useComponentsConfigStore from "@/editor/store/componentsConfig";
import { getComponentById } from "@/editor/store/util";
import FormItemDesign from "../FormItem/design";

interface FormProps {
  id: string;
  children?: React.ReactNode;
  style?: CSSProperties;
}
const FormDesign: React.FC<FormProps> = (props) => {
  const { id, style, ...restProps } = props;
  const { components, addComponent } = useComponentStore();
  const { componentsConfig, getComponentConfig } = useComponentsConfigStore();
  const [count, setCount] = useState(1);

  const [{ isOver }, drop] = useDrop({
    accept: ["Button", "DatePicker", "Input"],
    drop: (item: { type: string; desc: string }) => {
      console.log("Form add item", item);
      const formItemId = `form-item-${Date.now()}`;
      const formItemChildId = `${item.type}-${Date.now()}`;
      // 先添加form-item组件
      const formItemCompoent = {
        id: formItemId,
        type: "FormItem",
        desc: "表单项",
        props: {
          ...componentsConfig["FormItem"]!.defaultProps,
        },
      };
      const formItemChildComponent = {
        id: formItemChildId,
        type: item.type,
        desc: item.desc,
        props: {
          ...componentsConfig[item.type]!.defaultProps,
          name: `${item.type}-${Date.now()}`,
          label: `${item.type}-${count}`,
        },
      };
      setCount(count + 1);
      addComponent(id, formItemCompoent);
      // 将组件添加到form-item中渲染
      addComponent(formItemId, formItemChildComponent);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver({ shallow: true }),
    }),
  });

  const targetComponent = useMemo(
    () => getComponentById(id, components),
    [id, components],
  );

  const renderChildren = () => {
    const childrens = targetComponent?.children || [];
    if (!childrens || childrens.length === 0) return null;
    return childrens.map((child) => {
      // 获取form-item下组件
      const itemComponent = child?.children?.[0];
      if (!itemComponent) return null;
      return (
        <FormItemDesign
          {...omitProps(child?.props, ["style", "data-component-id"])}
          label={child?.props?.label}
          key={child.id}
          id={child.id}
        ></FormItemDesign>
      );
    });
  };

  return (
    <div
      {...extraCommonProps(restProps)}
      ref={drop}
      className="px-4 py-4 pt-8 m-auto min-h-20 border border-transparent"
      style={{
        ...style,
        backgroundColor: isOver ? "#f5f7fe" : "transparent",
      }}
    >
      <AntdForm
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        style={{ width: "100%" }}
        {...omitProps(restProps, ["style", "data-component-id"])}
      >
        {renderChildren()}
      </AntdForm>
    </div>
  );
};

export default FormDesign;
