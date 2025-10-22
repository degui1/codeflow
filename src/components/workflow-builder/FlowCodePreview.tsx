import { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MdContentCopy, MdEdit } from 'react-icons/md'
import { toast } from 'sonner'

import { Button } from '../ui/button'
import { Toggle } from '../ui/toggle'
import { downloadFile } from '@/utils/downloadFile'
import { CreatePost } from '@/pages/workflow-builder/components/CreatePost'
import { useDownloadFlow } from '@/hooks/useDownloadFlow'
import { Editor, EditorRef } from '../Editor'

export type FlowCodePreviewRef = {
  getContent: () => string
}

interface FlowCodePreviewProps {
  yamlCode: string
  isPreview?: boolean
  postId?: string
}

export const FlowCodePreview = forwardRef<
  FlowCodePreviewRef,
  FlowCodePreviewProps
>(({ yamlCode, isPreview = false, postId }, ref) => {
  const editorRef = useRef<EditorRef>(null)

  const { t } = useTranslation()
  const { downloadFlowMutation } = useDownloadFlow()

  const [editAsCode, setEditAsCode] = useState(true)
  const [isPostOpened, setIsPostOpened] = useState(false)

  const handleCopy = () => {
    editorRef.current?.copyToClipboard()
  }

  const resetChanges = () => {
    editorRef.current?.reset()
  }

  useImperativeHandle(ref, () => {
    return { getContent: () => editorRef.current?.getContent() ?? '' }
  }, [])

  return (
    <>
      <div className="flex w-full flex-col gap-4">
        <div className="flex flex-row justify-end space-x-2">
          <Button
            variant="secondary"
            onClick={() => {
              handleCopy()
              toast.info(t('copiedToClipboard'))
            }}
          >
            <MdContentCopy id="copy-code-preview" />
          </Button>

          <Toggle
            variant="outline"
            className="cursor-pointer"
            onClick={() => {
              setEditAsCode(!editAsCode)
            }}
          >
            <MdEdit />

            {t('edit')}
          </Toggle>
        </div>

        <div className="min-h-96 flex-1 md:h-full">
          <Editor
            code={yamlCode}
            defaultLanguage="yaml"
            readOnly={editAsCode}
            ref={editorRef}
          />
        </div>

        <div className="flex flex-row justify-end space-x-2">
          <Button variant="ghost" onClick={() => resetChanges()}>
            {t('undoChanges')}
          </Button>

          {isPreview && postId && (
            <Button
              size="sm"
              className="ml-auto"
              variant="ghost"
              onClick={() =>
                downloadFlowMutation.mutateAsync({
                  content: editorRef.current?.getContent() ?? yamlCode,
                  postId,
                })
              }
            >
              {t('download')}
            </Button>
          )}

          {!isPreview && (
            <Button
              size="sm"
              className="ml-auto"
              variant="ghost"
              onClick={() =>
                downloadFile(editorRef.current?.getContent() ?? yamlCode)
              }
            >
              {t('download')}
            </Button>
          )}

          {!isPreview && (
            <Button size="sm" onClick={() => setIsPostOpened(true)}>
              {t('post')}
            </Button>
          )}
        </div>
      </div>

      {!isPreview && (
        <CreatePost
          open={isPostOpened}
          onClose={() => setIsPostOpened(false)}
          code={editorRef.current?.getContent() ?? yamlCode}
        />
      )}
    </>
  )
})

FlowCodePreview.displayName = 'FlowCodePreview'
