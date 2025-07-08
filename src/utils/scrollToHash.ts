import { useLocation } from 'react-router'
import { useEffect } from 'react'

export function ScrollToHash() {
  const { hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.replace('#', ''))
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }, [hash])

  return null
}
