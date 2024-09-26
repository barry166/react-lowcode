import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getComponentById } from "./util";
import { Mode } from "fs";

export type IComponent = {
  id: string;
  type: string;
  parentId?: string;
  desc: string;
  props: {
    [key: string]: any;
  };
  children?: IComponent[];
  style?: {
    [key: string]: any;
  };
};

export interface ComponentStore {
  mode: Mode;
  curComponent?: IComponent; // 允许为 null 或 IComponent
  curComponentId?: string;
  components: IComponent[];
  addComponent: (parentId: string, component: IComponent) => void;
  deleteComponent: (componentId: string) => void;
  setCurrentComponent: (componentId?: string) => void;
  updateComponentProps: (
    componentId: string,
    props: any,
    replace?: boolean,
  ) => void;
  updateComponentStyle: (componentId: string, styles?: any) => void;
  changeMode: (mode: Mode) => void;
}

const useComponentStore = create<ComponentStore>()(
  persist(
    (set) => ({
      mode: "design",
      components: [
        {
          id: "1",
          props: {},
          type: "Page",
          desc: "页面",
          children: [
            {
              id: "2",
              type: "Button",
              parentId: "1",
              desc: "按钮",
              props: {
                text: "Hello World",
              },
              events: {},
            },
            {
              id: "3",
              type: "Container",
              parentId: "1",
              desc: "容器",
              props: {},
              children: [
                {
                  id: "4",
                  type: "Button",
                  parentId: "3",
                  desc: "按钮",
                  props: {
                    text: "你好",
                  },
                },
                {
                  id: "5",
                  type: "Button",
                  parentId: "3",
                  desc: "按钮",
                  props: {
                    text: "Ant Design",
                    type: "primary",
                  },
                },
              ],
            },
          ],
        },
      ],
      curComponentId: "",
      curComponent: undefined,
      addComponent: (parentId: string, component: IComponent) => {
        set((state) => {
          if (parentId) {
            const parent = getComponentById(parentId, state.components);
            if (!parent) return state;
            if (!parent.children) {
              parent.children = [];
            }
            parent.children.push(component);
            component.parentId = parentId;

            return { components: [...state.components] };
          }
          return {
            components: [...state.components, component],
          };
        });
      },
      deleteComponent: (componentId: string) => {
        if (!componentId) return;
        set((state) => {
          const component = getComponentById(componentId, state.components);
          if (!component) return state;
          if (component.parentId) {
            const parent = getComponentById(
              component.parentId,
              state.components,
            );
            if (!parent) return state;
            parent.children = parent.children?.filter(
              (c) => c.id !== componentId,
            );
          } else {
            state.components = state.components.filter(
              (c) => c.id !== componentId,
            );
          }
          return { components: [...state.components] };
        });
      },
      setCurrentComponent: (componentId?: string) => {
        set((state) => {
          if (!componentId) {
            return {
              curComponent: undefined,
              curComponentId: "",
            };
          }
          const curComponent = getComponentById(componentId, state.components);
          if (curComponent) {
            return { curComponent, curComponentId: componentId };
          }
          return state;
        });
      },
      updateComponentProps: (
        componentId: string,
        props: any,
        replace = false,
      ) => {
        set((state) => {
          const targetComponent = getComponentById(
            componentId,
            state.components,
          );
          if (!targetComponent) return state;
          if (replace) {
            targetComponent.props = props;
          } else {
            targetComponent.props = { ...targetComponent.props, ...props };
          }
          return { components: [...state.components] };
        });
      },
      updateComponentStyle: (componentId: string, style: any) => {
        set((state) => {
          const targetComponent = getComponentById(
            componentId,
            state.components,
          );
          if (!targetComponent) return state;
          targetComponent.style = style;
          return { components: [...state.components] };
        });
      },
      changeMode: (mode: Mode) => {
        set({ mode });
      },
    }),
    {
      name: "component-store",
    },
  ),
);

export default useComponentStore;
