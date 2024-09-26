import { useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import useComponentStore from "@/editor/store/components";
import useComponentsConfigStore from "@/editor/store/componentsConfig";
import { getComponentById } from "@/editor/store/util";
import useMaskPosition from "@/editor/hooks/useMaskPosition";

interface HoverMaskProps {
  // 挂载的节点id
  containerId: string;
  // 根节点id
  rootContainerId: string;
  // 当前悬停的组件id
  componentId: string;
}

const HoverMask: React.FC<HoverMaskProps> = (props) => {
  const { containerId, rootContainerId, componentId } = props;
  const { components } = useComponentStore();
  const { getComponentConfig } = useComponentsConfigStore();

  const curComponent = useMemo(
    () => getComponentById(componentId, components),
    [componentId, components]
  );

  const config = getComponentConfig(curComponent);

  // const config = useMemo(
  //   () => (curComponent?.type ? componentsConfig[curComponent?.type] : undefined),
  //   [curComponent?.type]
  // );

  const [position, updatePosition] = useMaskPosition(rootContainerId, curComponent);

  const container = document.querySelector(containerId);

  useEffect(() => {
    updatePosition();
  }, [componentId]);

  return container
    ? createPortal(
        <>
          <div
            style={{
              position: "absolute",
              right: position.right,
              bottom: position.bottom,
              left: position.left,
              top: position.top,
              width: position.width,
              height: position.height,
              pointerEvents: "none",
            }}
            className="border border-dashed border-blue-400"
          >
            <div
              className="absolute right-1  text-sm text-blue-500"
              style={{
                top: position.top === 0 ? "0" : "-20px",
              }}
            >
              {config?.desc}
            </div>
          </div>
        </>,
        container
      )
    : null;
};

export default HoverMask;
