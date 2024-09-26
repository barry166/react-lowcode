import { useCallback, useEffect, useState } from "react";
import { useSize } from "ahooks";
import { IComponent } from "../store/components";

const findTarget = (rootContainer: Element, curComponentId: string) => {
  return rootContainer.querySelector(`[data-component-id="${curComponentId}"]`);
};

export default function useMaskPosition(rootContainerId: string, curComponent: IComponent | null) {
  const [position, setPosition] = useState({
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    width: 0,
    height: 0,
  });

  const updatePosition = useCallback(() => {
    const rootContainer = document.querySelector(rootContainerId);
    if (!rootContainer || !curComponent) return;
    const curElement = findTarget(rootContainer, curComponent?.id);

    const rootContainerPosition = rootContainer?.getBoundingClientRect();
    const containerPosition = curElement?.getBoundingClientRect();

    if (!rootContainerPosition || !containerPosition) return;

    setPosition((p) => ({
      ...p,
      top: containerPosition?.top - rootContainerPosition?.top,
      left: containerPosition?.left - rootContainerPosition?.left,
      width: containerPosition.width,
      height: containerPosition.height,
    }));
  }, [rootContainerId, curComponent]);

  const size = useSize(document.querySelector(rootContainerId));

  useEffect(() => {
    updatePosition();
  }, [size, updatePosition]);

  return [position, updatePosition] as const;
}
