import { useEffect, useRef, useState } from 'react'

type Props = {
  code: string
  minHeight?: number
}

export function FlowCanvas({ code, minHeight = 120 }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const prevUrlRef = useRef<string | null>(null)
  const [src, setSrc] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true

    const el = containerRef.current
    const rect = el?.getBoundingClientRect() ?? {
      width: 300,
      height: minHeight,
    }
    const widthPx = Math.max(1, Math.floor(rect.width || 300))
    const heightPx = Math.max(minHeight, Math.floor(rect.height || minHeight))

    const renderOnce = async () => {
      const dpr = Math.max(window.devicePixelRatio || 1, 1)
      const w = Math.max(1, Math.round(widthPx * dpr))
      const h = Math.max(1, Math.round(heightPx * dpr))

      const canvas = document.createElement('canvas')
      canvas.width = w
      canvas.height = h

      const ctx = canvas.getContext('2d')
      if (!ctx) return

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, widthPx, heightPx)

      ctx.fillStyle = '#111111'
      ctx.fillRect(0, 0, widthPx, heightPx)

      const minFontSize = 10
      const maxFontSize = 24
      const fontSize = Math.max(
        minFontSize,
        Math.min(Math.round(widthPx / 25), maxFontSize),
      )
      ctx.font = `${fontSize}px monospace`
      ctx.textBaseline = 'top'
      const lineHeight = fontSize + 3

      const lines = code.split('\n')
      let y = lineHeight

      for (const line of lines) {
        const parts = line.match(/^\s*-\s|^\s*[^:]+:|'.*?'|".*?"|\d+|\S+/g) || [
          line,
        ]
        let x = 20
        for (const part of parts) {
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
        }
        y += lineHeight
      }

      const blob = await new Promise<Blob | null>((resolve) => {
        if (canvas.toBlob) {
          canvas.toBlob((b) => resolve(b), 'image/png')
        } else {
          const data = canvas.toDataURL('image/png')
          const parts = data.split(',')
          const byteString = atob(parts[1])
          const ia = new Uint8Array(byteString.length)
          for (let i = 0; i < byteString.length; i++)
            ia[i] = byteString.charCodeAt(i)
          resolve(new Blob([ia], { type: 'image/png' }))
        }
      })

      if (!mounted || !blob) return

      const url = URL.createObjectURL(blob)
      if (prevUrlRef.current) {
        URL.revokeObjectURL(prevUrlRef.current)
      }
      prevUrlRef.current = url
      setSrc(url)
    }

    renderOnce()

    return () => {
      mounted = false
      if (prevUrlRef.current) {
        URL.revokeObjectURL(prevUrlRef.current)
        prevUrlRef.current = null
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      style={{ width: '100%', height: '100%', overflow: 'hidden' }}
    >
      {src ? (
        <img
          src={src}
          alt="flow preview"
          style={{
            display: 'block',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: 8,
          }}
        />
      ) : (
        <div
          style={{
            width: '100%',
            height: '100%',
            background: '#111111',
            borderRadius: 8,
          }}
        />
      )}
    </div>
  )
}
