import { CSSProperties } from "react";

interface PageProps {
  id: string;
  children: React.ReactNode;
  style: CSSProperties;
}

const Page: React.FC<PageProps> = (props) => {
  const { id, style, ...restProps } = props;

  return (
    <div {...restProps} className="page px-4 py-4 h-full border border-transparent">
      {props.children}
    </div>
  );
};

export default Page;
