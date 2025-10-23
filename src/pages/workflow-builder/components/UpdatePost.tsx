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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Post } from '@/schemas/posts/posts.schema'
import { queryClient } from '@/lib/react-query'
import {
  FlowCodePreview,
  FlowCodePreviewRef,
} from '@/components/workflow-builder/FlowCodePreview'
import { useRef } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { MarkdownEditor } from '@/components/MarkdownEditor'
import { ScrollArea } from '@/components/ui/scroll-area'

const editPostFormSchema = z.object({
  title: z.string(),
  description: z.string(),
  visibility: z.enum(['PRIVATE', 'PUBLIC']),
})

type EditPostForm = z.infer<typeof editPostFormSchema>

interface EditPostProps {
  open: boolean
  onClose: VoidFunction
  post: Post
}

export function EditPost({ open, onClose, post }: EditPostProps) {
  const editorRef = useRef<FlowCodePreviewRef>(null)
  const { t } = useTranslation()

  const form = useForm<EditPostForm>({
    resolver: zodResolver(editPostFormSchema),
    defaultValues: {
      title: post.title,
      description: post.description,
      visibility: post.visibility,
    },
  })

  const editPostMutation = useMutation({
    mutationFn: async ({
      title,
      description,
      visibility,
    }: {
      title?: string
      description?: string
      visibility?: 'PUBLIC' | 'PRIVATE'
    }) => {
      await request('PATCH', '/posts', {
        ...(editorRef.current?.getContent() !== post.flow.content && {
          content: editorRef.current?.getContent(),
        }),
        description: description,
        title: title,
        visibility: visibility,
        id: post.id,
      })
    },
    async onSuccess() {
      queryClient.refetchQueries({
        queryKey: ['profile-get-user-post-history'],
      })

      onClose()

      toast(t('postUpdated'))
    },
    onError(error) {
      toast.error(error.message)
    },
  })

  const deletePostMutation = useMutation({
    mutationFn: async () => {
      await request('DELETE', '/posts', {
        id: post.id,
      })
    },
    async onSuccess() {
      queryClient.refetchQueries({
        queryKey: ['profile-get-user-post-history'],
      })

      queryClient.refetchQueries({
        queryKey: ['profile-get-user-summary'],
      })

      onClose()

      toast(t('postDeleted'))
    },
    onError() {
      toast.error(t('somethingWentWrong'))
    },
  })

  return (
    <Dialog modal open={open} onOpenChange={() => onClose()}>
      <DialogContent className="flex max-h-[80%] w-full max-w-max flex-col md:max-w-5xl">
        <DialogHeader>
          <DialogTitle className="text-center"></DialogTitle>
        </DialogHeader>

        <ScrollArea className="flex w-full flex-1 flex-col items-center justify-center overflow-y-auto">
          <Form {...form}>
            <form
              id="community-form-filter"
              className="flex w-full flex-col space-y-6"
              onSubmit={form.handleSubmit((data) => {
                editPostMutation.mutateAsync({
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
                      <MarkdownEditor className="min-h-80" {...field} />
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
                    <FormLabel>{t('visibility')}</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue
                            className="w-full"
                            placeholder={t('selectAVisibility')}
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
                      {t('selectPostVisibility')}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>

          <div className="flex w-full">
            <FlowCodePreview
              ref={editorRef}
              yamlCode={post.flow.content}
              isPreview
            />
          </div>
        </ScrollArea>

        <DialogFooter>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="mr-auto">
                {t('deletePost')}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>{t('areYouAbsolutelySure')}</AlertDialogTitle>
                <AlertDialogDescription>
                  {t('deletePostWarning')}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel disabled={deletePostMutation.isPending}>
                  {t('cancel')}
                </AlertDialogCancel>
                <AlertDialogAction
                  disabled={deletePostMutation.isPending}
                  onClick={async () => {
                    deletePostMutation.mutateAsync()
                  }}
                >
                  {t('deletePost')}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

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
          <Button
            type="submit"
            form="community-form-filter"
            disabled={editPostMutation.isPending}
          >
            {t('save')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
