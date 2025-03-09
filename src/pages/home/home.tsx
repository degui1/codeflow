import { Button } from '@/components/ui/button'

export function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <main className="container mx-auto max-w-3xl space-y-8 text-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
          Build or download workflows
        </h1>
        <p className="text-muted-foreground mx-auto max-w-2xl sm:text-xl">
          Otimização da geração de workflows: uma solução prática, segura e
          acessível
        </p>
        <div className="mx-auto space-x-1">
          <Button size="lg">Start building</Button>
          <Button variant="ghost" size="lg">
            See community
          </Button>
        </div>
      </main>
    </div>
  )
}
