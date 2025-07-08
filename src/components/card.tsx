interface Props {
  title: string
  author: string
}

export function Card({ title, author }: Props) {
  return (
    <div className="hover:bg-accent bg m-4 flex flex-col rounded border p-4 hover:cursor-pointer">
      <span className="p-2">{title}</span>
      <span className="p-2">{author}</span>
    </div>
  )
}
