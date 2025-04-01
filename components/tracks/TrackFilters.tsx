import { Button } from '@/components/ui/button'
import { Filter } from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuCheckboxItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function TrackFilters() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    className="border-gray-700 text-gray-300 hover:bg-gray-800"
                >
                    <Filter className="mr-2 h-4 w-4" /> Filter
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-gray-800 border-gray-700 text-white">
                <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-700" />
                <DropdownMenuCheckboxItem checked className="hover:bg-gray-700">
                    Active
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem className="hover:bg-gray-700">
                    Pending
                </DropdownMenuCheckboxItem>

                <DropdownMenuLabel className="mt-2">
                    Filter by Date
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-700" />
                <DropdownMenuCheckboxItem className="hover:bg-gray-700">
                    Last 7 days
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked className="hover:bg-gray-700">
                    Last 30 days
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem className="hover:bg-gray-700">
                    Last 90 days
                </DropdownMenuCheckboxItem>

                <DropdownMenuLabel className="mt-2">
                    Filter by Streams
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-700" />
                <DropdownMenuCheckboxItem className="hover:bg-gray-700">
                    1M+
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem className="hover:bg-gray-700">
                    100K - 1M
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem className="hover:bg-gray-700">
                    &lt; 100K
                </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
