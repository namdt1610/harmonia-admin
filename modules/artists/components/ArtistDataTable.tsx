'use client'

import { useAdminArtists } from '../hooks/useAdminArtists'
import { columns } from '@/modules/artists/components/ArtistColumns'
import { DataTableWrapper } from '@/components/ui/data-table-wrapper'
import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
} from '@tanstack/react-table'
import { useState } from 'react'

export default function ArtistDataTable() {
    const { artists } = useAdminArtists()
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    })

    const table = useReactTable({
        data: artists,
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
            <DataTableWrapper table={table} columns={columns} data={artists} />
        </div>
    )
}
