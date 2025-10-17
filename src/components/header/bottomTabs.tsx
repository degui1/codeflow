import { Link } from 'react-router'
import { Button } from '../ui/button'
import { useState, useEffect } from 'react'

import { House, Hammer, BrickWall, Users, AlignJustify } from 'lucide-react'

// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from '@radix-ui/react-dropdown-menu'
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
    { label: 'Builder', route: '/workflow-builder', icon: <BrickWall /> },
    { label: 'Ferramentas', route: '/features-section', icon: <Hammer /> },
    { label: 'Menu', icon: <AlignJustify />, action: toogleMenu },
  ]
  return (
    <div className="flex justify-around">
      {isMobile &&
        buttons.map((button, index) => (
          <Button
            size={'lg'}
            variant={'ghost'}
            key={index}
            onClick={() => (button.action ? button.action() : null)}
          >
            <Link to={button.route ?? ''}>{button.icon}</Link>
          </Button>
        ))}

      <nav className="flex items-center space-x-4">
        {isMenuOpen && isMobile && (
          <ul className="fixed">
            <ToggleLanguage />
          </ul>
        )}
      </nav>
    </div>
  )
}
