import useComponentConfigStore from "@/editor/store/componentsConfig";
import MaterialItem from "./MaterielItem";
const Materiel = () => {
  const { componentsConfig } = useComponentConfigStore();

  const renderDragItem = () => {
    return Object.keys(componentsConfig)
      .filter((i) => i !== "Page")
      .map((key) => {
        return (
          <MaterialItem
            key={key}
            desc={componentsConfig[key].desc}
            type={key}
          />
        );
      });
  };

  return (
    <div className="flex flex-wrap items-center px-2 py-4">
      {renderDragItem()}
    </div>
  );
};

export default Materiel;
