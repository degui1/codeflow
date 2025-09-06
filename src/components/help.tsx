import { Info } from 'lucide-react'

type Props = {
  info: string
}

const Help = ({ info }: Props) => {
  return (
    <div className="group relative inline-block">
      <Info className="h-5 w-5" />

      <div className="absolute bottom-full left-1/2 z-10 mb-2 hidden -translate-x-1/2 transform rounded bg-gray-800 px-2 py-1 text-xs whitespace-nowrap text-white shadow-md group-hover:block">
        {info}
      </div>
    </div>
  )
}

export default Help
