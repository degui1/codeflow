import { request } from '@/api/api-client'
import { queryClient } from '@/lib/react-query'
import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'

export const useLikePost = () => {
  const { t } = useTranslation()

  const likePostMutation = useMutation({
    mutationFn: async (postId: string) => {
      await request('PUT', '/posts/like', {
        id: postId,
      })
    },
    onSuccess() {
      queryClient.refetchQueries({ queryKey: ['community-get-public-posts'] })
    },
    onError() {
      toast.error(t('somethingWentWrong'))
    },
  })

  return {
    likePostMutation,
  }
}
