'use client'

import { DataTable } from '@/components/ui/data-table'
import { columns } from './PlaylistColumns'
import { Playlist } from '@/types'

interface PlaylistDataTableProps {
    data: Playlist[]
}

export function PlaylistDataTable({ data }: PlaylistDataTableProps) {
    return <DataTable columns={columns} data={data} />
}
