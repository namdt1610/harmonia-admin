'use client'

import { DataTable } from '@/components/ui/data-table'
import { columns } from './AlbumColumns'
import { Album } from '@/types'

interface AlbumDataTableProps {
    data: Album[]
}

export function AlbumDataTable({ data }: AlbumDataTableProps) {
    return <DataTable columns={columns} data={data} />
}
