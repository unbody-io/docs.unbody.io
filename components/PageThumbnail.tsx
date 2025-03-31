import React, { isValidElement } from 'react';
import { FileText, LucideProps } from 'lucide-react';

interface PageThumbnailProps {
  title: string;
  href?: string;
  className?: string;
  icon?: React.ReactElement<LucideProps>;
}

export const PageThumbnail: React.FC<PageThumbnailProps> = ({ title, href, className = '', icon }) => {
  const finalIcon = isValidElement(icon) 
    ? React.cloneElement(icon, { size: 14 })
    : <FileText size={14} />;

  return (
    <a 
      href={href} 
      className={`inline-flex items-center gap-1.5 px-2 py-1 text-sm border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded ${className}`}
    >
      <span className="w-3.5 h-3.5">
        {finalIcon}
      </span>
      <span>{title}</span>
    </a>
  );
}; 