import Editor from "@/editor";
import Header from "./components/Header";
import useComponentStore from "./editor/store/components";
import Preview from "./editor//components/Preview";
import { Mode } from "./editor/types";

function App() {
  const { mode } = useComponentStore();
  return (
    <div className="w-full h-screen">
      <Header />
      {mode === Mode.DESIGN ? <Editor /> : <Preview />}
    </div>
  );
}

export default App;
