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
        className={`font-semibold text-gray-100 transition-colors hover:text-gray-300 ${isSelected ? 'border-b pb-2' : ''}`}
      >
        {title}
      </Link>
    </li>
  )
}
