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
        <Card>
            <CardHeader>
                <CardTitle className="text-lg font-medium">
                    Recent Activity
                </CardTitle>
                <CardDescription>Latest platform events</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {activities.map((activity) => (
                        <div key={activity.id} className="flex gap-3 text-sm">
                            <div className="rounded-full h-8 w-8  flex items-center justify-center flex-shrink-0">
                                <Activity className="h-4 w-4 " />
                            </div>
                            <div>
                                <p className="font-medium">{activity.title}</p>
                                <p className="text-xs ">
                                    {activity.description}
                                </p>
                                <p className="text-xs  mt-1">{activity.time}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
