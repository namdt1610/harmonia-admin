import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Globe } from 'lucide-react'

export function GeographicDistribution() {
    return (
        <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
                <CardTitle className="text-lg font-medium">
                    Geographic Distribution
                </CardTitle>
                <CardDescription className="text-gray-400">
                    Where your users are listening from
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="h-[300px] flex items-center justify-center border border-dashed border-gray-700 rounded-lg">
                    <div className="flex flex-col items-center text-center">
                        <Globe className="h-8 w-8 text-spotifyGreen mb-2" />
                        <p className="text-gray-400">
                            Geographic map will be displayed here
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
