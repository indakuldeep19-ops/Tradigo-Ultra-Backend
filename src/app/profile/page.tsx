
"use client";

import { MobileNav } from "@/components/mobile-nav";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Settings, Shield, ChevronRight, Award, Star, Zap, Crown, Wallet as WalletIcon } from "lucide-react";
import { CurrencySelector } from "@/components/currency-selector";
import Link from "next/link";
import { useCurrency } from "@/context/currency-context";

export default function ProfilePage() {
  const { format } = useCurrency();

  return (
    <main className="min-h-screen pb-20">
      {/* Profile Header */}
      <div className="bg-gradient-to-b from-primary/10 to-transparent pt-12 pb-8 px-6 text-center space-y-4">
        <div className="relative inline-block">
          <div className="h-24 w-24 rounded-full border-2 border-primary p-1 mx-auto relative z-10">
            <img src="https://picsum.photos/seed/me/200/200" className="h-full w-full object-cover rounded-full" />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground h-8 w-8 rounded-full flex items-center justify-center border-4 border-background z-20">
            <Zap className="h-4 w-4" />
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-headline font-bold">Alex Sterling</h1>
          <p className="text-sm text-primary font-semibold flex items-center justify-center gap-1 mt-1">
            <Crown className="h-3 w-3" /> PRIME MEMBER
          </p>
        </div>
      </div>

      <div className="px-6 space-y-6">
        {/* Wallet Brief */}
        <Link href="/profile/wallet">
          <Card className="border-primary/20 bg-primary/5 hover:bg-primary/10 transition-colors cursor-pointer">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-primary/20 text-primary">
                  <WalletIcon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Available Balance</p>
                  <p className="text-lg font-bold">{format(1240.50, 'USD')}</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-primary" />
            </CardContent>
          </Card>
        </Link>

        {/* Progress & Stats */}
        <Card className="border-border/50">
          <CardContent className="p-4 space-y-4">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-widest">Level 24</p>
                <h3 className="text-lg font-bold">Elite Strategist</h3>
              </div>
              <span className="text-xs text-muted-foreground">1,240 / 2,000 XP</span>
            </div>
            <Progress value={62} className="h-2 bg-muted overflow-hidden">
               <div className="h-full bg-primary gold-shimmer" />
            </Progress>
            
            <div className="grid grid-cols-3 gap-2 pt-2">
              <div className="text-center p-2 rounded-lg bg-muted/30">
                <p className="text-xl font-bold">12</p>
                <p className="text-[10px] text-muted-foreground uppercase">Streak</p>
              </div>
              <div className="text-center p-2 rounded-lg bg-muted/30">
                <p className="text-xl font-bold">452</p>
                <p className="text-[10px] text-muted-foreground uppercase">Followers</p>
              </div>
              <div className="text-center p-2 rounded-lg bg-muted/30">
                <p className="text-xl font-bold">92%</p>
                <p className="text-[10px] text-muted-foreground uppercase">Win Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Global Currency Settings */}
        <div className="space-y-3">
          <h2 className="text-xs text-muted-foreground uppercase tracking-widest px-1">Global Preferences</h2>
          <Card className="border-border/50">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="space-y-0.5">
                <p className="text-sm font-medium">App Currency</p>
                <p className="text-[10px] text-muted-foreground">Prices will update automatically</p>
              </div>
              <CurrencySelector />
            </CardContent>
          </Card>
        </div>

        {/* Menu Options */}
        <div className="space-y-2">
          <h2 className="text-xs text-muted-foreground uppercase tracking-widest px-1">Settings & Security</h2>
          {[
            { icon: Award, label: "Achievements & Badges", color: "text-yellow-500" },
            { icon: Shield, label: "Vault Security (Biometric)", color: "text-primary" },
            { icon: Star, label: "Creator Dashboard", color: "text-secondary" },
            { icon: Settings, label: "App Preferences", color: "text-muted-foreground" },
          ].map((item, i) => (
            <Button key={i} variant="ghost" className="w-full justify-between h-14 border-b border-border/30 rounded-none px-2 group">
              <div className="flex items-center gap-3">
                <item.icon className={`h-5 w-5 ${item.color}`} />
                <span className="font-medium">{item.label}</span>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </Button>
          ))}
        </div>

        <Button variant="destructive" className="w-full mt-4 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white border-none">
          Log Out
        </Button>
      </div>

      <MobileNav />
    </main>
  );
}
