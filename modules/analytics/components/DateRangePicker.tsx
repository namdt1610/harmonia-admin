'use client'

import { Button } from '@/components/ui/button'
import { Calendar } from 'lucide-react'

export function DateRangePicker() {
    return (
        <Button
            variant="outline"
            className="border-gray-700 text-gray-300 hover:bg-gray-800"
        >
            <Calendar className="mr-2 h-4 w-4" />
            Last 30 days
        </Button>
    )
}
