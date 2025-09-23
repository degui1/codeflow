'use client'

import * as React from 'react'
import { Check, ChevronsUpDown, X } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

interface AutocompleteProps {
  options: string[]
  placeholder?: string
  onChange?: (value: string[]) => void
}

export function Autocomplete({
  options,
  placeholder,
  onChange,
}: AutocompleteProps) {
  const [open, setOpen] = React.useState(false)
  const [selected, setSelected] = React.useState<string[]>([])

  const toggleOption = (option: string) => {
    setSelected((prev) => {
      if (prev.includes(option)) {
        const newSelected = prev.filter((item) => item !== option)

        onChange?.(newSelected)

        return newSelected
      }

      const newRemoved = [...prev, option]

      onChange?.(newRemoved)

      return newRemoved
    })
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="bg-input/30 hover:bg-input/50 border-input flex h-full w-full items-center rounded-md border px-4 py-0">
        {!!selected.length && (
          <div className="flex flex-1 flex-wrap gap-2">
            {selected.map((item) => (
              <Button
                key={item}
                onClick={(e) => {
                  e.stopPropagation()
                  toggleOption(item)
                }}
                size="xs"
              >
                {item}
                <X className="size-3" />
              </Button>
            ))}
          </div>
        )}

        {selected.length === 0 && (
          <span className="text-muted-foreground flex-1 text-left text-sm">
            {placeholder}
          </span>
        )}

        <ChevronsUpDown className="ml-auto size-4 opacity-50" />
      </PopoverTrigger>

      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search framework..." className="h-9" />
          <CommandList>
            <CommandEmpty>Nenhum disponível</CommandEmpty>
            <CommandGroup>
              {options.map((item) => (
                <CommandItem
                  key={item}
                  value={item}
                  onSelect={(currentValue) => {
                    toggleOption(currentValue)
                  }}
                >
                  {item}

                  <Check
                    className={cn(
                      'ml-auto',
                      selected.includes(item) ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
