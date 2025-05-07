'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { User, Lock, Bell, Moon, Key } from 'lucide-react'
import { ProfileSettings } from '@/modules/settings/components/ProfileSettings'
import { SecuritySettings } from '@/modules/settings/components/SecuritySettings'
import { NotificationSettings } from '@/modules/settings/components/NotificationSettings'
import { AppearanceSettings } from '@/modules/settings/components/AppearanceSettings'
import { ApiSettings } from '@/modules/settings/components/ApiSettings'

export default function SettingsPage() {
    return (
        <div className="flex flex-col gap-5">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
                <p className="text-gray-400 mt-1">
                    Manage your account and application preferences
                </p>
            </div>

            <Tabs defaultValue="profile" className="space-y-4">
                <TabsList className="bg-gray-800">
                    <TabsTrigger
                        value="profile"
                        className="flex items-center gap-2"
                    >
                        <User size={16} /> Profile
                    </TabsTrigger>
                    <TabsTrigger
                        value="security"
                        className="flex items-center gap-2"
                    >
                        <Lock size={16} /> Security
                    </TabsTrigger>
                    <TabsTrigger
                        value="notifications"
                        className="flex items-center gap-2"
                    >
                        <Bell size={16} /> Notifications
                    </TabsTrigger>
                    <TabsTrigger
                        value="appearance"
                        className="flex items-center gap-2"
                    >
                        <Moon size={16} /> Appearance
                    </TabsTrigger>
                    <TabsTrigger
                        value="api"
                        className="flex items-center gap-2"
                    >
                        <Key size={16} /> API Keys
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="profile">
                    <ProfileSettings />
                </TabsContent>

                <TabsContent value="security">
                    <SecuritySettings />
                </TabsContent>

                <TabsContent value="notifications">
                    <NotificationSettings />
                </TabsContent>

                <TabsContent value="appearance">
                    <AppearanceSettings />
                </TabsContent>

                <TabsContent value="api">
                    <ApiSettings />
                </TabsContent>
            </Tabs>
        </div>
    )
}
