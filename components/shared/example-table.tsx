'use client'

import { ColumnDef } from '@tanstack/react-table'
import { DataTable } from '@/components/ui/data-table'

// Define the type for your data
type ExampleData = {
    id: string
    name: string
    email: string
    status: 'active' | 'inactive'
    createdAt: string
}

// Define your columns
const columns: ColumnDef<ExampleData>[] = [
    {
        accessorKey: 'name',
        header: 'Name',
    },
    {
        accessorKey: 'email',
        header: 'Email',
    },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
            const status = row.getValue('status') as string
            return (
                <div
                    className={`capitalize ${
                        status === 'active' ? 'text-green-500' : 'text-red-500'
                    }`}
                >
                    {status}
                </div>
            )
        },
    },
    {
        accessorKey: 'createdAt',
        header: 'Created At',
        cell: ({ row }) => {
            const date = new Date(row.getValue('createdAt'))
            return date.toLocaleDateString()
        },
    },
]

// Example data
const data: ExampleData[] = [
    {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        status: 'active',
        createdAt: '2024-03-20',
    },
    {
        id: '2',
        name: 'Jane Smith',
        email: 'jane@example.com',
        status: 'inactive',
        createdAt: '2024-03-19',
    },
    // Add more data as needed
]

export function ExampleTable() {
    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data} searchKey="name" />
        </div>
    )
}
