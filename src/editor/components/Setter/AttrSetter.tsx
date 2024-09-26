import { useEffect, useMemo } from "react";
import { Form, Select as AntdSelect, Input as AntdInput, Radio as AntdRadio } from "antd";
import { debounce } from "lodash-es";
import EmptyStatus from "@/components/EmptyStatus";
import useComponentStore from "@/editor/store/components";
import useComponentsConfigStore from "@/editor/store/componentsConfig";
import CommonSetter from "./CommonSetter";
import { SetterItem } from "@/editor/types";

const renderLabel = (text: string) => <span className="text-[#77797f]">{text}</span>;
const renderByType = (item: SetterItem) => {
  switch (item.type) {
    case "select":
      return (
        <AntdSelect>
          {item.options?.map((i) => (
            <AntdSelect.Option key={i.value} value={i.value}>
              {i.label}
            </AntdSelect.Option>
          ))}
        </AntdSelect>
      );
    case "input":
      return <AntdInput />;
    case "textArea":
      return <AntdInput.TextArea rows={2} />;
    case "radio":
      return <AntdRadio />;
    default:
      return null;
  }
};

const AttrSetter = () => {
  const { curComponent, curComponentId, updateComponentProps } = useComponentStore();
  const { getComponentConfig } = useComponentsConfigStore();
  const componentConfig = getComponentConfig(curComponent);
  const [form] = Form.useForm();

  const setter = useMemo(() => componentConfig?.component.setter, [componentConfig]);

  useEffect(() => {
    const mergeProps = {
      ...componentConfig?.defaultProps,
      ...curComponent?.props,
    };
    const values: { [key: string]: any } = {};
    setter && setter.map((item) => item.propKey).forEach((key) => (values[key] = mergeProps[key]));

    form.setFieldsValue(values);
  }, [componentConfig, curComponent, setter]);

  if (!curComponent || !curComponentId || !componentConfig) return <EmptyStatus />;

  const renderSetterItem = () => {
    return (
      setter &&
      setter.map((item) => (
        <Form.Item
          key={item.propKey}
          label={renderLabel(item.label)}
          style={{ fontSize: 14, color: "gray" }}
          name={item.propKey}
        >
          {renderByType(item)}
        </Form.Item>
      ))
    );
  };

  const handleFormChange = (_: any, allValues: any) => {
    updateComponentProps(curComponentId, allValues);
  };

  return (
    <div className="px-2 py-4">
      <Form
        form={form}
        size="small"
        labelCol={{ span: 7 }}
        wrapperCol={{ span: 16 }}
        layout="horizontal"
        labelAlign="left"
        onValuesChange={debounce(handleFormChange)}
      >
        <CommonSetter component={curComponent} />
        {renderSetterItem()}
      </Form>
    </div>
  );
};

export default AttrSetter;
