import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'

export function ReportsPlaceholder() {
    return (
        <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
                <CardTitle>Reports Content</CardTitle>
                <CardDescription>
                    Generated reports will appear here.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="h-[400px] flex items-center justify-center border border-dashed border-gray-700 rounded-lg">
                    <p className="text-gray-400">
                        Report data and tables will be displayed here
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}
