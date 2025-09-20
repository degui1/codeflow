import { useTranslation } from 'react-i18next'
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
import { Label } from './ui/label'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { cn } from '@/lib/utils'
import { Popover, PopoverTrigger, PopoverContent } from './ui/popover'
import { Calendar } from './ui/calendar'
import { format } from 'date-fns'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from './ui/form'
import { CalendarIcon } from 'lucide-react'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from './ui/select'
import { useSuspenseQuery } from '@tanstack/react-query'
import { request } from '@/api/api-client'

const communityPostsFilterFormSchema = z.object({
  author: z.string().optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  flowSchemaId: z.string().uuid().optional(),
  downloads: z.number().optional(),
})

const flowSchemas = z.array(
  z.object({
    id: z.string(),
    description: z.string(),
  }),
)

type CommunityPostsFilterForm = z.infer<typeof communityPostsFilterFormSchema>

export const Filter = () => {
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
    defaultValues: {},
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
            onSubmit={form.handleSubmit((data) => console.log(data))}
          >
            <Label htmlFor="field-author">Autor</Label>
            <Input id="field-author" placeholder="Autor" />

            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Start date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-[240px] pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground',
                          )}
                        >
                          {field.value ? (
                            format(field.value, 'PPP')
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
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
                  <FormLabel>End date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-[240px] pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground',
                          )}
                        >
                          {field.value ? (
                            format(field.value, 'PPP')
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
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

            <Label htmlFor="field-downloads">Min. downloads</Label>
            <Input
              id="field-downloads"
              placeholder="Min. downloads"
              type="number"
            />

            <FormField
              name="flowSchemaId"
              control={form.control}
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Flow builder</FormLabel>

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
          type="reset"
          size="full"
          variant="ghost"
          form="community-form-filter"
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
