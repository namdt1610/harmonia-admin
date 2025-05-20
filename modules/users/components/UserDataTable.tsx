'use client'
import { DataTable } from '@/components/ui/data-table'
import { columns } from './UserColumns'
import { useGetUsersQuery } from '../api'

export default function UserDataTable() {
    const { data: users = [], isLoading } = useGetUsersQuery()

    return <DataTable columns={columns} data={users} isLoading={isLoading} />
}
