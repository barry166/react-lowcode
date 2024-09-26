import useMaterielDropHook from "@/editor/hooks/useMaterielDropHook";
import { extraCommonProps } from "@/editor/utils/material";

interface ModalProps {
  id: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = (props) => {
  const { id, ...restProps } = props;
  const [{ isOver }, drop] = useMaterielDropHook(["Button", "Container"], id);

  return (
    <div
      {...extraCommonProps(restProps)}
      ref={drop}
      className="container py-4 px-4 border border-yellow-100"
      style={{ borderStyle: isOver ? "dashed" : "solid" }}
    >
      <p>弹窗</p>
      {props.children}
    </div>
  );
};

export default Modal;
