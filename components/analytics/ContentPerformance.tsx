import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { BarChart } from 'lucide-react'

export function ContentPerformance() {
    return (
        <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
                <CardTitle className="text-lg font-medium">
                    Content Performance
                </CardTitle>
                <CardDescription className="text-gray-400">
                    Top performing tracks and artists
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="h-[300px] flex items-center justify-center border border-dashed border-gray-700 rounded-lg">
                    <div className="flex flex-col items-center text-center">
                        <BarChart className="h-8 w-8 text-spotifyGreen mb-2" />
                        <p className="text-gray-400">
                            Content performance chart will be displayed here
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
