import { ThumbsUp } from 'lucide-react'
import { FlowCanvas } from './flow-canvas'
import { Button } from './button'
import { Card } from './card'
import { useEffect, useState } from 'react'

export interface Template {
  id: number
  title: string
  code: string
  idAuthor?: number
  idAction?: string
  author: string
  likes: number
}

export function FlowPreview({ title, code, author, likes }: Template) {
  const [showActions, setShowActions] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setShowActions(false)
      return setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleClick = () => {
    if (isMobile) {
      setShowActions((prev) => !prev)
    }
  }

  return (
    <div className="flex flex-col">
      <header>
        <h1 className="mb-1">{title}</h1>
      </header>

      <main className="">
        <Card
          className="group relative flex h-60 flex-col justify-between p-0 md:h-40"
          onClick={handleClick}
        >
          <div
            className={`flex h-full w-full flex-1 items-center justify-center p-0 transition-opacity duration-300 ${showActions ? 'opacity-0' : 'opacity-100'} md:group-hover:opacity-0`}
          >
            <FlowCanvas code={code} />
          </div>
          <div
            className={`absolute inset-0 flex w-full flex-1 flex-col items-center justify-center gap-4 px-4 text-center opacity-0 transition-opacity duration-300 ${showActions ? 'opacity-100' : 'opacity-0'} md:group-hover:opacity-100`}
          >
            <Button variant="outline" className="w-full">
              Visualize
            </Button>
            <Button variant="outline" className="w-full">
              Download
            </Button>
          </div>
        </Card>
      </main>

      <footer className="flex w-full items-baseline justify-between text-xs">
        <span className="text-left font-bold text-gray-400">by {author}</span>

        <div className="text-right font-bold text-gray-400">
          <Button size="icon" variant="ghost">
            <ThumbsUp />
          </Button>
          <span>{likes}</span>
        </div>
      </footer>
    </div>
  )
}
