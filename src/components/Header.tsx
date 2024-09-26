import useComponentStore from "@/editor/store/components";
import { Mode } from "@/editor/types";
import { Button } from "antd";

const Header = () => {
  const { mode, changeMode } = useComponentStore();
  return (
    <div className="h-[45px] flex justify-between items-center px-8 border-b border-gray-200">
      <span>低代码编辑器</span>
      <Button
        type="primary"
        style={{ width: mode === "design" ? 72 : 90 }}
        onClick={() => changeMode(mode === Mode.DESIGN ? Mode.RUNTIME : Mode.DESIGN)}
      >
        {mode === Mode.DESIGN ? "预览" : "退出预览"}
      </Button>
    </div>
  );
};

export default Header;
