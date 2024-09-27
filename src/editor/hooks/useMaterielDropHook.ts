import { useDrop } from "react-dnd";
import useComponentStore, { IComponent } from "../store/components";

export default function useMaterielDropHook(
  accept: string[] | string,
  id: string,
) {
  const { addComponent, setCurrentComponent } = useComponentStore();

  const [collect, drop] = useDrop({
    accept,
    drop: (item: IComponent, monitor) => {
      console.log("page item", item);
      // 如果已经处理了放置则不再处理
      if (monitor.didDrop()) return;
      const newComponent: IComponent = {
        id: `@${item.type}-${Date.now().toString().slice(-5)}`,
        desc: item.desc,
        type: item.type,
        props: {},
      };
      addComponent(id, newComponent);
      setCurrentComponent(newComponent.id);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver({ shallow: true }),
    }),
  });

  return [collect, drop] as const;
}
