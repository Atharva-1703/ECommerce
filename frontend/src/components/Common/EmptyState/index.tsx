"use client";

import { Icon } from "@iconify/react";

interface EmptyStateProps {
  icon: string;
  title: string;
  subtitle?: string;
  className?: string;
}

export default function EmptyState({
  icon,
  title,
  subtitle,
  className = "",
}: EmptyStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-4 py-16 ${className}`}
    >
      <Icon icon={icon} className="w-20 h-20 text-gray-400 md:w-24 md:h-24" />
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 text-center">
        {title}
      </h1>
      {subtitle && (
        <p className="text-gray-500 text-center text-lg md:text-xl max-w-xs">
          {subtitle}
        </p>
      )}
    </div>
  );
}
