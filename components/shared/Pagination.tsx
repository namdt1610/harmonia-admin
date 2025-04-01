import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginationProps {
    totalPages: number
    currentPage: number
}

export function Pagination({ totalPages, currentPage }: PaginationProps) {
    const renderPageButtons = () => {
        const buttons = []

        // Show first page
        buttons.push(
            <Button
                key="page-1"
                variant={currentPage === 1 ? 'default' : 'outline'}
                size="sm"
                className={
                    currentPage === 1
                        ? 'bg-spotifyGreen hover:bg-spotifyGreen/90 text-black'
                        : 'border-gray-700 text-gray-300 hover:bg-gray-800'
                }
            >
                1
            </Button>
        )

        // Add ellipsis if needed
        if (currentPage > 3) {
            buttons.push(
                <Button
                    key="ellipsis-1"
                    variant="ghost"
                    size="sm"
                    disabled
                    className="text-gray-400"
                >
                    ...
                </Button>
            )
        }

        // Add pages around current page
        for (
            let i = Math.max(2, currentPage - 1);
            i <= Math.min(totalPages - 1, currentPage + 1);
            i++
        ) {
            if (i === 1 || i === totalPages) continue // Skip first and last page as they're handled separately

            buttons.push(
                <Button
                    key={`page-${i}`}
                    variant={currentPage === i ? 'default' : 'outline'}
                    size="sm"
                    className={
                        currentPage === i
                            ? 'bg-spotifyGreen hover:bg-spotifyGreen/90 text-black'
                            : 'border-gray-700 text-gray-300 hover:bg-gray-800'
                    }
                >
                    {i}
                </Button>
            )
        }

        // Add ellipsis if needed
        if (currentPage < totalPages - 2) {
            buttons.push(
                <Button
                    key="ellipsis-2"
                    variant="ghost"
                    size="sm"
                    disabled
                    className="text-gray-400"
                >
                    ...
                </Button>
            )
        }

        // Show last page if there are more than 1 page
        if (totalPages > 1) {
            buttons.push(
                <Button
                    key={`page-${totalPages}`}
                    variant={currentPage === totalPages ? 'default' : 'outline'}
                    size="sm"
                    className={
                        currentPage === totalPages
                            ? 'bg-spotifyGreen hover:bg-spotifyGreen/90 text-black'
                            : 'border-gray-700 text-gray-300 hover:bg-gray-800'
                    }
                >
                    {totalPages}
                </Button>
            )
        }

        return buttons
    }

    return (
        <div className="flex items-center space-x-2">
            <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                className="border-gray-700 text-gray-300 hover:bg-gray-800"
            >
                <ChevronLeft className="h-4 w-4" />
            </Button>

            {renderPageButtons()}

            <Button
                variant="outline"
                size="sm"
                disabled={currentPage === totalPages}
                className="border-gray-700 text-gray-300 hover:bg-gray-800"
            >
                <ChevronRight className="h-4 w-4" />
            </Button>
        </div>
    )
}
