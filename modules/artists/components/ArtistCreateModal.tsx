'use client'
import { useCreateArtistMutation } from '../api'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormDescription,
    FormMessage,
} from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Dialog, DialogTitle } from '@/components/ui/dialog'
import { DialogContent } from '@/components/ui/dialog'
import { DialogTrigger } from '@/components/ui/dialog'

const formSchema = z.object({
    name: z.string().min(2, {
        message: 'Tên nghệ sĩ phải có ít nhất 2 ký tự.',
    }),
    bio: z.string().optional(),
    avatar: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

export default function ArtistCreateModal() {
    const [createArtist] = useCreateArtistMutation()
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            bio: '',
            avatar: '',
        },
    })

    const onSubmit = async (values: FormValues) => {
        try {
            await createArtist(values).unwrap()
            toast.success('Nghệ sĩ đã được tạo!')
            form.reset()
        } catch (err) {
            toast.error('Có lỗi xảy ra!')
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Thêm nghệ sĩ</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Thêm nghệ sĩ</DialogTitle>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4 p-4"
                    >
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <>
                                    <FormItem>
                                        <FormLabel>Tên nghệ sĩ</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                placeholder="Tên nghệ sĩ"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Tên nghệ sĩ sẽ được hiển thị trên
                                            trang web.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                    <FormItem>
                                        <FormLabel>Thông tin nghệ sĩ</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Thông tin nghệ sĩ"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Thông tin nghệ sĩ sẽ được hiển thị
                                            trên trang web.
                                        </FormDescription>
                                    </FormItem>
                                    <FormItem>
                                        <FormLabel>Ảnh đại diện</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="file"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                </>
                            )}
                        />
                        <Button type="submit">Tạo</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
