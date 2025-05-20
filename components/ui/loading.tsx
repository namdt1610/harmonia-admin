import { Loader2 } from 'lucide-react'

interface LoadingProps {
    text?: string
}

export function Loading({ text = 'Đang tải...' }: LoadingProps) {
    return (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50">
            <div className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <p className="text-lg font-medium">{text}</p>
                </div>
            </div>
        </div>
    )
}
