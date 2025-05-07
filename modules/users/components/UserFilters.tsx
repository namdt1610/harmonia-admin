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

export function UserFilters() {
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
                <DropdownMenuLabel>Subscription Type</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-700" />
                <DropdownMenuCheckboxItem checked className="hover:bg-gray-700">
                    Premium
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked className="hover:bg-gray-700">
                    Family
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked className="hover:bg-gray-700">
                    Student
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked className="hover:bg-gray-700">
                    Free
                </DropdownMenuCheckboxItem>

                <DropdownMenuLabel className="mt-2">Status</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-700" />
                <DropdownMenuCheckboxItem checked className="hover:bg-gray-700">
                    Active
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked className="hover:bg-gray-700">
                    Inactive
                </DropdownMenuCheckboxItem>

                <DropdownMenuLabel className="mt-2">
                    Verification
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-700" />
                <DropdownMenuCheckboxItem checked className="hover:bg-gray-700">
                    Verified
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked className="hover:bg-gray-700">
                    Unverified
                </DropdownMenuCheckboxItem>

                <DropdownMenuLabel className="mt-2">
                    Date Joined
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-700" />
                <DropdownMenuCheckboxItem className="hover:bg-gray-700">
                    Last 7 days
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked className="hover:bg-gray-700">
                    Last 30 days
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked className="hover:bg-gray-700">
                    Last 90 days
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked className="hover:bg-gray-700">
                    All time
                </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
