"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useState, useRef, ReactNode } from "react";

interface AccordionProps {
  title: string;
  icon: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

const Accordion = ({
  title,
  icon,
  children,
  defaultOpen = false,
}: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const contentRef = useRef<HTMLDivElement>(null);
  return (
    <div className="border border-gray-200  rounded-xl overflow-hidden transition-all">
      {/* Header */}
      <button
        className="flex justify-between items-center w-full p-4 hover:bg-gray-50 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium text-gray-800">
          <Icon icon={icon} className="inline-flex w-5 h-5 mx-2"/>
          {title}
        </span>
        <Icon
          icon="mdi:chevron-down"
          className={`w-6 h-6 text-gray-500 transform transition-transform duration-300 ${
            isOpen && "rotate-180"
          }`}
        />
      </button>
      <div
        ref={contentRef}
        style={{ maxHeight: isOpen ? contentRef.current?.scrollHeight : "0px" }}
        className="overflow-hidden transition-[max-height] duration-500 ease-in-out bg-gray-50"
      >
        <div className="px-4 py-3 text-gray-700">{children}</div>
      </div>
    </div>
  );
};

export default Accordion;
