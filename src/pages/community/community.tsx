import { useMemo, useState } from 'react'
import { useSuspenseQuery } from '@tanstack/react-query'
import { Filter } from '@/components/filter'
import CommunityService from '@/services/CommunityService'
import { FlowPreview } from '@/components/flow-preview'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { FlowCodePreview } from '@/components/workflow-builder/FlowCodePreview'

export interface Template {
  id: number
  title: string
  description: string
  downloads: number
  idAuthor: number
  idAction: string
  user: {
    username: string
  }
  _count: {
    Like: number
  }
}

export function Community() {
  const [filter, setFilter] = useState<Filter>({
    idAuthor: '',
    idAction: '',
  })

  const [isPostVisibile, setIsPostVisible] = useState<boolean>(false)

  const {
    data: { posts },
  } = useSuspenseQuery<{ posts: Template[] }>({
    queryKey: ['community-flows-posts-get-request'],
    queryFn: CommunityService.getTemplates,
  })

  const callBack = (dataFiltered: Filter) => {
    setFilter({
      idAuthor: dataFiltered.idAuthor,
      idAction: dataFiltered.idAction,
    })
  }

  const callbackDialog = (isPostVisibile: boolean) => {
    setIsPostVisible(isPostVisibile)
  }
  console.log(isPostVisibile)

  const filteredTemplates = useMemo(() => {
    return posts?.filter((item) => {
      const matchAuthor =
        !filter?.idAuthor || item.idAuthor === Number(filter.idAuthor)
      const matchAction = !filter?.idAction || item.idAction === filter.idAction

      return matchAuthor && matchAction
    })
  }, [])

  return (
    <div className="container mx-auto flex-col items-center justify-center">
      <main className="grid w-full grid-cols-4 gap-6 md:grid-cols-4 lg:grid-cols-4">
        <h1 className="col-span-4 h-15 text-2xl font-bold">Community</h1>

        <Filter data={posts ?? []} filteredData={callBack} />

        <section className="col-span-4 md:col-span-1 lg:col-span-1">
          <h2 className="text-2xl">Templates</h2>
          {filteredTemplates?.map((item: Template, index: number) => (
            <div key={index} className="m-4">
              <FlowPreview
                setIsDialogOpen={callbackDialog}
                isDialogOpen={isPostVisibile}
                likes={item.downloads}
                code={item.description}
                key={index}
                title={item.title}
                author={item.user.username}
              />
              <Dialog modal open={isPostVisibile} onOpenChange={callbackDialog}>
                <DialogContent className="h-80 w-full">
                  <DialogHeader>
                    <DialogTitle className="text-center">
                      {item.title}
                    </DialogTitle>
                  </DialogHeader>
                  <FlowCodePreview yamlCode={item.description} />
                </DialogContent>
              </Dialog>
            </div>
          ))}
        </section>
      </main>
    </div>
  )
}
