import MDEditor from '@uiw/react-md-editor'
import { ComponentProps } from 'react'

type MarkdownVisualizerProps = ComponentProps<typeof MDEditor.Markdown>

export function MarkdownVisualizer({
  source = '',
  style = {},
  ...props
}: MarkdownVisualizerProps) {
  return (
    <MDEditor.Markdown
      source={source}
      style={{
        whiteSpace: 'pre-wrap',
        backgroundColor: 'hsl(var(--background))',
        color: 'hsl(var(--foreground))',
        fontFamily: 'Inter, sans-serif',
        lineHeight: 1.6,
        ...style,
      }}
      components={{
        // Cabeçalhos
        h1: ({ children }) => (
          <h1
            className="mt-6 mb-3 border-b border-[hsl(var(--border))] text-3xl font-semibold"
            style={{ color: 'var(--h1-color)' }}
          >
            {children}
          </h1>
        ),
        h2: ({ children }) => (
          <h2
            className="mt-5 mb-2 border-b border-[hsl(var(--border))] text-2xl font-semibold"
            style={{ color: 'var(--h2-color)' }}
          >
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3
            className="mt-4 mb-2 text-xl font-medium"
            style={{ color: 'var(--h3-color)' }}
          >
            {children}
          </h3>
        ),

        // Links
        a: ({ href, children }) => (
          <a
            href={href}
            className="underline transition hover:opacity-80"
            style={{ color: 'var(--link-color)' }}
            target="_blank"
            rel="noopener noreferrer"
          >
            {children}
          </a>
        ),

        // Inline code
        code: ({ children }) => (
          <code
            className="rounded px-1.5 py-0.5 text-sm"
            style={{
              backgroundColor: 'hsl(var(--muted))',
              color: 'hsl(var(--primary))',
            }}
          >
            {children}
          </code>
        ),

        // Blocos de código
        pre: ({ children }) => (
          <pre
            className="my-4 overflow-x-auto"
            style={{
              backgroundColor: 'hsl(var(--card))',
              color: 'hsl(var(--card-foreground))',
            }}
          >
            {children}
          </pre>
        ),

        // Citações
        blockquote: ({ children }) => (
          <blockquote
            className="my-4 rounded border-l-4 pl-4 italic"
            style={{
              borderColor: 'hsl(var(--chart-4))',
              backgroundColor: 'hsl(var(--muted))',
              color: 'hsl(var(--muted-foreground))',
            }}
          >
            {children}
          </blockquote>
        ),
      }}
      {...props}
    />
  )
}
