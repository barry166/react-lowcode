import { forwardRef, useImperativeHandle, useState } from "react";
import { Modal as AntdModal } from "antd";

interface ModalProps {
  id: string;
  children: React.ReactNode;
}

interface ModalRef {
  open: (props?: any) => void;
  close: () => void;
}

const Modal: React.ForwardRefRenderFunction<ModalRef, ModalProps> = (props, ref) => {
  const { id, ...restProps } = props;
  const [open, setOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    open: () => {
      setOpen(true);
    },
    close: () => {
      setOpen(false);
    },
  }));

  return (
    <AntdModal
      {...restProps}
      open={open}
      onCancel={() => setOpen(false)}
      onOk={() => setOpen(false)}
      className="container py-4"
    >
      {props.children}
    </AntdModal>
  );
};

export default forwardRef(Modal);
