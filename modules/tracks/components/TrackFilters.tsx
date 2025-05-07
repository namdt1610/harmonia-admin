import { Input } from '@/components/ui/input'

export default function TrackFilters({
    onFilter,
}: {
    onFilter: (query: string) => void
}) {
    return (
        <div className="mb-4">
            <Input
                placeholder="Search by title or artist"
                onChange={(e) => onFilter(e.target.value)}
                className="w-64"
            />
        </div>
    )
}
