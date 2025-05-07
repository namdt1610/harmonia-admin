import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Globe, Smartphone } from 'lucide-react'

export function SecuritySettings() {
    return (
        <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>
                    Manage your password and account security
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Password Change */}
                <PasswordChange />

                <Separator className="bg-gray-800" />

                {/* Two-Factor Authentication */}
                <div className="grid gap-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-sm font-medium">
                                Two-Factor Authentication
                            </h3>
                            <p className="text-xs text-gray-400 mt-1">
                                Add an extra layer of security to your account
                            </p>
                        </div>
                        <Switch id="2fa" />
                    </div>
                </div>

                <Separator className="bg-gray-800" />

                {/* Session Management */}
                <ActiveSessions />
            </CardContent>
        </Card>
    )
}

function PasswordChange() {
    return (
        <div className="grid gap-4">
            <h3 className="text-sm font-medium">Change Password</h3>
            <div className="grid gap-4">
                <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input
                        id="current-password"
                        type="password"
                        placeholder="••••••••"
                        className="bg-gray-800 border-gray-700 focus:border-spotifyGreen text-white"
                    />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input
                            id="new-password"
                            type="password"
                            placeholder="••••••••"
                            className="bg-gray-800 border-gray-700 focus:border-spotifyGreen text-white"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="confirm-password">
                            Confirm New Password
                        </Label>
                        <Input
                            id="confirm-password"
                            type="password"
                            placeholder="••••••••"
                            className="bg-gray-800 border-gray-700 focus:border-spotifyGreen text-white"
                        />
                    </div>
                </div>
                <Button className="w-full sm:w-auto bg-spotifyGreen hover:bg-spotifyGreen/90 text-black">
                    Update Password
                </Button>
            </div>
        </div>
    )
}

function ActiveSessions() {
    return (
        <div className="grid gap-4">
            <h3 className="text-sm font-medium">Active Sessions</h3>
            <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-800 rounded-md">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-gray-700 rounded-full">
                            <Globe className="h-4 w-4 text-gray-300" />
                        </div>
                        <div>
                            <p className="text-sm font-medium">
                                Chrome on Windows
                            </p>
                            <p className="text-xs text-gray-400">
                                Current session • Last active now
                            </p>
                        </div>
                    </div>
                    <Badge className="bg-spotifyGreen text-black">Active</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-800 rounded-md">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-gray-700 rounded-full">
                            <Smartphone className="h-4 w-4 text-gray-300" />
                        </div>
                        <div>
                            <p className="text-sm font-medium">iPhone 13 Pro</p>
                            <p className="text-xs text-gray-400">
                                San Francisco, CA • Last active 2 days ago
                            </p>
                        </div>
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-700 text-gray-300 hover:bg-gray-700"
                    >
                        Revoke
                    </Button>
                </div>
            </div>
            <Button
                variant="outline"
                className="w-full sm:w-auto border-gray-700 text-red-500 hover:bg-gray-800 hover:text-red-400"
            >
                Log Out All Devices
            </Button>
        </div>
    )
}
