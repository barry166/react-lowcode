import { useState } from "react";
import { Segmented } from "antd";
import Materiel from "../Materiel";
import Outline from "../Outline";
import Source from "../Source";

const options = [
  { value: "materiel", label: "组件" },
  { value: "outline", label: "边框" },
  { value: "source", label: "源码" },
];
const MaterielWrapper = () => {
  const [key, setKey] = useState<string>("materiel");

  return (
    <div className="h-full">
      <Segmented options={options} block value={key} onChange={setKey} />

      {key === "materiel" && <Materiel />}

      {key === "outline" && <Outline />}

      {key === "source" && <Source />}
    </div>
  );
};

export default MaterielWrapper;
