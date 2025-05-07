import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Clock } from 'lucide-react'

export function ListeningTrends() {
    return (
        <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
                <CardTitle className="text-lg font-medium">
                    Listening Trends
                </CardTitle>
                <CardDescription className="text-gray-400">
                    When users are most active
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="h-[250px] flex items-center justify-center border border-dashed border-gray-700 rounded-lg">
                    <div className="flex flex-col items-center text-center">
                        <Clock className="h-8 w-8 text-spotifyGreen mb-2" />
                        <p className="text-gray-400">
                            Listening trends chart will be displayed here
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
