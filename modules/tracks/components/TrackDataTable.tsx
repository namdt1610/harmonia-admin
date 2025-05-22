'use client'

import { columns } from './TrackColumns'
import { Track } from '@/types'
import { DataTableWrapper } from '@/components/ui/data-table-wrapper'
import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
} from '@tanstack/react-table'
import { useState } from 'react'

interface TrackDataTableProps {
    data: Track[]
}

export function TrackDataTable({ data }: TrackDataTableProps) {
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    })

    const table = useReactTable({
        data,
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
            <DataTableWrapper table={table} columns={columns} data={data} />
        </div>
    )
}
