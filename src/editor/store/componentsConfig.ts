import { create } from "zustand";
import { persist } from "zustand/middleware";
import Page from "@/editor/materiels/Page";
import Container from "@/editor/materiels/Container";
import Button from "@/editor/materiels/Button";
import Modal from "@/editor/materiels/Modal";
import { ExportComponent } from "../types";
import { IComponent } from "./components";

export type IComponentConfig = {
  component: ExportComponent;
  desc: string;
  style?: {
    [key: string]: string;
  };
  defaultProps?: {
    [key: string]: string;
  };
};

interface ComponentsConfigStore {
  componentsConfig: {
    [key: string]: IComponentConfig;
  };
  getComponentConfig: (component?: IComponent | null) => IComponentConfig | null;
}

const useComponentsConfigStore = create<ComponentsConfigStore>()(
  persist(
    (set, get) => ({
      componentsConfig: {
        Button: {
          desc: "按钮",
          component: Button,
          defaultProps: {
            text: "Hello World",
            size: "middle",
            type: "default",
          },
        },
        Page: {
          desc: "页面",
          component: Page,
        },
        Container: {
          desc: "容器",
          component: Container,
        },
        Modal: {
          desc: "弹窗",
          component: Modal,
        },
      },
      getComponentConfig: (component?: IComponent | null) =>
        component ? get().componentsConfig?.[component.type] : null,
    }),
    {
      name: "component-config-store",
    }
  )
);

export default useComponentsConfigStore;
