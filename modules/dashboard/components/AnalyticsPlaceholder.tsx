import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'

export function AnalyticsPlaceholder() {
    return (
        <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
                <CardTitle>Analytics Content</CardTitle>
                <CardDescription>
                    Detailed metrics and analytics will appear here.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="h-[400px] flex items-center justify-center border border-dashed border-gray-700 rounded-lg">
                    <p className="text-gray-400">
                        Analytics charts and graphs will be displayed here
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}
