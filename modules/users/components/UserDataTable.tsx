'use client'
import { columns } from './UserColumns'
import { useGetUsersQuery } from '../api'
import { DataTableWrapper } from '@/components/ui/data-table-wrapper'
import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
} from '@tanstack/react-table'
import { useState } from 'react'

export default function UserDataTable() {
    const { data: users = [], isLoading } = useGetUsersQuery()
    console.log(users)
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    })

    const table = useReactTable({
        data: users,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
        state: {
            pagination,
        },
    })

    return (
        <div className="container mx-auto p-4">
            <DataTableWrapper table={table} columns={columns} data={users} />
        </div>
    )
}
