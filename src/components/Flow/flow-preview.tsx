import { ThumbsUp } from 'lucide-react'
import { FlowCanvas } from './flow-canvas'
import { Button } from '../ui/button'
import { Card } from '../ui/card'
import { useEffect, useState } from 'react'
import { downloadFile } from '@/utils/downloadFile'
import { useTranslation } from 'react-i18next'
import { FlowVisualizer } from './flow-visualizer'

export interface Template {
  title: string
  code: string
  author: string
  likes: number
  isOwner?: boolean
}

export function FlowPreview({
  title,
  code,
  author,
  likes,
  isOwner = false,
}: Template) {
  const [showActions, setShowActions] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isVisualizerOpened, setIsVisualizerOpened] = useState(false)

  const { t } = useTranslation()

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
    <>
      <div className="flex flex-col space-y-1">
        <header>
          <h1 className="">{title}</h1>
        </header>

        <main className="flex flex-1">
          <Card
            className="group relative flex flex-1 flex-col justify-between p-0"
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
              <Button
                variant="outline"
                className="w-full"
                disabled={isVisualizerOpened}
                onClick={() => setIsVisualizerOpened(true)}
              >
                {t('visualize')}
              </Button>
              <FlowVisualizer
                open={isVisualizerOpened}
                onClose={() => setIsVisualizerOpened(false)}
              />
              <Button
                variant="outline"
                size="full"
                onClick={() => {
                  downloadFile(code)
                }}
              >
                {t('download')}
              </Button>
            </div>
          </Card>
        </main>

        <footer className="flex w-full items-baseline justify-between text-xs">
          <span className="text-left font-bold text-gray-400">by {author}</span>

          <Button size="sm" variant="ghost" disabled={isOwner}>
            <ThumbsUp />
            <span>{likes}</span>
          </Button>
        </footer>
      </div>
    </>
  )
}
