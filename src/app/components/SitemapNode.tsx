import React from 'react';
import { motion } from 'motion/react';
import { twMerge } from 'tailwind-merge';
import { LucideIcon } from 'lucide-react';

interface SitemapNodeProps {
  label: string;
  icon?: LucideIcon;
  className?: string;
  variant?: 'root' | 'category' | 'item' | 'subItem';
  style?: React.CSSProperties;
}

export const SitemapNode: React.FC<SitemapNodeProps> = ({
  label,
  icon: Icon,
  className,
  variant = 'item',
  style,
}) => {
  const baseClasses = "flex items-center justify-center px-4 py-3 rounded-lg shadow-sm border transition-all duration-200 hover:shadow-md cursor-default text-sm font-medium z-10 relative box-border";
  
  const variantStyles = {
    root: "w-48 bg-blue-600 text-white border-blue-700 text-base font-bold",
    category: "w-40 bg-emerald-700 text-white border-emerald-800 font-semibold text-center h-16 items-center justify-center flex",
    item: "w-full bg-white text-gray-700 border-l-4 border-gray-200 hover:bg-gray-50 text-left justify-start pl-3 py-2 text-xs",
    subItem: "w-full bg-white text-gray-600 border-l-2 border-gray-200 hover:bg-gray-50 text-left justify-start pl-2 py-1.5 text-[11px]",
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={twMerge(baseClasses, variantStyles[variant], className)}
      style={style}
    >
      {Icon && <Icon className="w-4 h-4 mr-2 opacity-90 shrink-0" />}
      <span className="leading-tight">{label}</span>
    </motion.div>
  );
};
