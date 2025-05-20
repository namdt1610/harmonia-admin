'use client'

import { useAdminArtists } from '../hooks/useAdminArtists'
import { columns } from '@/modules/artists/components/ArtistColumns'
import { DataTable } from '@/components/ui/data-table'
import { DataTablePagination } from '@/components/ui/data-table-pagination'
import { DataTableViewOptions } from '@/components/ui/columns-toggle'
import { useReactTable, getCoreRowModel } from '@tanstack/react-table'

export default function ArtistDataTable() {
    const { artists } = useAdminArtists()

    const table = useReactTable({
        data: artists,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <div className="container mx-auto space-y-4">
            <DataTableViewOptions table={table} />
            <DataTable columns={columns} data={artists} />
            <DataTablePagination table={table} />
        </div>
    )
}
