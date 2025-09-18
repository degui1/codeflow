import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogFooter,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useUserInfo } from '@/hooks/useUserInfo'
import ProfileService from '@/services/ProfileService'
import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

interface SettingsProps {
  open: boolean
  onClose: VoidFunction
}

export function Settings({ open, onClose }: SettingsProps) {
  const { t } = useTranslation()

  const { data: userData } = useUserInfo()

  const { mutateAsync: handleDeleteAccount, isPending: isDeleting } =
    useMutation({ mutationFn: ProfileService.deleteAccount })

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-full">
        <DialogHeader>
          <DialogTitle className="text-center">Edit Profile</DialogTitle>
        </DialogHeader>

        <Label htmlFor="user-name">{t('name')}</Label>
        <Input id="user-name" defaultValue={userData?.name} />

        <Label htmlFor="user-username">{t('username')}</Label>
        <Input id="user-username" defaultValue={userData?.username} disabled />

        <Label htmlFor="user-email">{t('email')}</Label>
        <Input defaultValue={userData?.email} disabled />

        <Button
          disabled={isDeleting}
          onClick={() => handleDeleteAccount()}
          variant="destructive"
        >
          {t('deleteAccount')}
        </Button>

        <DialogFooter>
          <Button variant="ghost" onClick={() => onClose()}>
            {t('cancel')}
          </Button>

          <Button onClick={() => onClose()}>{t('save')}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
