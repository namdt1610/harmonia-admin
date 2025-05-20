'use client'

import { DataTable } from '@/components/ui/data-table'
import { columns } from './TrackColumns'
import { Track } from '@/types'

interface TrackDataTableProps {
    data: Track[]
}

export function TrackDataTable({ data }: TrackDataTableProps) {
    return <DataTable columns={columns} data={data} />
}
