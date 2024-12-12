import { ReactNode } from "react";

interface PageItemsProps {
  children: ReactNode;
}

export const PageItems: React.FC<PageItemsProps> = ({ children }) => (
  <div className={"grid lg:grid-cols-2 gap-6 mt-6 grid-cols-1"}>{children}</div>
);
