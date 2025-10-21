import { Link } from 'react-router'
import { House, Hammer, Users, AlignJustify } from 'lucide-react'
import { useIsMobile } from '@/hooks/useIsMobile'

import { Button } from '../ui/button'
import ToggleLanguage from '../toggleLanguage'

type ButtonType = {
  label: string
  route?: string
  action?: () => void
  icon?: React.ReactNode
}

export function BottomTabs() {
  const isMobile = useIsMobile()

  const buttons: ButtonType[] = [
    { label: 'Home', route: '/#home', icon: <House className="size-6" /> },

    {
      label: 'Comunidade',
      route: '/community',
      icon: <Users className="size-6" />,
    },

    {
      label: 'Builder',
      route: '/workflow-builder',
      icon: <Hammer className="size-6" />,
    },

    {
      label: 'Menu',
      icon: <AlignJustify className="size-6" />,
      // action: toggleMenu,
    },
  ]

  return (
    <div className="relative flex justify-around">
      {isMobile &&
        buttons.map((button, index) => {
          const isMenuButton = button.label === 'Menu'

          return (
            <div key={index} className="relative">
              {!isMenuButton && (
                <Button
                  size="lg"
                  variant="ghost"
                  onClick={() => (button.action ? button.action() : null)}
                >
                  {button.route ? (
                    <Link to={button.route}>{button.icon}</Link>
                  ) : (
                    button.icon
                  )}
                </Button>
              )}

              {isMenuButton && <ToggleLanguage />}
            </div>
          )
        })}
    </div>
  )
}
