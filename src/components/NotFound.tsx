import { useRouter } from '@/hooks/useRouter'
import { MdWarning } from 'react-icons/md'

import { Link } from 'react-router'
import { Button } from './ui/button'

export function NotFound() {
  const { navigate } = useRouter()

  return (
    <div className="mx-auto flex min-h-screen max-w-[1200px] flex-col items-center space-y-30 py-24">
      <Link to="/">
        <img src="/codeflow_logo.png" alt="" className="size-50" />
      </Link>

      <main className="flex flex-col space-y-6">
        <div className="flex items-center gap-2">
          <MdWarning className="size-6 text-amber-300" />
          <h1 className="text-xl">Rota indisponível e/ou inexistente</h1>
        </div>
        <Button onClick={() => navigate('HOME')}>Voltar ao início</Button>
      </main>
    </div>
  )
}
