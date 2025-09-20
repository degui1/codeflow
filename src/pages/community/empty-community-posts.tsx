import { Siren } from 'lucide-react'

export function EmptyCommunityPosts() {
  return (
    <div className="[background-image:repeating-radial-gradient(circle,theme(colors.background)_0,theme(colors.foreground)_0.1px,theme(color.background)_1px,transparent_14px)] col-span-3 flex flex-1 flex-col items-center justify-center space-y-8 [background-size:20px_20px]">
      <Siren size={32} className="text-amber-300 opacity-100" />

      <h2 className="text-lg font-semibold">Não há nenhum post</h2>
    </div>
  )
}
