import { Segmented } from "antd";
import { useMemo, useState } from "react";
import AttrSetter from "./AttrSetter";
import StyleSetter from "./StyleSetter";
import EventSetter from "./EventSetter";
import useComponentStore from "@/editor/store/components";

const options = [
  { value: "attr", label: "属性" },
  { value: "style", label: "外观" },
  { value: "event", label: "事件" },
];
const Setter = () => {
  const [key, setKey] = useState<string>("attr");
  const { curComponent } = useComponentStore();
  const showEvent = useMemo(
    () => curComponent?.type && !["Page", "Container"].includes(curComponent?.type),
    [curComponent?.type]
  );
  const keyOptions = useMemo(
    () => (showEvent ? options : options.filter((item) => item.value !== "event")),
    [showEvent]
  );

  return (
    <div className="h-full">
      <Segmented options={keyOptions} block value={key} onChange={setKey} />

      {key === "attr" && <AttrSetter />}

      {key === "style" && <StyleSetter />}

      {key === "event" && showEvent && <EventSetter />}
    </div>
  );
};

export default Setter;
