import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'

export function ReportsPlaceholder() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Reports Content</CardTitle>
                <CardDescription>
                    Generated reports will appear here.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="h-[400px] flex items-center justify-center border border-dashed  rounded-lg">
                    <p>Report data and tables will be displayed here</p>
                </div>
            </CardContent>
        </Card>
    )
}
