import { Allotment } from "allotment";
import MaterielWrapper from "./components/MaterielWrapper";
import EditArea from "./components/EditArea";
import Setter from "./components/Setter";
import "allotment/dist/style.css";

type Props = {};

const Editor = (props: Props) => {
  return (
    <div className="h-[calc(100vh-45px)]">
      <Allotment>
        <Allotment.Pane minSize={280} preferredSize={280} maxSize={280}>
          <MaterielWrapper />
        </Allotment.Pane>
        <Allotment.Pane>
          <EditArea />
        </Allotment.Pane>
        <Allotment.Pane minSize={280} preferredSize={280} maxSize={500}>
          <Setter />
        </Allotment.Pane>
      </Allotment>
    </div>
  );
};

export default Editor;
