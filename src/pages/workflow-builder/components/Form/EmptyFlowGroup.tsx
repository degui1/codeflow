import { Siren } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export function EmptyFlowGroup() {
  const { t } = useTranslation()
  return (
    <div className="[background-image:repeating-radial-gradient(circle,theme(colors.background)_0,theme(colors.foreground)_0.1px,theme(color.background)_1px,transparent_14px)] flex flex-1 flex-col items-center justify-center space-y-8 [background-size:20px_20px]">
      <Siren size={32} className="text-amber-300 opacity-100" />

      <h2 className="text-lg font-semibold">
        {t('pleaseSelectSchemaToContinue')}
      </h2>
    </div>
  )
}
