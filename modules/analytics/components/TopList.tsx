import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface TopListProps {
    title: string
    items: Array<{
        id: number
        name: string
        value: number
    }>
}

export default function TopList({ title, items }: TopListProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {items.map((item) => (
                        <div
                            key={item.id}
                            className="flex items-center justify-between"
                        >
                            <div className="space-y-1">
                                <p className="text-sm font-medium leading-none">
                                    {item.name}
                                </p>
                            </div>
                            <div className="text-sm font-medium">
                                {item.value}
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
