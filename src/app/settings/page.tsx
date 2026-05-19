
"use client";

import { MobileNav } from "@/components/mobile-nav";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ChevronLeft, Bell, Shield, Eye, Globe, Smartphone, HelpCircle, Info } from "lucide-react";
import Link from "next/link";

export default function SettingsPage() {
  return (
    <main className="min-h-screen pb-20">
      <header className="p-6 flex items-center gap-4">
        <Link href="/profile">
          <Button variant="ghost" size="icon">
            <ChevronLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-2xl font-headline">Settings</h1>
      </header>

      <div className="px-6 space-y-6">
        {/* Notifications */}
        <div className="space-y-3">
          <h2 className="text-xs text-muted-foreground uppercase tracking-widest px-1">Alerts & Notifications</h2>
          <Card className="border-border/50">
            <CardContent className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bell className="h-4 w-4 text-primary" />
                  <Label htmlFor="push-notifs" className="text-sm font-medium">Push Notifications</Label>
                </div>
                <Switch id="push-notifs" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Smartphone className="h-4 w-4 text-primary" />
                  <Label htmlFor="signal-alerts" className="text-sm font-medium">Trading Signal Alerts</Label>
                </div>
                <Switch id="signal-alerts" defaultChecked />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Privacy & Security */}
        <div className="space-y-3">
          <h2 className="text-xs text-muted-foreground uppercase tracking-widest px-1">Privacy & Security</h2>
          <Card className="border-border/50">
            <CardContent className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Shield className="h-4 w-4 text-secondary" />
                  <Label htmlFor="biometric" className="text-sm font-medium">Biometric Unlock</Label>
                </div>
                <Switch id="biometric" />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Eye className="h-4 w-4 text-secondary" />
                  <Label htmlFor="hide-balance" className="text-sm font-medium">Hide Portfolio Balance</Label>
                </div>
                <Switch id="hide-balance" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* App Preferences */}
        <div className="space-y-3">
          <h2 className="text-xs text-muted-foreground uppercase tracking-widest px-1">Application</h2>
          <Card className="border-border/50">
            <CardContent className="p-4 space-y-4">
              <Button variant="ghost" className="w-full justify-between p-0 h-auto hover:bg-transparent">
                <div className="flex items-center gap-3">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Language</span>
                </div>
                <span className="text-xs text-muted-foreground">English (US)</span>
              </Button>
              <div className="h-px bg-border/50 w-full" />
              <Button variant="ghost" className="w-full justify-between p-0 h-auto hover:bg-transparent">
                <div className="flex items-center gap-3">
                  <HelpCircle className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Help & Support</span>
                </div>
              </Button>
              <div className="h-px bg-border/50 w-full" />
              <Button variant="ghost" className="w-full justify-between p-0 h-auto hover:bg-transparent">
                <div className="flex items-center gap-3">
                  <Info className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">About Tradigo Prime</span>
                </div>
                <span className="text-xs text-muted-foreground">v2.4.1</span>
              </Button>
            </CardContent>
          </Card>
        </div>

        <Button variant="destructive" className="w-full bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white border-none mt-4">
          Delete Account
        </Button>
      </div>

      <MobileNav />
    </main>
  );
}
