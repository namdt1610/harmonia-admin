import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Plus, Save, RefreshCw } from 'lucide-react'

export function ApiSettings() {
    return (
        <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    <span>API Keys & Developer Settings</span>
                    <Button className="bg-spotifyGreen hover:bg-spotifyGreen/90 text-black">
                        <Plus className="mr-2 h-4 w-4" /> Generate New Key
                    </Button>
                </CardTitle>
                <CardDescription>
                    Manage API keys for external integrations
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <ApiKeysTable />

                <Separator className="bg-gray-800" />

                <WebhookSettings />
            </CardContent>
            <CardFooter className="flex justify-end border-t border-gray-800 pt-5">
                <Button className="bg-spotifyGreen hover:bg-spotifyGreen/90 text-black">
                    <Save className="mr-2 h-4 w-4" /> Save API Settings
                </Button>
            </CardFooter>
        </Card>
    )
}

function ApiKeysTable() {
    return (
        <div className="overflow-auto">
            <table className="w-full">
                <thead>
                    <tr className="border-b border-gray-800">
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
                            Key Name
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
                            API Key
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
                            Created
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
                            Last Used
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
                            Status
                        </th>
                        <th className="text-right py-3 px-4 text-sm font-medium text-gray-400">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="border-b border-gray-800">
                        <td className="py-3 px-4">
                            <div className="font-medium">Main API Key</div>
                            <div className="text-xs text-gray-400">
                                Production use
                            </div>
                        </td>
                        <td className="py-3 px-4">
                            <code className="text-xs bg-gray-800 p-1 rounded">
                                ••••••••••••••••8f92
                            </code>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-400">
                            2023-09-15
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-400">
                            Today
                        </td>
                        <td className="py-3 px-4">
                            <Badge className="bg-green-500/20 text-green-500 hover:bg-green-500/20">
                                Active
                            </Badge>
                        </td>
                        <td className="py-3 px-4 text-right">
                            <div className="flex justify-end gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="h-8 border-gray-700 text-gray-300 hover:bg-gray-800"
                                >
                                    <RefreshCw className="h-3 w-3 mr-1" />{' '}
                                    Rotate
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="h-8 border-gray-700 text-red-500 hover:bg-gray-800"
                                >
                                    Revoke
                                </Button>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className="py-3 px-4">
                            <div className="font-medium">
                                Development API Key
                            </div>
                            <div className="text-xs text-gray-400">
                                Local testing
                            </div>
                        </td>
                        <td className="py-3 px-4">
                            <code className="text-xs bg-gray-800 p-1 rounded">
                                ••••••••••••••••3a7b
                            </code>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-400">
                            2023-10-03
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-400">
                            3 days ago
                        </td>
                        <td className="py-3 px-4">
                            <Badge className="bg-green-500/20 text-green-500 hover:bg-green-500/20">
                                Active
                            </Badge>
                        </td>
                        <td className="py-3 px-4 text-right">
                            <div className="flex justify-end gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="h-8 border-gray-700 text-gray-300 hover:bg-gray-800"
                                >
                                    <RefreshCw className="h-3 w-3 mr-1" />{' '}
                                    Rotate
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="h-8 border-gray-700 text-red-500 hover:bg-gray-800"
                                >
                                    Revoke
                                </Button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

function WebhookSettings() {
    return (
        <div>
            <h3 className="text-sm font-medium mb-3">Webhook Settings</h3>
            <div className="space-y-3">
                <div className="space-y-2">
                    <Label htmlFor="webhook-url">Webhook URL</Label>
                    <div className="flex gap-2">
                        <Input
                            id="webhook-url"
                            placeholder="https://your-app.com/webhook"
                            className="flex-1 bg-gray-800 border-gray-700 focus:border-spotifyGreen text-white"
                        />
                        <Button className="bg-gray-800 hover:bg-gray-700 text-gray-300">
                            Test
                        </Button>
                    </div>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                    <div className="space-y-2">
                        <Label>Events to send</Label>
                        <div className="space-y-1">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="event-users"
                                    defaultChecked
                                    className="rounded bg-gray-700 border-gray-600 text-spotifyGreen focus:ring-spotifyGreen mr-2"
                                />
                                <Label
                                    htmlFor="event-users"
                                    className="text-sm"
                                >
                                    User events
                                </Label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="event-content"
                                    defaultChecked
                                    className="rounded bg-gray-700 border-gray-600 text-spotifyGreen focus:ring-spotifyGreen mr-2"
                                />
                                <Label
                                    htmlFor="event-content"
                                    className="text-sm"
                                >
                                    Content updates
                                </Label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="event-system"
                                    className="rounded bg-gray-700 border-gray-600 text-spotifyGreen focus:ring-spotifyGreen mr-2"
                                />
                                <Label
                                    htmlFor="event-system"
                                    className="text-sm"
                                >
                                    System events
                                </Label>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="webhook-secret">Webhook Secret</Label>
                        <div className="flex gap-2">
                            <Input
                                id="webhook-secret"
                                type="password"
                                defaultValue="your-secret-key"
                                className="flex-1 bg-gray-800 border-gray-700 focus:border-spotifyGreen text-white"
                            />
                            <Button className="bg-gray-800 hover:bg-gray-700 text-gray-300">
                                <RefreshCw className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
