'use client'

import { useTheme } from 'next-themes'
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
import { Separator } from '@/components/ui/separator'
import { Save, Moon, Sun, CheckCircle } from 'lucide-react'

export function AppearanceSettings() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Appearance Settings</CardTitle>
                <CardDescription>
                    Customize how the admin panel looks
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Theme */}
                <ThemeSelector />

                <Separator />

                {/* Accent Color */}
                <AccentColorSelector />

                <Separator />

                {/* Sidebar Options */}
                <SidebarOptions />

                <Separator />

                {/* Font Size */}
                <TextSizeSelector />
            </CardContent>
            <CardFooter className="flex justify-between pt-5">
                <Button variant="outline">Reset to Defaults</Button>
                <Button>
                    <Save className="mr-2 h-4 w-4" /> Save Preferences
                </Button>
            </CardFooter>
        </Card>
    )
}

function ThemeSelector() {
    const { theme, setTheme } = useTheme()

    return (
        <div className="grid gap-4">
            <h3 className="text-sm font-medium">Theme</h3>
            <div className="grid grid-cols-3 gap-4">
                <div
                    className="flex flex-col items-center gap-2 cursor-pointer"
                    onClick={() => setTheme('dark')}
                >
                    <div
                        className={`relative w-full aspect-video bg-background rounded-md border-2 ${
                            theme === 'dark'
                                ? 'border-primary'
                                : 'border-border'
                        } flex items-center justify-center`}
                    >
                        <Moon className="h-5 w-5 text-foreground" />
                        {theme === 'dark' && (
                            <CheckCircle className="absolute top-2 right-2 h-4 w-4 text-primary" />
                        )}
                    </div>
                    <span className="text-sm">Dark</span>
                </div>
                <div
                    className="flex flex-col items-center gap-2 cursor-pointer"
                    onClick={() => setTheme('light')}
                >
                    <div
                        className={`w-full aspect-video bg-white rounded-md border-2 ${
                            theme === 'light'
                                ? 'border-primary'
                                : 'border-border'
                        } flex items-center justify-center`}
                    >
                        <Sun className="h-5 w-5 text-black" />
                        {theme === 'light' && (
                            <CheckCircle className="absolute top-2 right-2 h-4 w-4 text-primary" />
                        )}
                    </div>
                    <span className="text-sm">Light</span>
                </div>
                <div
                    className="flex flex-col items-center gap-2 cursor-pointer"
                    onClick={() => setTheme('system')}
                >
                    <div
                        className={`w-full aspect-video bg-gradient-to-r from-background to-card rounded-md border-2 ${
                            theme === 'system'
                                ? 'border-primary'
                                : 'border-border'
                        } flex items-center justify-center`}
                    >
                        <Moon className="h-5 w-5 text-foreground" />
                        {theme === 'system' && (
                            <CheckCircle className="absolute top-2 right-2 h-4 w-4 text-primary" />
                        )}
                    </div>
                    <span className="text-sm">System</span>
                </div>
            </div>
        </div>
    )
}

function AccentColorSelector() {
    return (
        <div className="grid gap-4">
            <h3 className="text-sm font-medium">Accent Color</h3>
            <div className="grid grid-cols-5 gap-4">
                <div className="flex flex-col items-center gap-2">
                    <div className="relative w-8 h-8 rounded-full bg-primary border-2 border-border flex items-center justify-center">
                        <CheckCircle className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <span className="text-xs">Default</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-purple-500 border-2 border-border"></div>
                    <span className="text-xs">Purple</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-500 border-2 border-border"></div>
                    <span className="text-xs">Blue</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-red-500 border-2 border-border"></div>
                    <span className="text-xs">Red</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-amber-500 border-2 border-border"></div>
                    <span className="text-xs">Amber</span>
                </div>
            </div>
        </div>
    )
}

function SidebarOptions() {
    return (
        <div className="grid gap-4">
            <h3 className="text-sm font-medium">Sidebar Options</h3>
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <div>
                        <Label htmlFor="sidebar-compact" className="text-sm">
                            Compact Mode
                        </Label>
                        <p className="text-xs text-muted-foreground">
                            Show icons only in sidebar when collapsed
                        </p>
                    </div>
                    <Switch id="sidebar-compact" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                    <div>
                        <Label htmlFor="sidebar-labels" className="text-sm">
                            Always Show Labels
                        </Label>
                        <p className="text-xs text-muted-foreground">
                            Keep text labels visible even in compact mode
                        </p>
                    </div>
                    <Switch id="sidebar-labels" />
                </div>
            </div>
        </div>
    )
}

function TextSizeSelector() {
    return (
        <div className="grid gap-4">
            <h3 className="text-sm font-medium">Text Size</h3>
            <div className="space-y-2">
                <div className="flex justify-between items-center">
                    <span className="text-xs">A</span>
                    <span className="text-lg">A</span>
                </div>
                <input
                    type="range"
                    min="1"
                    max="5"
                    defaultValue="3"
                    className="w-full h-2 rounded-lg appearance-none"
                />
            </div>
        </div>
    )
}
