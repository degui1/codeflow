// import { ThumbsUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useUserInfo } from '@/hooks/useUserInfo'
// import { FlowCanvas } from '@/components/ui/flow-canvas'
import { FlowPreview } from '@/components/ui/flow-preview'
import { mockFlows } from '@/components/ui/mockFlows'

export function Profile() {
  const { data: userInfo } = useUserInfo()

  return (
    <div className="flex w-full max-w-[1360px] flex-1 flex-col gap-7 p-5 lg:flex-row-reverse lg:self-center">
      <aside className="flex w-full flex-col items-center justify-between space-y-5 sm:flex-1 md:space-y-0 lg:max-w-[300px]">
        <Card className="flex w-full flex-col items-center justify-between p-6 shadow-lg md:h-full">
          <CardHeader className="flex flex-col items-center">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <div className="flex flex-col items-center">
              <CardTitle className="text-white">{userInfo?.username}</CardTitle>
              <CardDescription>{userInfo?.email}</CardDescription>
            </div>
          </CardHeader>

          <CardContent className="w-full flex-col space-y-4">
            {[1, 2].map((value) => (
              <div
                key={value}
                className="flex flex-1 justify-between rounded-md px-4 py-2"
              >
                <span>Posts</span>
                <span className="font-bold">8</span>
              </div>
            ))}
          </CardContent>

          <CardFooter className="w-full px-0">
            <Button className="flex-1">Settings</Button>
          </CardFooter>
        </Card>
      </aside>

      <main className="grid w-full max-w-[960px] grid-cols-1 gap-9 sm:grid-cols-2 xl:grid-cols-3">
        {/* {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((_, i) => { */}
        {mockFlows.map((_, i) => {
          return (
            <article key={i} className="">
              {/* <header>
                <h1>Title</h1>
              </header>

              <main className="">
                <Card className="flex h-60 flex-col justify-between p-0 md:h-40">
                  <div className="flex h-full w-full flex-1 items-center justify-center p-0">
                    <FlowCanvas code={code} />
                  </div>
                </Card>
              </main>

              <footer className="flex w-full items-baseline justify-between text-xs">
                <span className="text-left font-bold text-gray-400">
                  by TestUser
                </span>

                <div className="text-right font-bold text-gray-400">
                  <Button size="icon" variant="ghost">
                    <ThumbsUp />
                  </Button>
                  <span>10</span>
                </div>
              </footer> */}
              <FlowPreview
                id={_.id}
                code={_.code}
                author={_.author}
                likes={_.likes}
                title={_.title}
              />
            </article>
          )
        })}
      </main>
    </div>
  )
}
