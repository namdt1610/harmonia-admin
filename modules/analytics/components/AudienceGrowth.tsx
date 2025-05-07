import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { LineChart } from 'lucide-react'

export function AudienceGrowth() {
    return (
        <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
                <CardTitle className="text-lg font-medium">
                    Audience Growth
                </CardTitle>
                <CardDescription className="text-gray-400">
                    New and recurring user trends
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="h-[300px] flex items-center justify-center border border-dashed border-gray-700 rounded-lg">
                    <div className="flex flex-col items-center text-center">
                        <LineChart className="h-8 w-8 text-spotifyGreen mb-2" />
                        <p className="text-gray-400">
                            Audience growth chart will be displayed here
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
