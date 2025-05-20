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
import { Separator } from '@/components/ui/separator'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Save } from 'lucide-react'

export function ProfileSettings() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Profile Settings</CardTitle>
                <CardDescription>
                    Manage your personal information and preferences
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Profile Picture */}
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                    <Avatar className="h-20 w-20 border-2">
                        <AvatarImage src="/avatar.png" />
                        <AvatarFallback className=" text-xl">AD</AvatarFallback>
                    </Avatar>
                    <div className="space-y-2">
                        <h3 className="text-sm font-medium">Profile Picture</h3>
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                                Upload
                            </Button>
                            <Button variant="outline" size="sm">
                                Remove
                            </Button>
                        </div>
                    </div>
                </div>

                <Separator className="bg-gray-800" />

                {/* Personal Information */}
                <ProfilePersonalInfo />

                <Separator className="bg-gray-800" />

                {/* Localization */}
                <ProfileLocalization />
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-5">
                <Button variant="outline">Cancel</Button>
                <Button>
                    <Save className="mr-2 h-4 w-4" /> Save Changes
                </Button>
            </CardFooter>
        </Card>
    )
}

function ProfilePersonalInfo() {
    return (
        <div className="grid gap-4">
            <h3 className="text-sm font-medium">Personal Information</h3>
            <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" defaultValue="Admin User" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                        id="email"
                        type="email"
                        defaultValue="admin@spotify.com"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" defaultValue="admin_user" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Select defaultValue="admin">
                        <SelectTrigger>
                            <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="admin">Administrator</SelectItem>
                            <SelectItem value="editor">
                                Content Editor
                            </SelectItem>
                            <SelectItem value="viewer">Viewer</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
    )
}

function ProfileLocalization() {
    return (
        <div className="grid gap-4">
            <h3 className="text-sm font-medium">Localization</h3>
            <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <Select defaultValue="en">
                        <SelectTrigger>
                            <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="es">Spanish</SelectItem>
                            <SelectItem value="fr">French</SelectItem>
                            <SelectItem value="de">German</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select defaultValue="utc">
                        <SelectTrigger>
                            <SelectValue placeholder="Select timezone" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="utc">UTC (GMT+0)</SelectItem>
                            <SelectItem value="est">
                                Eastern Time (GMT-5)
                            </SelectItem>
                            <SelectItem value="pst">
                                Pacific Time (GMT-8)
                            </SelectItem>
                            <SelectItem value="cet">
                                Central European Time (GMT+1)
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
    )
}
