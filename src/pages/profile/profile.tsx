import { Button } from '@/components/ui/button'

import { Avatar } from '@/components/ui/avatar'

import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
export function Profile() {
  return (
    <div className="flex min-h-screen flex-col gap-25 px-40 py-10 md:flex-row">
      <main className="flex-1">
        <div className="grid grid-cols-1 gap-9 sm:grid-cols-2 xl:grid-cols-3">
          {[...Array(9)].map((_, i) => {
            const title =
              i === 0
                ? 'Título do flow'
                : i === 1
                  ? 'Título do flow'
                  : i === 2
                    ? 'Título do flow'
                    : i === 3
                      ? 'YAML Teste Um'
                      : i === 4
                        ? 'YAML Teste Dois'
                        : i === 5
                          ? 'YAML Teste Três'
                          : 'Flow 123'
            const likes =
              i === 1
                ? 12
                : i === 4
                  ? 34
                  : i === 5
                    ? 5
                    : i === 6
                      ? 1
                      : i === 3
                        ? 0
                        : i === 0
                          ? 0
                          : 18
            return (
              <div key={i} className="flex flex-col">
                {/* Título acima do card */}
                <div className="text-left font-semibold text-white">
                  {title}
                </div>
                <Card className="flex h-40 flex-col justify-between bg-neutral-900 p-4">
                  <div>
                    <pre className="mb-2 bg-transparent text-xs text-gray-400"></pre>
                    {i === 1 && (
                      <div className="flex w-full flex-1 flex-col items-center justify-center gap-4 px-4 text-center">
                        <Button className="w-30 bg-[#23272f] text-white">
                          Visualize
                        </Button>
                        <Button className="w-30 bg-[#23272f] text-white">
                          Download
                        </Button>
                      </div>
                    )}
                  </div>
                </Card>
                <div className="flex w-full justify-between gap-15">
                  <div className="text-left text-xs font-bold text-gray-400">
                    by TestUser
                  </div>
                  <div className="flex items-center justify-end text-right text-xs font-bold text-gray-400">
                    <span className="flex items-center gap-1">
                      <span>joinha</span>
                      <span>{likes}</span>
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </main>
      {/* ASIDE */}
      <aside className="w-full md:mt-0 md:w-[340px]">
        <Card className="flex h-[665px] w-full flex-col items-center justify-between bg-neutral-900 p-6 text-white shadow-lg">
          <CardHeader className="flex flex-col items-center">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="mt-4 flex flex-col items-center">
              <CardTitle className="text-white">Username</CardTitle>
              <CardDescription>username@gmail.com</CardDescription>
            </div>
          </CardHeader>
          <div className="flex w-full flex-1 flex-col items-center justify-center gap-4 px-4 text-center">
            <CardContent className="flex w-full items-center justify-between rounded-md bg-[#23272f] py-2">
              <span>Posts</span>
              <span className="font-bold">8</span>
            </CardContent>
            <CardContent className="flex w-full items-center justify-between rounded-md bg-[#23272f] py-2">
              <span>Likes</span>
              <span className="font-bold">122</span>
            </CardContent>
          </div>
          <CardFooter className="w-full px-0">
            <Button className="w-full bg-[#23272f] text-white hover:bg-[#333]">
              Settings
            </Button>
          </CardFooter>
        </Card>
      </aside>
    </div>
  )
}
