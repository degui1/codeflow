import { zodResolver } from '@hookform/resolvers/zod'
import { useSuspenseQuery } from '@tanstack/react-query'
import { CalendarIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { request } from '@/api/api-client'
import { cn } from '@/lib/utils'

import { Button } from './ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from './ui/card'
import { Input } from './ui/input'
import { Popover, PopoverTrigger, PopoverContent } from './ui/popover'
import { Calendar } from './ui/calendar'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from './ui/form'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from './ui/select'
import {
  CommunityPostsFilterForm,
  communityPostsFilterFormSchema,
} from '@/schemas/posts/posts.schema'
import { format } from '@/utils/format'

const flowSchemas = z.array(
  z.object({
    id: z.string(),
    description: z.string(),
  }),
)

interface FilterProps {
  onChangeFilter: (filters: CommunityPostsFilterForm) => void
}

export function Filter({ onChangeFilter }: FilterProps) {
  const { t } = useTranslation()

  const { data: flows } = useSuspenseQuery({
    queryKey: ['workflow-builder-get-flow-schemas-list'],
    queryFn: async () => {
      const response = await request('GET', '/schemas')

      const data = await response.json()

      return flowSchemas.parse(data.flowSchemas)
    },
  })

  const form = useForm<CommunityPostsFilterForm>({
    resolver: zodResolver(communityPostsFilterFormSchema),
    defaultValues: { author: '', flowSchemaId: '' },
  })

  return (
    <Card className="flex w-full flex-col items-center md:h-full md:min-w-70">
      <CardHeader className="flex w-full flex-col items-center space-y-1">
        <CardTitle>{t('filter')}</CardTitle>

        <CardDescription>
          {t('useTheFiltersToMakeYourSearchEasier')}
        </CardDescription>
      </CardHeader>

      <CardContent className="w-full flex-1">
        <Form {...form}>
          <form
            id="community-form-filter"
            className="flex w-full flex-col space-y-2"
            onSubmit={form.handleSubmit((data) => onChangeFilter(data))}
          >
            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('author')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('author')} {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>{t('startDate')}</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'bg-input/30 hover:bg-input/50 w-full pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground',
                          )}
                        >
                          {field.value ? (
                            format(field.value, 'PPP')
                          ) : (
                            <span>{t('pickADate')}</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date: Date) =>
                          date > new Date() || date < new Date('1900-01-01')
                        }
                        captionLayout="dropdown"
                      />
                    </PopoverContent>
                  </Popover>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>{t('endDate')}</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'bg-input/30 hover:bg-input/50 w-full pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground',
                          )}
                        >
                          {field.value ? (
                            format(field.value, 'PPP')
                          ) : (
                            <span>{t('pickADate')}</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date: Date) =>
                          date > new Date() || date < new Date('1900-01-01')
                        }
                        captionLayout="dropdown"
                      />
                    </PopoverContent>
                  </Popover>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="downloads"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('minimumDownloads')}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t('minimumDownloads')}
                      type="number"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="flowSchemaId"
              control={form.control}
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>{t('schema')}</FormLabel>

                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger id="flow-selector-id" className="w-full">
                          <SelectValue placeholder={t('selectSchema')} />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        {flows.map(({ id, description }) => (
                          <SelectItem key={id} value={id}>
                            {description}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )
              }}
            />
          </form>
        </Form>
      </CardContent>

      <CardFooter className="flex w-full flex-col space-y-2">
        <Button
          size="full"
          variant="ghost"
          form="community-form-filter"
          onClick={() => form.reset()}
        >
          {t('reset')}
        </Button>

        <Button type="submit" size="full" form="community-form-filter">
          {t('filter')}
        </Button>
      </CardFooter>
    </Card>
  )
}
