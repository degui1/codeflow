import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { z } from 'zod'

import { request } from '@/api/api-client'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useFlowStore } from '@/hooks/useFlowStore'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from '@/hooks/useRouter'
import { format } from '@/utils/format'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const createPostFormSchema = z.object({
  title: z.string(),
  description: z.string(),
  visibility: z.enum(['PRIVATE', 'PUBLIC']),
})

type CreatePostForm = z.infer<typeof createPostFormSchema>

interface CreatePostProps {
  open: boolean
  onClose: VoidFunction
  code: string
}

export function CreatePost({ open, onClose, code }: CreatePostProps) {
  const { flowSchemaId } = useFlowStore()
  const { t } = useTranslation()
  const { navigate } = useRouter()

  const form = useForm<CreatePostForm>({
    resolver: zodResolver(createPostFormSchema),
    defaultValues: {
      visibility: 'PRIVATE',
    },
  })

  const createPostMutation = useMutation({
    mutationFn: async ({
      title,
      description,
      visibility,
    }: {
      title: string
      description: string
      visibility: 'PUBLIC' | 'PRIVATE'
    }) => {
      await request('POST', '/posts', {
        flowSchemaId,
        content: code,
        description,
        title,
        visibility,
      })
    },
    onSuccess() {
      onClose()

      toast(t('postDateOfCreationTitle'), {
        description: format(new Date(), t('postDateOfCreationFormat')),
        action: {
          label: t('visualize'),
          onClick: () => navigate('PROFILE'),
        },
      })
    },
    onError(error) {
      toast.error(error.message)
    },
  })

  return (
    <Dialog modal open={open} onOpenChange={() => onClose()}>
      <DialogContent className="flex w-full flex-col">
        <DialogHeader>
          <DialogTitle className="text-center"></DialogTitle>
        </DialogHeader>

        <div className="flex w-full flex-1 justify-center">
          <Form {...form}>
            <form
              id="community-form-filter"
              className="flex w-full flex-col space-y-6"
              onSubmit={form.handleSubmit((data) => {
                createPostMutation.mutateAsync({
                  title: data.title,
                  description: data.description,
                  visibility: data.visibility,
                })
              })}
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('title')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('title')} {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('description')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('description')} {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="visibility"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Visibilidade</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue
                            className="w-full"
                            placeholder="Select a visibility"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {['PUBLIC', 'PRIVATE'].map((option) => {
                          return (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          )
                        })}
                      </SelectContent>
                    </Select>

                    <FormDescription>
                      Escolha a visibilidade do post
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button
              variant="outline"
              form="community-form-filter"
              onClick={() => {
                form.reset()
              }}
            >
              {t('cancel')}
            </Button>
          </DialogClose>
          <Button type="submit" form="community-form-filter">
            {t('save')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
