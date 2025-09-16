import { Button } from '@/components/ui/button'
import { Feature } from '@/components/home/feature'
import {
  MdOutlineVerified,
  MdOutlineRocketLaunch,
  MdConstruction,
  MdOutlineRateReview,
  MdOutlinePolyline,
  MdOutlinePsychology,
  MdLightbulbOutline,
} from 'react-icons/md'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'
import { Footer } from '@/components/footer'

export function Home() {
  const { t } = useTranslation()

  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <div className="pointer-events-none absolute -top-1/3 left-1/2 -z-10 h-[130rem] w-full max-w-[120rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gray-500 opacity-12 blur-[120px] lg:h-[150rem]" />
      <main
        id="home"
        className="container mx-auto -mt-25 flex h-screen max-w-3xl scroll-mt-32 flex-col justify-center space-y-8 text-center"
      >
        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
          {t('Construa e baixe workflows')}
        </h1>
        <p className="text-muted-foreground mx-auto w-xs sm:w-xl sm:text-xl lg:w-6/12">
          {t(
            'Otimização da geração de workflows: uma solução prática, segura e acessível',
          )}
        </p>
        <div className="mx-auto space-x-2">
          <Button size="lg">{t('Comece agora')}</Button>
          <Button variant="ghost" size="lg">
            <Link to="/community">{t('Veja a comunidade')}</Link>
          </Button>
        </div>
      </main>
      <section className="flex min-h-dvh flex-col justify-center space-y-10 text-center">
        <span
          id="features-section"
          className="mb-5 scroll-mt-48 text-3xl font-bold lg:text-4xl"
        >
          {t('Domine o YAML com Codeflow')}
        </span>
        <p className="text-muted-foreground mx-auto w-xs text-center sm:min-w-2xl lg:min-w-4xl lg:text-xl">
          {t(
            'Codeflow oferece uma maneira prática e intuitiva de aprender e construir arquivos YAML, combinando edição visual com orientações inteligentes para automação do mundo real',
          )}
        </p>
        <div className="flex max-w-250 flex-wrap justify-center gap-5 lg:flex-row">
          <Feature
            icon={<MdConstruction size={35} />}
            title={t('Construa visualmente')}
            desc={t(
              'Crie arquivos YAML válidos usando uma interface intuitiva.',
            )}
          />
          <Feature
            icon={<MdOutlineRocketLaunch size={35} />}
            title={t('Rápida curva de aprendizado')}
            desc={t(
              'Entenda a lógica do YAML através de tutoriais e feedback em tempo real.',
            )}
          />
          <Feature
            icon={<MdOutlineVerified size={35} />}
            title={t('Sintaxe sem erros')}
            desc={t(
              'Evite erros de indentação e formatação com a validação de sintaxe integrada.',
            )}
          />
          <Feature
            icon={<MdOutlineRateReview size={35} />}
            title="IntelliSense"
            desc={t(
              'Obtenha dicas de preenchimento automático enquanto você cria arquivos YAML.',
            )}
          />
          <Feature
            icon={<MdOutlinePolyline size={35} />}
            title={t('Exporte & Integre')}
            desc={t(
              'Exporte seus arquivos YAML prontos para ferramentas de CI/CD, como GitHub Actions.',
            )}
          />
          <Feature
            icon={<MdOutlinePsychology size={35} />}
            title={t('Aprenda fazendo')}
            desc={t(
              'Adquira proficiência em YAML, com a construção prática de pipelines reais.',
            )}
          />
        </div>
      </section>
      <section className="flex min-h-dvh max-w-3xl flex-col items-center justify-center space-y-5">
        <div className="flex flex-row lg:gap-x-2">
          <span className="flex items-center text-center text-2xl leading-relaxed font-semibold lg:text-4xl">
            {t('Crie com cliques')}
          </span>
          <MdLightbulbOutline size={70} />
          <span className="flex items-center text-center text-2xl leading-relaxed font-semibold lg:text-4xl">
            {t('Aprenda na prática')}
          </span>
        </div>
        <Button className="text-1xl h-12 w-xs lg:w-full">
          {t('Começar agora')}
        </Button>
      </section>

      <Footer />
    </div>
  )
}
