import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ThumbsUp, Settings, Eye, Download } from 'lucide-react'

import { EditPost } from '@/pages/workflow-builder/components/UpdatePost'
import { Post } from '@/schemas/posts/posts.schema'
import { useDownloadFlow } from '@/hooks/useDownloadFlow'

import { Button } from '../ui/button'
import { Card } from '../ui/card'
import { FlowCanvas } from './flow-canvas'
import { FlowVisualizer } from './flow-visualizer'

export interface Template {
  isOwner?: boolean
  canEdit?: boolean
  post: Post
}

export function FlowPreview({
  post,
  isOwner = false,
  canEdit = false,
}: Template) {
  const [showActions, setShowActions] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isVisualizerOpened, setIsVisualizerOpened] = useState(false)
  const [isEditingPost, setIsEditingPost] = useState(false)

  const { t } = useTranslation()
  const { downloadFlowMutation } = useDownloadFlow()

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
        <header className="flex items-center justify-between">
          <h1 className="flex-1">{post.title}</h1>

          {isOwner && canEdit && (
            <div>
              <Button
                variant="ghost"
                className="w-full"
                size="icon"
                aria-label="icons"
                disabled={isEditingPost}
                onClick={() => setIsEditingPost(true)}
              >
                <Settings className="size-4" />
              </Button>
            </div>
          )}
        </header>

        <main className="flex flex-1">
          <Card
            className="group relative flex flex-1 flex-col justify-between p-0"
            onClick={handleClick}
          >
            <div
              className={`flex h-full w-full flex-1 items-center justify-center p-0 transition-opacity duration-300 ${showActions ? 'opacity-0' : 'opacity-100'} md:group-hover:opacity-0`}
            >
              <FlowCanvas code={post.flow.content} />
            </div>
            <div
              className={`absolute inset-0 flex w-full flex-1 flex-col items-center justify-center gap-4 px-4 text-center opacity-0 transition-opacity duration-300 ${showActions ? 'opacity-100' : 'opacity-0'} md:group-hover:opacity-100`}
            >
              <Button
                variant="outline"
                className="w-full"
                disabled={isVisualizerOpened}
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setIsVisualizerOpened(true)
                }}
              >
                <Eye className="size-4" />
                {t('visualize')}
              </Button>

              <Button
                variant="outline"
                size="full"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  downloadFlowMutation.mutateAsync({
                    filename: `${post.title}.yaml`,
                    content: post.flow.content,
                    postId: post.id,
                  })
                }}
              >
                <Download className="size-4" />
                {t('download')}
              </Button>
            </div>
          </Card>
        </main>

        <footer className="flex w-full items-baseline justify-between text-xs">
          <span className="text-left font-bold text-gray-400">
            by {post.user.username}
          </span>

          <Button size="sm" variant="ghost" disabled={isOwner}>
            <ThumbsUp />
            <span>{post._count.likes}</span>
          </Button>
        </footer>
      </div>

      {isVisualizerOpened && (
        <FlowVisualizer
          open={isVisualizerOpened}
          onClose={() => setIsVisualizerOpened(false)}
          code={post.flow.content}
          title={post.title}
        />
      )}

      {isOwner && isEditingPost && (
        <EditPost
          open={isEditingPost}
          onClose={() => setIsEditingPost(false)}
          post={post}
        />
      )}
    </>
  )
}
