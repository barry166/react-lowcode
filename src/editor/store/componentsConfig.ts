import { create } from "zustand";
import { persist } from "zustand/middleware";
import Page from "@/editor/materiels/Page";
import Container from "@/editor/materiels/Container";
import Button from "@/editor/materiels/Button";
import Input from "@/editor/materiels/Input";
import Modal from "@/editor/materiels/Modal";
import Table from "@/editor/materiels/Table";
import TableColumn from "@/editor/materiels/TableColumn";
import Form from "@/editor/materiels/Form";
import FormItem from "@/editor/materiels/FormItem";
import DatePicker from "@/editor/materiels/DatePicker";
import { ExportComponent } from "../types";
import { IComponent } from "./components";

export type IComponentConfig = {
  component: ExportComponent;
  desc: string;
  style?: {
    [key: string]: string;
  };
  defaultProps?: {
    [key: string]: any;
  };
};

interface ComponentsConfigStore {
  componentsConfig: {
    [key: string]: IComponentConfig;
  };
  getComponentConfig: (
    component?: IComponent | null,
  ) => IComponentConfig | null;
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
        Input: {
          desc: "输入框",
          component: Input,
          defaultProps: {
            placeholder: "请输入",
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
        DatePicker: {
          desc: "日期选择器",
          component: DatePicker,
          defaultProps: {
            format: "YYYY-MM-DD",
          },
        },
        Table: {
          desc: "表格",
          component: Table,
          defaultProps: {
            size: "middle",
            columns: [],
            dataSource: [],
          },
        },
        TableColumn: {
          desc: "表格列",
          component: TableColumn,
          defaultProps: {
            title: "新列",
            dataIndex: ``,
            width: 150,
          },
        },
        Form: {
          desc: "表单",
          component: Form,
          defaultProps: {
            title: "表单",
          },
        },
        FormItem: {
          desc: "表单项",
          component: FormItem,
          defaultProps: {
            label: "表单项",
            name: "form-item",
          },
        },
      },
      getComponentConfig: (component?: IComponent | null) =>
        component ? get().componentsConfig?.[component.type] : null,
    }),
    {
      name: "component-config-store",
    },
  ),
);

export default useComponentsConfigStore;
