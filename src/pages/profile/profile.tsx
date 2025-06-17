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
    <div className="m-auto flex h-[650px] max-w-375 bg-blue-500">
      <main className="flex-1">
        <article className="grid">
          <Card className="">
            <CardHeader>
              <Avatar className="flex justify-center">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="mt-30 table columns-2 text-center">
                <CardTitle>Username</CardTitle>
                <CardDescription>username@gmail.com.</CardDescription>
              </div>
            </CardHeader>
            <div className="mt-9">
              <CardContent className="inset-ring-gray-600 ...">
                Posts
              </CardContent>
              <CardContent>Likes</CardContent>
            </div>
            <CardFooter className="flex justify-between"></CardFooter>
          </Card>
        </article>
        <article></article>
        <article></article>
        <article></article>
        <article></article>
        <article></article>
      </main>
      <aside className="w-full max-w-85">
        <Card className="flex h-[600px] items-center justify-center">
          <CardHeader>
            <Avatar className="flex justify-center">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="mt-30 table columns-2 text-center">
              <CardTitle>Username</CardTitle>
              <CardDescription>username@gmail.com.</CardDescription>
            </div>
          </CardHeader>
          <div className="mt-9">
            <CardContent className="inset-ring-gray-600 ...">Posts</CardContent>
            <CardContent>Likes</CardContent>
          </div>
          <CardFooter className="flex justify-between"></CardFooter>
        </Card>
        <Button className="mt-5 flex w-full">Settings</Button>
      </aside>
    </div>
  )
}
