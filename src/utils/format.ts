import {
  format as fnsFormat,
  formatDistance as fnsFormatDistance,
  FormatDistanceOptions,
} from 'date-fns'
import { enUS, ptBR } from 'date-fns/locale'

const lang = localStorage.getItem('lang') ?? 'en'

type FormatOpts = Omit<Parameters<typeof fnsFormat>[2], 'locale'>
type FormatDistanceOpts = Omit<FormatDistanceOptions, 'locale'>

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

export function formatDistance(
  laterDate: Parameters<typeof fnsFormatDistance>[0],
  earlierDate: Parameters<typeof fnsFormatDistance>[1],
  opts?: FormatDistanceOpts,
) {
  return fnsFormatDistance(laterDate, earlierDate, {
    ...opts,
    locale: lang === 'pt' ? ptBR : enUS,
  })
}
