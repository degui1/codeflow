import MonacoEditor from '@monaco-editor/react'
import { editor } from 'monaco-editor'
import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'

interface EditorProps {
  code?: string
  readOnly?: boolean
  defaultLanguage: string
}

export type EditorRef = {
  getContent: () => string
  copyToClipboard: VoidFunction
  reset: VoidFunction
}

export const Editor = forwardRef<EditorRef, EditorProps>(
  ({ code = '', readOnly = false, defaultLanguage }, ref) => {
    const editorRef = useRef<editor.IStandaloneCodeEditor>(null)

    useEffect(() => {
      if (editorRef.current) {
        const model = editorRef.current.getModel()
        if (model && model.getValue() !== code) {
          model.setValue(code)
        }
      }
    }, [readOnly, code])

    useImperativeHandle(ref, () => {
      return {
        getContent: () => editorRef.current?.getValue() ?? '',
        copyToClipboard: async () => {
          const content = editorRef.current?.getValue() || ''
          await navigator.clipboard.writeText(content)
        },
        reset: () => {
          editorRef.current?.setValue(code)
        },
      }
    }, [])

    return (
      <MonacoEditor
        defaultLanguage={defaultLanguage}
        defaultValue={code}
        theme="vs-dark"
        beforeMount={(monaco) => {
          const yamlPreview = monaco.Uri.parse('file:///yaml-preview.yaml')

          let yamlModel = monaco.editor.getModel(yamlPreview)

          if (!yamlModel) {
            yamlModel = monaco.editor.createModel(code, undefined, yamlPreview)
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
        }}
        onMount={(editor, monaco) => {
          editorRef.current = editor

          editor.addAction({
            id: 'copy-all',
            label: 'Copiar Tudo',
            keybindings: [
              monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyB, // Ctrl/Cmd + B
            ],
            run: () => {
              const value = editor.getValue()

              navigator.clipboard.writeText(value)
            },
          })
        }}
        options={{
          wordWrap: 'on',
          minimap: { enabled: false },
          lineNumbers: 'off',
          scrollBeyondLastLine: false,
          readOnly: readOnly,
          automaticLayout: true,
          theme: 'my-dark-theme',
        }}
      />
    )
  },
)

Editor.displayName = 'Editor'
