import { cloneElement, isValidElement, useState } from "react"
import { FileText, LucideProps } from 'lucide-react'

interface ThumbnailCardProps {
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
    ? cloneElement(icon, { className: `w-3.5 h-3.5 ${isHovered? "text-foreground/10" : "text-muted-foreground"}` })
    : <FileText className={`w-3.5 h-3.5 ${isHovered? "text-foreground/10" : "text-muted-foreground"}`} />;

  return (
    <a href={link} className={`relative rounded-2xl border transition-all duration-300 ease-in-out dark:border-gray-800 border-gray-200 bg-transparent ${isHovered? "bg-gray-100" : "bg-transparent"}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {hasDescription ? (
        <div className="p-5 flex flex-col items-start">
          <div>{icon}</div>
          <h3 className={`text-base font-medium ${isHovered? "text-foreground" : "text-muted-foreground"} mb-1`}>{title}</h3>
          <p className={`text-sm ${isHovered? "text-foreground" : "text-muted-foreground"}`}>{description}</p>
        </div>
      ) : (
        <div className="p-5 flex flex-row items-center gap-2">
          <div>{finalIcon}</div>
          <h3 className={`text-base font-medium ${isHovered? "text-foreground" : "text-muted-foreground"}`}>{title}</h3>
        </div>
      )}
    </a>
  )
}

export const InlineThumbnail: React.FC<ThumbnailCardProps> = ({
  icon,
  title,
  link
}) => {
  const finalIcon = isValidElement(icon)
    ? cloneElement(icon, { className: 'w-3.5 h-3.5 text-foreground' })
    : <FileText className="w-3.5 h-3.5 text-foreground" />;

  return (
    <a href={link}
      className={`rounded-md p-0 inline-flex transition-all duration-300 ease-in-out border`}>
      <div className="py-1 px-2 flex flex-row items-center gap-2">
        <div>{finalIcon}</div>
        <span className="text-sm text-foreground">{title}</span>
      </div>
    </a>
  )
}