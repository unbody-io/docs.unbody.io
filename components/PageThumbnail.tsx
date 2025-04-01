import { cloneElement, isValidElement, useState } from "react"
import { FileText, Icon, LucideProps } from 'lucide-react'

interface ThumbnailCardProps {
  // icon: LucideIcon
  title: string
  description?: string
  link?: string
  icon?: React.ReactElement<LucideProps>;
}

export const PageThumbnail: React.FC<ThumbnailCardProps> = ({
  icon,
  title,
  description,
  link
}) => {

  const [isHovered, setIsHovered] = useState(false);

  const hasDescription = description !== undefined && description !== null && description !== ''
  const finalIcon = isValidElement(icon)
    ? cloneElement(icon, { className: `w-3.5 h-3.5 ${isHovered? "dark:text-gray-900 text-gray-100" : "dark:text-gray-100 text-gray-900"}` })
    : <FileText className={`w-3.5 h-3.5 ${isHovered? "dark:text-gray-900 text-gray-100" : "dark:text-gray-100 text-gray-900"}`} />;

  return (
    <a href={link} className={`relative rounded-2xl border transition-all duration-300 ease-in-out dark:border-gray-800 border-gray-200 bg-transparent ${isHovered? "bg-gray-100" : "bg-transparent"}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {hasDescription ? (
        <div className="p-5 flex flex-col items-start">
          <div>{icon}</div>
          <h3 className={`text-base font-medium ${isHovered? "dark:text-gray-900 text-gray-100" : "dark:text-gray-100 text-gray-900"} mb-1`}>{title}</h3>
          <p className={`text-sm ${isHovered? "dark:text-gray-900 text-gray-100" : "dark:text-gray-100 text-gray-900"}`}>{description}</p>
        </div>
      ) : (
        <div className="p-5 flex flex-row items-center gap-2">
          <div>{finalIcon}</div>
          <h3 className={`text-base font-medium ${isHovered? "dark:text-gray-900 text-gray-100" : "dark:text-gray-100 text-gray-900"}`}>{title}</h3>
        </div>
      )}
    </a>
  )
}
export const InlineThumbnail: React.FC<ThumbnailCardProps> = ({
  icon,
  title,
  description,
  link
}) => {
  const finalIcon = isValidElement(icon)
    ? cloneElement(icon, { className: 'w-3.5 h-3.5 dark:text-gray-900 text-gray-100' })
    : <FileText className="w-3.5 h-3.5 dark:text-gray-900 text-gray-100" />;

  return (
    <a href={link}
      className={`rounded-md p-0 inline-flex border transition-all duration-300 ease-in-out dark:border-gray-200 dark:bg-gray-300 border-gray-800 bg-gray-100`}>
      <div className="py-1 px-2 flex flex-row items-center gap-2">
        <div>{finalIcon}</div>
        <span className="text-sm dark:text-white dark:text-gray-900 text-gray-100">{title}</span>
      </div>
    </a>
  )
}