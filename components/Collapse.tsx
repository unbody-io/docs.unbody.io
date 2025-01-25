import { Accordion, AccordionItem } from "@nextui-org/react";
import React from "react";

interface CollapseProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

const Collapse: React.FC<CollapseProps> = ({
  children,
  title = "Response",
  className = "",
}) => {
  return (
    <div className={`w-full my-4 ${className}`}>
      <Accordion className="px-0" selectionMode="single">
        <AccordionItem
          key="1"
          aria-label={title}
          title={
            <span className="text-foreground/90 font-medium">{title}</span>
          }
          className="bg-white dark:bg-black ring-1 ring-inset ring-gray-300 dark:ring-neutral-700 contrast-more:ring-gray-900 contrast-more:dark:ring-gray-50 rounded-lg overflow-hidden"
          classNames={{
            content: "pb-4",
            heading: "px-4",
            trigger: "py-3",
          }}
        >
          <div className="px-4">{children}</div>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Collapse;
