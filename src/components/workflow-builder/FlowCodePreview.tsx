import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MdContentCopy, MdEdit } from 'react-icons/md'
import { configureMonacoYaml } from 'monaco-yaml'
import { toast } from 'sonner'
import * as monaco from 'monaco-editor'

import { Button } from '../ui/button'
import { Toggle } from '../ui/toggle'
import { downloadFile } from '@/utils/downloadFile'
import { CreatePost } from '@/pages/workflow-builder/components/CreatePost'

self.MonacoEnvironment = {
  getWorkerUrl: function (_: unknown, label: string) {
    if (label === 'yaml') {
      return '/monaco/yaml.worker.bundle.js'
    }
    if (label === 'json') {
      return '/monaco/json.worker.bundle.js'
    }
    return '/monaco/editor.worker.bundle.js'
  },
}

interface FlowCodePreviewProps {
  yamlCode: string
  isOwner?: boolean
  isPreview?: boolean
}

export function FlowCodePreview({
  yamlCode,
  isPreview = false,
}: FlowCodePreviewProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const monacoEditorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(
    null,
  )

  const { t } = useTranslation()

  const [editAsCode, setEditAsCode] = useState(true)
  const [isPostOpened, setIsPostOpened] = useState(false)

  useEffect(() => {
    configureMonacoYaml(monaco)

    const yamlPreview = monaco.Uri.parse('file:///yaml-preview.yaml')
    let yamlModel = monaco.editor.getModel(yamlPreview)
    if (!yamlModel) {
      yamlModel = monaco.editor.createModel(yamlCode, undefined, yamlPreview)
    }

    monaco.editor.defineTheme('my-dark-theme', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: 'd4d4d4' }, // cinza claro
        { token: 'keyword', foreground: 'ce9178' }, // azul claro (chave)
        { token: 'type', foreground: '50B9C7' }, // azul claro (chave YAML)
        { token: 'string', foreground: 'd4d4d4' }, // cinza claro (valor)
        { token: 'number', foreground: 'ce9178' }, // verde claro (número)
        { token: 'delimiter', foreground: 'd4d4d4' }, // cinza claro
        { token: 'delimiter.bracket', foreground: 'd4d4d4' }, // cinza claro
        { token: 'delimiter.array', foreground: 'd4d4d4' }, // cinza claro
        { token: 'delimiter.parenthesis', foreground: 'd4d4d4' }, // cinza claro
        { token: 'delimiter.curly', foreground: 'd4d4d4' }, // cinza claro
        { token: 'punctuation', foreground: 'd4d4d4' }, // cinza claro (brackets)
        { token: 'punctuation.definition.array', foreground: 'd4d4d4' }, // cinza claro (brackets)
      ],
      colors: {
        'editor.background': '#111111',
        'editor.foreground': '#d4d4d4',
        'editorCursor.foreground': '#50B9C7',
        'editorLineNumber.foreground': '#50B9C7',
        'editor.selectionBackground': '#233554',
        'editor.inactiveSelectionBackground': '#1b2a49',
        'editorIndentGuide.background': '#50B9C7',
        'editorIndentGuide.activeBackground': '#50B9C7',
      },
    })

    // Create the editor
    let editor: monaco.editor.IStandaloneCodeEditor | undefined
    if (editorRef.current) {
      editor = monaco.editor.create(editorRef.current, {
        automaticLayout: true,
        model: yamlModel,
        theme: 'my-dark-theme', // <-- use your custom theme
        readOnly: editAsCode,
      })
      // Desabilita a colorização de pares de colchetes
      // editor.updateOptions({
      //   'bracketPairColorization.enabled': false,
      // })
      monacoEditorRef.current = editor
    }

    return () => {
      editor?.dispose()
    }
  }, [])

  useEffect(() => {
    if (monacoEditorRef.current) {
      monacoEditorRef.current.updateOptions({ readOnly: editAsCode })

      const model = monacoEditorRef.current.getModel()
      if (model && model.getValue() !== yamlCode) {
        model.setValue(yamlCode)
      }
    }
  }, [editAsCode, yamlCode])

  const handleCopy = () => {
    const value = monacoEditorRef.current?.getValue() || ''
    navigator.clipboard.writeText(value)
  }

  const resetChanges = () => {
    const model = monacoEditorRef.current?.getModel() || ''
    if (model) {
      model.setValue(yamlCode)
    }
  }

  return (
    <>
      <div className="flex w-full max-w-[400px] flex-col gap-4">
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

        <div
          ref={editorRef}
          id="code-editor"
          className="min-h-96 flex-1 md:h-full"
        />

        <div className="flex flex-row justify-end space-x-2">
          <Button
            className="mr-auto"
            variant="ghost"
            onClick={() => resetChanges()}
          >
            {t('undoChanges')}
          </Button>

          <Button
            size="sm"
            variant="ghost"
            onClick={() =>
              downloadFile(monacoEditorRef.current?.getValue() ?? yamlCode)
            }
          >
            {t('download')}
          </Button>

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
          code={monacoEditorRef.current?.getValue() ?? yamlCode}
        />
      )}
    </>
  )
}
