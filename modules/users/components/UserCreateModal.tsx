'use client'
import { useCreateUserMutation } from '../api'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
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
import { Checkbox } from '@/components/ui/checkbox'

const formSchema = z.object({
    username: z.string().min(2, {
        message: 'Tên đăng nhập phải có ít nhất 2 ký tự.',
    }),
    email: z.string().email({
        message: 'Email không hợp lệ.',
    }),
    password: z.string().min(6, {
        message: 'Mật khẩu phải có ít nhất 6 ký tự.',
    }),
    is_superuser: z.boolean().default(false),
})

type FormValues = z.infer<typeof formSchema>

export default function UserCreateModal() {
    const [createUser] = useCreateUserMutation()
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: '',
            email: '',
            password: '',
            is_superuser: false,
        },
    })

    const onSubmit = async (values: FormValues) => {
        try {
            await createUser(values).unwrap()
            toast.success('Người dùng đã được tạo!')
            form.reset()
        } catch (err) {
            toast.error('Có lỗi xảy ra!')
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Thêm người dùng</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Thêm người dùng</DialogTitle>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4 p-4"
                    >
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tên đăng nhập</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Tên đăng nhập"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Tên đăng nhập sẽ được sử dụng để đăng
                                        nhập.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            placeholder="Email"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Email sẽ được sử dụng để liên hệ.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Mật khẩu</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="Mật khẩu"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Mật khẩu phải có ít nhất 6 ký tự.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="is_superuser"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel>Là quản trị viên</FormLabel>
                                        <FormDescription>
                                            Người dùng này sẽ có quyền quản trị.
                                        </FormDescription>
                                    </div>
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Tạo</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
