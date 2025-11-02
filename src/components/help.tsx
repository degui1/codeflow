import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip'

type HelpProps = {
  info?: string
  children: React.ReactNode
}

export function Help({ info, children }: HelpProps) {
  return (
    <>
      {!info && children}

      {info && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="h-full w-full">{children}</span>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-sm">{info}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </>
  )
}
