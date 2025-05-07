'use client'
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

interface ConfirmDialogProps {
    open: boolean
    title?: string
    description?: string
    onCancel: () => void
    onConfirm: () => void
    confirmText?: string
    cancelText?: string
    loading?: boolean
}

export default function ConfirmDialog({
    open,
    title = 'Xác nhận',
    description,
    onCancel,
    onConfirm,
    confirmText = 'Xóa',
    cancelText = 'Hủy',
    loading = false,
}: ConfirmDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onCancel}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                {description && (
                    <div className="mb-4 text-black">{description}</div>
                )}
                <DialogFooter>
                    <Button className='text-black' variant="outline" onClick={onCancel}>
                        {cancelText}
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={onConfirm}
                        disabled={loading}
                    >
                        {confirmText}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
