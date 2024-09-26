import { createElement as h, useState } from "react";
import useComponentConfigStore from "@/editor/store/componentsConfig";
import useComponentStore, { IComponent } from "@/editor/store/components";
import HoverMask from "../HoverMask";
import ClickMask from "../ClickMask";
import { findComponentId } from "@/editor/utils/component";
import { Mode } from "@/editor/types";

const EditArea = () => {
  const { components, curComponentId, setCurrentComponent } = useComponentStore();
  const { getComponentConfig } = useComponentConfigStore((state) => state);
  const [hoverComponentId, setHoverComponentId] = useState("");

  // 递归渲染
  const renderContent = (components: IComponent[] = []): React.ReactNode => {
    if (!components || components.length === 0) return null;
    let result: React.ReactNode[] = [];

    for (let i = 0; i < components.length; i++) {
      const component = components[i];
      const componentConfig = getComponentConfig(component);
      if (!componentConfig) continue;
      const { component: materialComponent, defaultProps } = componentConfig;
      const Component = materialComponent[Mode.DESIGN];
      if (!Component) continue;
      result.push(
        h(
          Component,
          {
            key: component.id,
            id: component.id,
            "data-component-id": component.id,
            style: component?.style,
            ...defaultProps,
            ...component.props,
          },
          renderContent(component.children)
        )
      );
    }
    return result;
  };

  const handleMouseOver: React.MouseEventHandler<HTMLDivElement> = (e) => {
    const target = e.target as HTMLElement;
    if (!target) return;
    const componentId = target.dataset["componentId"];
    componentId && setTimeout(() => setHoverComponentId(componentId), 100);
  };

  const handleClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    const target = e.target as HTMLElement;
    if (!target) return;
    const componentId = findComponentId(target);
    componentId && setCurrentComponent(componentId);
  };

  return (
    <div
      className="h-full overflow-y-auto"
      id="editor-wrapper"
      onMouseOver={handleMouseOver}
      onMouseLeave={() => setHoverComponentId("")}
      onClick={handleClick}
    >
      {renderContent(components)}
      {/* hover遮罩 */}

      {hoverComponentId && (hoverComponentId !== curComponentId || hoverComponentId === "1") && (
        <HoverMask
          rootContainerId="#editor-wrapper"
          containerId="#portal-mask"
          componentId={hoverComponentId}
        />
      )}

      {/* 点击遮罩 */}
      {curComponentId && <ClickMask rootContainerId="#editor-wrapper" containerId="#portal-mask" />}

      <div id="portal-mask"></div>
    </div>
  );
};

export default EditArea;
