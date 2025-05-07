import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Save } from 'lucide-react'

export function NotificationSettings() {
    return (
        <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>
                    Control when and how you receive notifications
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Email Notifications */}
                <EmailNotifications />

                <Separator className="bg-gray-800" />

                {/* In-App Notifications */}
                <AppNotifications />

                <Separator className="bg-gray-800" />

                {/* Notification Schedule */}
                <QuietHours />
            </CardContent>
            <CardFooter className="flex justify-between border-t border-gray-800 pt-5">
                <Button
                    variant="outline"
                    className="border-gray-700 text-gray-300 hover:bg-gray-800"
                >
                    Reset to Defaults
                </Button>
                <Button className="bg-spotifyGreen hover:bg-spotifyGreen/90 text-black">
                    <Save className="mr-2 h-4 w-4" /> Save Preferences
                </Button>
            </CardFooter>
        </Card>
    )
}

function EmailNotifications() {
    return (
        <div className="grid gap-4">
            <h3 className="text-sm font-medium">Email Notifications</h3>
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <div>
                        <Label htmlFor="email-security" className="text-sm">
                            Security Alerts
                        </Label>
                        <p className="text-xs text-gray-400">
                            Receive emails for suspicious login attempts
                        </p>
                    </div>
                    <Switch id="email-security" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                    <div>
                        <Label htmlFor="email-updates" className="text-sm">
                            Product Updates
                        </Label>
                        <p className="text-xs text-gray-400">
                            Get notified about new features and improvements
                        </p>
                    </div>
                    <Switch id="email-updates" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                    <div>
                        <Label htmlFor="email-reports" className="text-sm">
                            Weekly Reports
                        </Label>
                        <p className="text-xs text-gray-400">
                            Receive weekly summary of platform activity
                        </p>
                    </div>
                    <Switch id="email-reports" />
                </div>
            </div>
        </div>
    )
}

function AppNotifications() {
    return (
        <div className="grid gap-4">
            <h3 className="text-sm font-medium">In-App Notifications</h3>
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <div>
                        <Label htmlFor="app-content" className="text-sm">
                            New Content
                        </Label>
                        <p className="text-xs text-gray-400">
                            Get notified when new tracks or albums are added
                        </p>
                    </div>
                    <Switch id="app-content" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                    <div>
                        <Label htmlFor="app-users" className="text-sm">
                            User Activity
                        </Label>
                        <p className="text-xs text-gray-400">
                            Notifications about new user registrations and
                            actions
                        </p>
                    </div>
                    <Switch id="app-users" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                    <div>
                        <Label htmlFor="app-system" className="text-sm">
                            System Notifications
                        </Label>
                        <p className="text-xs text-gray-400">
                            Updates about system performance and maintenance
                        </p>
                    </div>
                    <Switch id="app-system" />
                </div>
            </div>
        </div>
    )
}

function QuietHours() {
    return (
        <div className="grid gap-4">
            <h3 className="text-sm font-medium">Notification Schedule</h3>
            <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                    <Label htmlFor="quiet-from">Quiet Hours From</Label>
                    <Select defaultValue="22">
                        <SelectTrigger className="bg-gray-800 border-gray-700 focus:ring-spotifyGreen text-white">
                            <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700 text-white">
                            {Array.from({ length: 24 }).map((_, i) => (
                                <SelectItem key={i} value={i.toString()}>
                                    {i.toString().padStart(2, '0')}:00
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="quiet-to">Quiet Hours To</Label>
                    <Select defaultValue="7">
                        <SelectTrigger className="bg-gray-800 border-gray-700 focus:ring-spotifyGreen text-white">
                            <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700 text-white">
                            {Array.from({ length: 24 }).map((_, i) => (
                                <SelectItem key={i} value={i.toString()}>
                                    {i.toString().padStart(2, '0')}:00
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
    )
}
