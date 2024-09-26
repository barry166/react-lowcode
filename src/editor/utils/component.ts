import { IComponent } from "../store/components";
import { getComponentById } from "../store/util";

/**
 * 一直往上寻找有设置component-id的节点
 * @param element 当前节点
 * @returns
 */
export const findComponentId = (element: HTMLElement): string | null => {
  let currentElement = element;
  while (currentElement) {
    const componentId = currentElement.dataset["componentId"];
    if (componentId) return componentId;
    currentElement = currentElement.parentNode as HTMLElement;
  }
  return null;
};

/**
 * 根据当前component查找所有父节点
 * @param curComponentId 当前component id
 */
export const findParents = (curComponentId: string, components: IComponent[]) => {
  const parents: IComponent[] = [];
  let currentComponent = getComponentById(curComponentId, components);
  while (currentComponent) {
    const { parentId } = currentComponent;
    if (!parentId) break;
    currentComponent = getComponentById(parentId, components);
    currentComponent && parents.push(currentComponent);
  }
  return parents;
};

