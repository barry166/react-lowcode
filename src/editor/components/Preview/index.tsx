import { createElement as h, useRef } from "react";
import { message } from "antd";
import useComponentConfigStore from "@/editor/store/componentsConfig";
import useComponentStore, { IComponent } from "@/editor/store/components";
import { IEvent, Mode } from "../../types";

const Preview = () => {
  const { components } = useComponentStore();
  const { getComponentConfig } = useComponentConfigStore((state) => state);
  const refsMap = useRef<Map<string, any>>(new Map());

  const handleEvents = (component: IComponent) => {
    let eventsHandleFn: Record<string, any> = {};
    const supportEvents = getComponentConfig(component)?.component?.events;
    supportEvents?.forEach((event) => {
      const targetEvent: IEvent = component.props[event.type];
      if (targetEvent) {
        eventsHandleFn[event.type] = (...args: any[]) => {
          targetEvent.actions?.forEach((action) => {
            if (action.type === "url") {
              window.open(action.config?.url, action?.config?.blank ? "_blank" : " _self");
            } else if (action.type === "message") {
              const { type, content } = action.config || {};
              const validTypes = ["success", "info", "warning", "error"];
              if (!validTypes.includes(type)) return;
              message[type as unknown as keyof typeof message](content);
            } else if (action.type === "customScript") {
              try {
                const { content } = action.config || {};
                new Function("context", "args", content)(
                  { name: component.type, id: component.id },
                  args
                );
              } catch (error) {
                console.log("自定义脚本执行出错", error);
              }
            } else if (action.type === "componentMethod") {
              const componentRef = refsMap.current.get(action?.config?.componentId);
              if (!componentRef) return;
              const { name: methodName } = action.config || {};
              componentRef[methodName](...args);
            }
          });
        };
      }
    });

    return eventsHandleFn;
  };

  // 递归渲染
  const renderContent = (components: IComponent[] = []): React.ReactNode => {
    if (!components || components.length === 0) return null;
    let result: React.ReactNode[] = [];

    for (let i = 0; i < components.length; i++) {
      const component = components[i];
      const componentConfig = getComponentConfig(component);
      if (!componentConfig) continue;
      const { component: materialComponent, defaultProps } = componentConfig;
      const Component = materialComponent[Mode.RUNTIME];
      if (!Component) continue;
      // 检查是否是函数组件
      const isFunctionComponent = typeof Component === "function" && !Component.prototype?.render;

      result.push(
        h(
          Component,
          {
            key: component.id,
            id: component.id,
            "data-component-id": component.id,
            style: component?.style,
            // 函数组件不传递ref
            ref: isFunctionComponent
              ? null
              : (ref: Record<string, any>) => refsMap.current.set(component.id, ref),

            ...defaultProps,
            ...component.props,
            ...handleEvents(component),
          },
          renderContent(component.children)
        )
      );
    }
    return result;
  };

  return (
    <div className="h-full overflow-y-auto" id="editor-wrapper">
      {renderContent(components)}
    </div>
  );
};

export default Preview;
