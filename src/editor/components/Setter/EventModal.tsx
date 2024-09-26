import { type Key, useState, useMemo, useEffect } from "react";
import { Modal, Tree } from "antd";
import type { TreeDataNode } from "antd";
import { CheckOutlined, ClockCircleOutlined } from "@ant-design/icons";
import GoLink from "./actions/GoLink";
import Message from "./actions/Message";
import CustomScript from "./actions/CustomScript";
import { ActionType, EventAction } from "@/editor/types";
import ComponentMethod from "./actions/ComponentMethod";

const actions = [
  { key: "url", label: "跳转链接", desc: "新开页面跳转到指定链接" },
  { key: "message", label: "消息提示", desc: "弹出消息提示" },
  { key: "customScript", label: "自定义JS", desc: "执行自定义JS脚本" },
  { key: "componentMethod", label: "组件联动", desc: "选择对应组件方法调用" },
];

const EventModal = ({
  type,
  data,
  visible,
  onOk,
  onCancel,
}: {
  type: "add" | "edit";
  visible: boolean;
  data?: EventAction;
  onOk?: (config?: EventAction) => void;
  onCancel?: () => void;
}) => {
  const [selectedKeys, setSelectedKeys] = useState<Key[]>(() =>
    type === "edit" && data ? [data.type] : ["url"],
  );
  const actionsData: TreeDataNode[] = useMemo(() => {
    const data = [
      {
        title: "动作列表",
        key: "action",
        children: actions.map((action) => ({
          title: action.label,
          key: action.key,
          icon: ({ selected }: { selected?: boolean }) =>
            selected ? <CheckOutlined /> : <ClockCircleOutlined />,
        })),
      },
    ];
    return data;
  }, []);

  const [curConfig, setCurConfig] = useState<EventAction | undefined>(() =>
    type === "edit" ? data : undefined,
  );

  useEffect(() => {
    setCurConfig(data);
    if (type === "edit") {
      data?.type && setSelectedKeys([data.type]);
    } else {
      setSelectedKeys(["url"]);
    }
  }, [data, type, visible]);

  const onSelect = (selectedKeys: Key[]) => {
    setSelectedKeys(selectedKeys);
  };

  const changeAction = (key: ActionType, value: any) => {
    setCurConfig({ type: key, label: curAction!.label, config: value });
  };

  const handleOk = () => {
    onOk?.(curConfig);
  };

  const handleCancel = () => {
    setCurConfig(undefined);
    onCancel?.();
  };

  const selectedKey = selectedKeys[0];
  const curAction = useMemo(
    () => actions.find((i) => i.key === selectedKeys[0]),
    [selectedKeys],
  );

  return (
    <Modal
      title="动作配置"
      width={800}
      open={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="确认"
      cancelText="取消"
      destroyOnClose
      maskClosable
    >
      <div className="flex h-[450px]">
        <div className="left w-[190px] h-full pt-3 border border-gray-100">
          <Tree
            showIcon
            showLine
            defaultExpandAll
            selectedKeys={selectedKeys}
            treeData={actionsData}
            blockNode
            onSelect={onSelect}
          />
        </div>
        <div className="right h-full flex-1 py-4 px-4">
          {!!selectedKey && (
            <>
              <div className="flex flex-col mb-4">
                <span className="font-bold">动作说明</span>
                <span className="mt-1 text-gray-500 text-sm">
                  {curAction?.desc}
                </span>
              </div>
              <div className="font-bold">基础设置</div>
            </>
          )}

          {selectedKey === "url" && (
            <GoLink
              value={curConfig?.config}
              onChange={(config) => changeAction("url", config)}
            />
          )}
          {selectedKey === "message" && (
            <Message
              value={curConfig?.config}
              onChange={(config: any) => changeAction("message", config)}
            />
          )}
          {selectedKey === "customScript" && (
            <CustomScript
              onChange={(config: any) => changeAction("customScript", config)}
            />
          )}
          {selectedKey === "componentMethod" && (
            <ComponentMethod
              onChange={(config: any) =>
                changeAction("componentMethod", config)
              }
            />
          )}
        </div>
      </div>
    </Modal>
  );
};

export default EventModal;
