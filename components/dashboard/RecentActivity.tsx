import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Activity } from 'lucide-react'

export function RecentActivity() {
    const activities = [1, 2, 3, 4].map((i) => ({
        id: i,
        title: 'New artist verified',
        description: `Artist Name ${i} was verified`,
        time: `${i}h ago`,
    }))

    return (
        <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
                <CardTitle className="text-lg font-medium">
                    Recent Activity
                </CardTitle>
                <CardDescription className="text-gray-400">
                    Latest platform events
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {activities.map((activity) => (
                        <div key={activity.id} className="flex gap-3 text-sm">
                            <div className="rounded-full h-8 w-8 bg-gray-800 flex items-center justify-center flex-shrink-0">
                                <Activity className="h-4 w-4 text-spotifyGreen" />
                            </div>
                            <div>
                                <p className="font-medium">{activity.title}</p>
                                <p className="text-xs text-gray-400">
                                    {activity.description}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                    {activity.time}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
