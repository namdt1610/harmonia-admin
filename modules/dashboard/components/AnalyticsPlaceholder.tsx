import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'

export function AnalyticsPlaceholder() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Analytics Content</CardTitle>
                <CardDescription>
                    Detailed metrics and analytics will appear here.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="h-[400px] flex items-center justify-center border border-dashed  rounded-lg">
                    <p>Analytics charts and graphs will be displayed here</p>
                </div>
            </CardContent>
        </Card>
    )
}
