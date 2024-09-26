import { useCallback, useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import { Dropdown, Space } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import useMaskPosition from "@/editor/hooks/useMaskPosition";
import useComponentStore from "@/editor/store/components";
import useComponentsConfigStore from "@/editor/store/componentsConfig";
import { findParents } from "@/editor/utils/component";

const ClickMask = ({
  rootContainerId,
  containerId,
}: {
  rootContainerId: string;
  containerId: string;
}) => {
  const { components, curComponent, curComponentId, deleteComponent, setCurrentComponent } =
    useComponentStore();
  const { getComponentConfig } = useComponentsConfigStore();
  const componentConfig = getComponentConfig(curComponent);

  const mountContainer = document.querySelector(containerId);
  const [position, updatePosition] = useMaskPosition(rootContainerId, curComponent!);

  useEffect(() => {
    setTimeout(updatePosition, 100);
  }, [curComponentId, components, updatePosition]);

  const delComponent = useCallback(() => {
    curComponentId && deleteComponent(curComponentId);
    setCurrentComponent();
  }, [deleteComponent, curComponentId]);

  const maskStyles = useMemo(
    () => ({
      top: position.top,
      left: position.left,
      right: position.right,
      bottom: position.bottom,
      width: position.width,
      height: position.height,
    }),
    [position]
  );

  const parentMenuItems = useMemo(() => {
    const parents = findParents(curComponentId!, components);

    return parents.map((item) => ({
      key: item.id,
      label: (
        <span className="text-sm" onClick={() => setCurrentComponent(item.id)}>
          {item.desc}
        </span>
      ),
    }));
  }, [curComponentId, components, setCurrentComponent]);

  return mountContainer
    ? createPortal(
        <>
          <div
            className="absolute"
            style={{
              ...maskStyles,
              pointerEvents: "none",
              backgroundColor: "rgba(32, 93, 217, .05)",
              border: "1px solid #205dd9",
            }}
          />
          {/* 根组件不允许删除 */}
          {curComponent?.type !== "Page" && (
            <div
              className="absolute text-sm text-white"
              style={{
                position: "absolute",
                left: position.left,
                top: position.top - 20,
              }}
            >
              <div className="bg-[#205dd9] px-2 h-[24px] flex items-center">
                <Space size={8}>
                  <Dropdown menu={{ items: parentMenuItems }}>
                    <span className="cursor-pointer">{componentConfig!.desc}</span>
                  </Dropdown>
                  <DeleteOutlined className="cursor-pointer" onClick={delComponent} />
                </Space>
              </div>
            </div>
          )}
        </>,
        mountContainer
      )
    : null;
};

export default ClickMask;
