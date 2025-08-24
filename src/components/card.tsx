import { Download } from 'lucide-react'

interface Props {
  title: string
  author: string
  description: string
  downloads: number
}

export function Card({ title, author, description, downloads }: Props) {
  return (
    <div className="m-2">
      <div className="hover:bg-accent bg flex flex-col rounded border p-4 hover:cursor-pointer">
        <span className="p-2 text-lg font-semibold">{title}</span>
        <span className="p-2">{author}</span>
        <span>{description}</span>
      </div>
      <div className="flex pt-2 pl-2">
        <Download size={16} />
        <span className="pl-2 text-sm">{downloads}</span>
      </div>
    </div>
  )
}
