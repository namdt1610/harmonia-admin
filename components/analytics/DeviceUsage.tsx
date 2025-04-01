import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Smartphone } from 'lucide-react'

export function DeviceUsage() {
    return (
        <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
                <CardTitle className="text-lg font-medium">
                    Device Usage
                </CardTitle>
                <CardDescription className="text-gray-400">
                    Which devices your users listen on
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="h-[250px] flex items-center justify-center border border-dashed border-gray-700 rounded-lg">
                    <div className="flex flex-col items-center text-center">
                        <Smartphone className="h-8 w-8 text-spotifyGreen mb-2" />
                        <p className="text-gray-400">
                            Device usage chart will be displayed here
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
