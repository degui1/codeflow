import { /*useEffect,*/ useState } from 'react'

import { ThumbsUp } from 'lucide-react'
import { Button } from '@/components/ui/button'

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationEllipsis,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from './components/pagination'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from './components/Dialog'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
//import { apiCall } from '@/api/api-client'

export function Profile() {
  const [open, setOpen] = useState(false)

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
              <CardTitle className="text-white">Username</CardTitle>
              <CardDescription>username@gmail.com</CardDescription>
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
            <Button className="flex-1" onClick={() => setOpen(true)}>
              Settings
            </Button>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogContent className="w-full">
                <DialogHeader className="">
                  <DialogTitle className="text-center">
                    Edit Profile
                  </DialogTitle>
                </DialogHeader>
                <label>Name</label>
                <Input />
                <label>Username</label>
                <Input />
                <label>E-mail</label>
                <Input />
                <label>Profile Picture</label>
                <Input />
                <Button className="border-2 border-red-600 bg-transparent text-center font-bold text-red-600 hover:bg-red-600 hover:text-white">
                  Delete Account
                </Button>

                <DialogFooter>
                  <Button
                    className="bg-transparent text-amber-50 hover:text-zinc-800"
                    onClick={() => setOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="bg-transparent text-amber-50 hover:text-zinc-800"
                    onClick={() => setOpen(false)}
                  >
                    Save
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardFooter>
        </Card>
      </aside>

      <main className="grid w-full max-w-[960px] grid-cols-1 gap-9 sm:grid-cols-2 xl:grid-cols-3">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((_, i) => {
          return (
            <article key={i} className="">
              <header>
                <h1>Title</h1>
              </header>

              <main className="">
                <Card className="flex h-60 flex-col justify-between p-4 md:h-40">
                  <div className="flex w-full flex-1 flex-col items-center justify-center gap-4 px-4 text-center">
                    <Button variant="outline">Visualize</Button>
                    <Button variant="outline">Download</Button>
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
              </footer>
            </article>
          )
        })}
        <footer className="col-span-full flex justify-center">
          <Pagination className="">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </footer>
      </main>
    </div>
  )
}
