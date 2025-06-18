import { Button } from '@/components/ui/button'
import { Feature } from '@/components/home/feature'
import { Footer } from '@/components/footer'

export function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <main className="container mx-auto flex min-h-dvh max-w-3xl scroll-mt-32 flex-col justify-center space-y-8 text-center">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
          Construa e baixe workflows
        </h1>
        <p className="text-muted-foreground mx-auto w-xs sm:text-xl lg:max-w-2xl">
          Otimização da geração de workflows: uma solução prática, segura e
          acessível
        </p>
        <div className="mx-auto space-x-2">
          <Button size="lg">Comece agora</Button>
          <Button variant="ghost" size="lg">
            Veja a comunidade
          </Button>
        </div>
      </main>
      <section className="flex min-h-dvh flex-col justify-center space-y-10 text-center">
        <span
          id="features-section"
          className="scroll-mt-48 text-3xl font-bold lg:text-4xl"
        >
          Domine o YAML com Codeflow
        </span>
        <p className="text-muted-foreground mx-auto w-xs text-center sm:min-w-2xl lg:min-w-4xl lg:text-xl">
          Codeflow oferece uma maneira prática e intuitiva de aprender e
          construir arquivos YAML, combinando edição visual com orientações
          inteligentes para automação do mundo real
        </p>
        <div className="flex max-w-250 flex-wrap justify-center gap-5 lg:flex-row">
          <Feature
            src="/feature_build.svg"
            title="Construa visualmente"
            desc="Crie arquivos YAML válidos usando uma interface intuitiva."
          />
          <Feature
            src="/feature_learning_curve.svg"
            title="Rápida curva de aprendizado"
            desc="Entenda a lógica do YAML através de tutoriais e feedback em tempo real."
          />
          <Feature
            src="/feature_error_free.svg"
            title="Sintaxe sem erros"
            desc="Evite erros de indentação e formatação com a validação de sintaxe integrada."
          />
          <Feature
            src="/feature_intellisense.svg"
            title="IntelliSense"
            desc="Obtenha dicas de preenchimento automático enquanto você cria arquivos YAML."
          />
          <Feature
            src="/feature_integrate.svg"
            title="Exporte e integre"
            desc="Exporte seus arquivos YAML prontos para ferramentas de CI/CD, como GitHub Actions."
          />
          <Feature
            src="/feature_practice.svg"
            title="Aprenda fazendo"
            desc="Adquira proficiência em YAML, com a construção prática de pipelines reais."
          />
        </div>
      </section>
      <section className="flex min-h-dvh max-w-3xl flex-col items-center justify-center space-y-5">
        <div className="flex flex-row lg:gap-x-2">
          <span className="flex items-center text-center text-2xl leading-relaxed font-semibold lg:text-4xl">
            Crie com cliques
          </span>
          <img src="/light_bulb.svg" alt="" width={70} height={70} />
          <span className="flex items-center text-center text-2xl leading-relaxed font-semibold lg:text-4xl">
            Aprenda na prática
          </span>
        </div>
        <Button className="text-1xl h-12 w-xs lg:w-full">Começar agora</Button>
      </section>
      <Footer />
    </div>
  )
}
