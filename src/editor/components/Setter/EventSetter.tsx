import { useCallback, useEffect, useMemo, useState } from "react";
import { Button, Collapse, Dropdown, Space } from "antd";
import {
  PlusOutlined,
  SettingOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { cloneDeep } from "lodash-es";
import useComponentStore from "@/editor/store/components";
import useComponentsConfigStore from "@/editor/store/componentsConfig";
import EmptyStatus from "@/components/EmptyStatus";
import { EventAction, IEvent } from "@/editor/types";
import EventModal from "./EventModal";

type CollapseItems = {
  key: string;
  label: string;
  children?: React.ReactNode;
  extra?: React.ReactNode;
}[];
const EventSetter = () => {
  const { curComponent, updateComponentProps } = useComponentStore();
  const { getComponentConfig } = useComponentsConfigStore();
  const [collapseItems, setCollapseItems] = useState<CollapseItems>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [curEvent, setCurEvent] = useState<{
    type: string;
    label: string;
    actionIndex?: number;
  }>();
  const [modalType, setModalType] = useState<"add" | "edit">("add");
  const [modalData, setModalData] = useState<EventAction>();

  const config = getComponentConfig(curComponent);
  const events = useMemo(() => config?.component?.events, [config]); // 组件支持的事件列表

  const editEventAction = useCallback(
    (action: EventAction, { item, index }: { item: IEvent; index: number }) => {
      setCurEvent({
        type: item.type,
        label: item.label,
        actionIndex: index,
      });
      setModalType("edit");
      setModalData(action);
      setModalVisible(true);
    },
    [],
  );
  const genExtra = useCallback(
    (item: IEvent) => (
      <Space>
        <PlusOutlined onClick={() => addEventAction(item)} />
        <DeleteOutlined />
      </Space>
    ),
    [],
  );

  useEffect(() => {
    const showItems: CollapseItems = [];
    events &&
      events.forEach((item, index) => {
        const targetEvent: IEvent = curComponent?.props?.[item.type];
        const actions = targetEvent?.actions || [];
        if (targetEvent && actions?.length > 0) {
          showItems.push({
            key: item.type,
            label: item.label,
            extra: genExtra(item),
            children: actions.map((action, index) => (
              <div
                key={`action-${index}`}
                data-action-type={action.type}
                className="mb-4 flex bg-[#f7f7f9] rounded-sm px-4 py-4 border border-transparent hover:border hover:border-blue-300"
              >
                <div className="flex-1">
                  <div className="font-bold mb-2">{action.type}</div>
                  <div className="text-sm text-gray-500">{action.label}</div>
                </div>
                <div className="w-[40px]">
                  <Space>
                    <SettingOutlined
                      className="cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        editEventAction(action, { item, index });
                      }}
                    />
                    <DeleteOutlined
                      className="cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    />
                  </Space>
                </div>
              </div>
            )),
          });
        }
      });
    setCollapseItems(showItems);
  }, [curComponent?.props, events, editEventAction, genExtra]);

  const addEventAction = (item: IEvent) => {
    setModalData(undefined);
    debugger;
    setCurEvent({
      type: item.type,
      label: item.label,
    });
    setModalType("add");
    setModalVisible(true);
  };

  const onEventMenuClick = useCallback(
    (item: IEvent) => {
      setCollapseItems((prev) =>
        prev.findIndex((i) => i.key === item.type) > -1
          ? prev
          : [
              ...prev,
              {
                key: item.type,
                label: item.label,
                extra: genExtra(item),
                children: [],
              },
            ],
      );
    },
    [genExtra],
  );

  const eventsMenu = useMemo(() => {
    return events?.map((item, index) => ({
      key: index,
      label: <span onClick={() => onEventMenuClick(item)}>{item.label}</span>,
    }));
  }, [events, onEventMenuClick]);

  const handleCollapseChange = (key: string) => {};

  const handleModalOk = (config?: EventAction) => {
    if (!curComponent?.id || !curEvent || !config) {
      setModalVisible(false);
      return;
    }

    if (modalType === "add") {
      let targetEvent: IEvent = cloneDeep(curComponent?.props?.[curEvent.type]);
      if (!targetEvent) {
        targetEvent = {
          type: curEvent.type as any,
          label: curEvent.label,
          actions: [],
        };
      }
      if (!targetEvent.actions) {
        targetEvent.actions = [];
      }
      targetEvent.actions.push(config);
      updateComponentProps(curComponent?.id, {
        [curEvent.type]: targetEvent,
      });
    } else if (modalType === "edit") {
      let targetEvent: IEvent = cloneDeep(curComponent?.props?.[curEvent.type]);
      const targetAction = targetEvent.actions?.[curEvent!.actionIndex!];
      targetEvent["actions"]![curEvent!.actionIndex!] = {
        ...targetAction,
        ...config,
      };
      updateComponentProps(curComponent?.id, {
        [curEvent.type]: targetEvent,
      });
    }
    setModalVisible(false);
  };

  const handleModalCancel = () => {
    setModalVisible(false);
  };

  if (!config?.component || !config?.component.events) return <EmptyStatus />;

  return (
    <div className="h-full py-4">
      <div className="px-4">
        <Dropdown
          menu={{ items: eventsMenu }}
          placement="bottom"
          trigger={["click"]}
        >
          <Button block className="border-blue-400 text-sm">
            添加事件
          </Button>
        </Dropdown>
      </div>

      <div className="mt-5">
        {collapseItems.length > 0 && (
          <Collapse
            // onChange={handleCollapseChange}
            expandIconPosition="end"
            items={collapseItems}
            size="small"
            activeKey={collapseItems.map((i) => i.key)}
            defaultActiveKey={collapseItems.map((i) => i.key)}
          />
        )}
      </div>
      <EventModal
        visible={modalVisible}
        onOk={(config) => handleModalOk(config)}
        onCancel={handleModalCancel}
        type={modalType}
        data={modalData}
      />
    </div>
  );
};
export default EventSetter;
