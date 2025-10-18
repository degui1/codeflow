import { Link } from 'react-router'
import { Button } from '../ui/button'
import { useState, useEffect } from 'react'

import { House, Hammer, Users, AlignJustify } from 'lucide-react'

import ToggleLanguage from '../toggleLanguage'

type ButtonType = {
  label: string
  route?: string
  action?: () => void
  icon?: any
}

export function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth < breakpoint)

    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)
    return () => window.removeEventListener('resize', checkIsMobile)
  }, [breakpoint])

  return isMobile
}

export function BottomTabs() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  const isMobile = useIsMobile()
  const toogleMenu = () => {
    console.log('isMenuOpen')
    setIsMenuOpen((prev) => !prev)
  }
  const buttons: ButtonType[] = [
    { label: 'Home', route: '/#home', icon: <House /> },
    { label: 'Comunidade', route: '/community', icon: <Users /> },
    { label: 'Builder', route: '/workflow-builder', icon: <Hammer /> },
    { label: 'Menu', icon: <AlignJustify />, action: toogleMenu },
  ]
  return (
    <div className="relative flex justify-around">
      {isMobile &&
        buttons.map((button, index) => {
          const isMenuButton = button.label === 'Menu'

          return (
            <div key={index} className="relative">
              <Button
                size={'lg'}
                variant={'ghost'}
                onClick={() => (button.action ? button.action() : null)}
              >
                {button.route ? (
                  <Link to={button.route}>{button.icon}</Link>
                ) : (
                  button.icon
                )}
              </Button>

              {isMenuButton && isMenuOpen && (
                <ul className="absolute bottom-full left-1/2 z-50 mb-2 w-40 -translate-x-1/2 rounded p-2 shadow">
                  <li>
                    <ToggleLanguage />
                  </li>
                </ul>
              )}
            </div>
          )
        })}
    </div>
  )
}
