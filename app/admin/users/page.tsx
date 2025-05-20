'use client'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import UserDataTable from '@/modules/users/components/UserDataTable'
import UserCreateModal from '@/modules/users/components/UserCreateModal'

export default function UsersPage() {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Users</CardTitle>
                <UserCreateModal />
            </CardHeader>
            <CardContent>
                <Separator className="mb-4" />
                <UserDataTable />
            </CardContent>
        </Card>
    )
}
