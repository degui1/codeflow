import { useTranslation } from 'react-i18next'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { useEffect, useState } from 'react'

const ToggleLanguage = ({ ...props }: React.ComponentProps<'div'>) => {
  const { i18n } = useTranslation()
  const [selectedLanguage, setSelectedLanguage] = useState<string>('')

  const handleToggleLanguage = (value: string) => {
    if (value && value !== i18n.language) {
      i18n.changeLanguage(value)
      setSelectedLanguage(value)
      localStorage.setItem('lang', value)
    }
  }

  useEffect(() => {
    const lang = localStorage.getItem('lang')
    setSelectedLanguage(lang ?? 'en')
  }, [i18n.language])
  return (
    <div {...props} className="bg-accent rounded-4xl p-2">
      <ToggleGroup
        type="single"
        size="sm"
        value={selectedLanguage}
        onValueChange={handleToggleLanguage}
      >
        <ToggleGroupItem
          className="rounded-full p-2 data-[state=on]:rounded-full data-[state=on]:bg-black data-[state=on]:text-white"
          value="pt"
          aria-label="Toggle bold"
        >
          <span className="h-4 w-4">PT</span>
        </ToggleGroupItem>
        <ToggleGroupItem
          className="rounded-full p-2 data-[state=on]:rounded-full data-[state=on]:bg-black data-[state=on]:text-white"
          value="en"
          aria-label="Toggle italic"
        >
          <span className="h-4 w-4">EN</span>
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  )
}

export default ToggleLanguage
