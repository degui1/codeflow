import { useRouter } from '@/hooks/useRouter'
import { MdError } from 'react-icons/md'

import { isRouteErrorResponse, Link, useRouteError } from 'react-router'
import { Button } from './ui/button'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion'

export function RouteGuard() {
  const error = useRouteError()
  const { navigate } = useRouter()
  const isRouteError = isRouteErrorResponse(error)
  const isErrorObject = error instanceof Error

  return (
    <div className="mx-auto flex min-h-screen max-w-[1200px] flex-col items-center space-y-30 py-24">
      <Link to="/">
        <img src="/codeflow_logo.png" alt="" className="size-50" />
      </Link>

      <main className="flex flex-col space-y-6">
        <div className="flex items-center gap-2">
          <MdError className="text-destructive size-6" />
          <h1 className="text-xl">
            {isErrorObject && error.message}
            {isRouteError && (error.statusText || 'erro')}

            {!isErrorObject && !isRouteError && 'erro'}
          </h1>
        </div>
        <Button onClick={() => navigate('HOME')}>Voltar ao início</Button>
      </main>

      {(isErrorObject || isRouteError) && (
        <Accordion type="single" collapsible className="container">
          <AccordionItem value="item-1">
            <AccordionTrigger>Detalhes do erro</AccordionTrigger>
            <AccordionContent>
              {isErrorObject && (
                <div>
                  <span>{error.stack}</span>
                </div>
              )}

              {isRouteError && (
                <div>
                  <span>{error.statusText}</span>
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
    </div>
  )
}
