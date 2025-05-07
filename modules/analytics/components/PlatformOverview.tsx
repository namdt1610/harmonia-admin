import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
    ArrowUpRight,
    ArrowDownRight,
    Music,
    Users,
    Clock,
    Headphones,
} from 'lucide-react'

export function PlatformOverview() {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <MetricCard
                title="Total Streams"
                value="8.2M"
                change="+12.5%"
                trend="up"
                icon={<Headphones className="h-4 w-4 text-spotifyGreen" />}
            />

            <MetricCard
                title="Active Users"
                value="1.4M"
                change="+8.3%"
                trend="up"
                icon={<Users className="h-4 w-4 text-spotifyGreen" />}
            />

            <MetricCard
                title="Avg. Session"
                value="42 min"
                change="-2.1%"
                trend="down"
                icon={<Clock className="h-4 w-4 text-spotifyGreen" />}
            />

            <MetricCard
                title="New Content"
                value="+3,841"
                change="+24.5%"
                trend="up"
                icon={<Music className="h-4 w-4 text-spotifyGreen" />}
            />
        </div>
    )
}

interface MetricCardProps {
    title: string
    value: string
    change: string
    trend: 'up' | 'down'
    icon: React.ReactNode
}

function MetricCard({ title, value, change, trend, icon }: MetricCardProps) {
    return (
        <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">
                    {title}
                </CardTitle>
                {icon}
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-white">{value}</div>
                <div
                    className={`text-xs flex items-center mt-1 ${
                        trend === 'up' ? 'text-green-500' : 'text-red-500'
                    }`}
                >
                    {trend === 'up' ? (
                        <ArrowUpRight className="h-3 w-3 mr-1" />
                    ) : (
                        <ArrowDownRight className="h-3 w-3 mr-1" />
                    )}
                    {change} from last period
                </div>
            </CardContent>
        </Card>
    )
}
