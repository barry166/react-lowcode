import { useDrag } from "react-dnd";

const MaterialItem = ({ desc, type }: { desc: string; type: string }) => {
  const [{ opacity }, drag] = useDrag(
    () => ({
      type,
      item: { type, desc },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.7 : 1,
      }),
    }),
    []
  );

  return (
    <div
      ref={drag}
      className="px-2 w-[112px] h-[32px] border border-gray-200 mr-[2px] mb-[12px] ml-[10px] flex items-center text-gray-500 cursor-pointer"
      style={{ opacity }}
    >
      {desc}
    </div>
  );
};

export default MaterialItem;
