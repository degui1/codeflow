import { Link } from 'react-router'

interface NavLinksProps {
  to: string
  title: string
  isSelected: boolean
}

export function NavLinks({ isSelected, title, to }: NavLinksProps) {
  return (
    <li>
      <Link
        to={to}
        className={`font-semibold text-gray-100 hover:text-sky-400 transition-colors ${isSelected ? 'border-b' : ''}`}
      >
        {title}
      </Link>
    </li>
  )
}
