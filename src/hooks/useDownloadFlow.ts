import { request } from '@/api/api-client'
import { downloadFile } from '@/utils/downloadFile'
import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'

type DownloadFileParams = {
  filename?: string
  content: string
  postId: string
}

export const useDownloadFlow = () => {
  const { t } = useTranslation()

  const downloadFlowMutation = useMutation({
    mutationFn: async ({ filename, content, postId }: DownloadFileParams) => {
      await request('PUT', '/posts/download', {
        id: postId,
      })

      downloadFile(content, filename)
    },
    onError() {
      toast.error(t('somethingWentWrong'))
    },
  })

  return {
    downloadFlowMutation,
  }
}
