import { useEffect, useRef, useState } from 'react'

type Props = {
  code: string
  minHeight?: number
}

export function FlowCanvas({ code, minHeight = 120 }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [size, setSize] = useState({ width: 300, height: minHeight })

  useEffect(() => {
    function updateSize() {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setSize({
          width: rect.width,
          height: Math.max(rect.height, minHeight),
        })
      }
    }

    updateSize()
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [minHeight])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const dpr = window.devicePixelRatio || 1

    canvas.width = size.width * dpr
    canvas.height = size.height * dpr
    canvas.style.width = `${size.width}px`
    canvas.style.height = `${size.height}px`

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.clearRect(0, 0, size.width, size.height)
    ctx.fillStyle = '#111111'
    ctx.fillRect(0, 0, size.width, size.height)

    // Responsive font size based on width (adjust divisor for your needs)
    const minFontSize = 10
    const maxFontSize = 24
    const fontSize = Math.max(
      minFontSize,
      Math.min(Math.round(size.width / 25), maxFontSize),
    )
    ctx.font = `${fontSize}px monospace`
    ctx.textBaseline = 'top'

    const lines = code.trim().split('\n')
    let y = fontSize + 3

    lines.forEach((line) => {
      const parts = line.match(/^\s*-\s|^\s*[^:]+:|'.*?'|".*?"|\d+|\S+/g) || [
        line,
      ]
      let x = 20

      parts.forEach((part) => {
        if (/^\s*-\s/.test(part)) {
          ctx.fillStyle = '#d4d4d4'
        } else if (/^\s*[^:]+:/.test(part)) {
          ctx.fillStyle = '#50B9C7'
        } else if (/^['"].*['"]$/.test(part)) {
          ctx.fillStyle = '#ce9178'
        } else if (/^\d+$/.test(part)) {
          ctx.fillStyle = '#b5cea8'
        } else {
          ctx.fillStyle = '#d4d4d4'
        }

        ctx.fillText(part, x, y)
        x += ctx.measureText(part + ' ').width
      })

      y += fontSize + 3
    })
  }, [code, size])

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%' }}>
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          borderRadius: 8,
        }}
      />
    </div>
  )
}
