import MDEditor, { MDEditorProps } from '@uiw/react-md-editor'

type MarkdownEditorProps = MDEditorProps

export function MarkdownEditor({ ...props }: MarkdownEditorProps) {
  return (
    <MDEditor
      style={{
        whiteSpace: 'pre-wrap',
        backgroundColor: 'hsl(var(--background))',
        color: 'hsl(var(--foreground))',
        lineHeight: 1.6,
      }}
      {...props}
    />
  )
}
