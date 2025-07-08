import { ReactNode } from 'react'

export function Feature(props: FeatureProps) {
  return (
    <div className="bg[#121212] sm:w-2x1 flex h-55 w-80 flex-col gap-2 rounded-lg border-2 border-neutral-900 p-7 text-start">
      {props.icon}
      <span className="font-bold text-gray-300">{props.title}</span>
      <p className="text-muted-foreground">{props.desc}</p>
    </div>
  )
}

interface FeatureProps {
  icon: ReactNode
  title: string
  desc: string
}
