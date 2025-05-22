'use client'

import { Table } from '@tanstack/react-table'
import { DataTable } from './data-table'
import { DataTablePagination } from './data-table-pagination'
import { DataTableViewOptions } from './columns-toggle'

interface DataTableWrapperProps<TData> {
    table: Table<TData>
    columns: any[]
    data: TData[]
}

export function DataTableWrapper<TData>({
    table,
    columns,
    data,
}: DataTableWrapperProps<TData>) {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold tracking-tight">
                    Data Table
                </h2>
                <DataTableViewOptions table={table} />
            </div>
            <div className="rounded-md border">
                <DataTable columns={columns} data={data} table={table} />
            </div>
            <DataTablePagination table={table} />
        </div>
    )
}
