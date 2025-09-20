import { format as fnsFormat } from 'date-fns'
import { enUS, ptBR } from 'date-fns/locale'

const lang = localStorage.getItem('lang') ?? 'en'

type FormatOpts = Omit<Parameters<typeof fnsFormat>[2], 'locale'>

export function format(
  date: Parameters<typeof fnsFormat>[0],
  formatStr: Parameters<typeof fnsFormat>[1],
  opts?: FormatOpts,
) {
  return fnsFormat(date, formatStr, {
    ...opts,
    locale: lang === 'pt' ? ptBR : enUS,
  })
}
