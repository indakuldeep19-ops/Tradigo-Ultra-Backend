
"use client";

import { MobileNav } from "@/components/mobile-nav";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Gift, Share2, Users, Trophy, Copy, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function ReferralPage() {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  const referralCode = "TRADIGO_PRIME_2024";

  const handleCopy = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    toast({ title: "Code Copied!", description: "Share it with your network." });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen pb-20">
      <header className="p-6 text-center space-y-4">
        <div className="inline-block p-4 rounded-full bg-primary/10 text-primary mb-2">
          <Gift className="h-10 w-10" />
        </div>
        <h1 className="text-2xl font-headline">Share & Earn</h1>
        <p className="text-sm text-muted-foreground px-6">Invite your friends to Tradigo Prime and earn 10% lifetime commission on their subscription fees.</p>
      </header>

      <div className="px-6 space-y-6">
        {/* Referral Card */}
        <Card className="border-primary/20 bg-primary/5 relative overflow-hidden">
          <div className="absolute -top-4 -right-4">
            <Share2 className="h-24 w-24 text-primary opacity-10" />
          </div>
          <CardContent className="p-6 space-y-4 text-center">
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Your Referral Code</p>
            <div className="flex items-center gap-2 bg-background/50 border border-border/50 p-3 rounded-xl justify-center">
              <span className="font-mono font-bold text-lg">{referralCode}</span>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-primary" onClick={handleCopy}>
                {copied ? <CheckCircle2 className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
              </Button>
            </div>
            <Button className="w-full bg-primary text-primary-foreground font-bold h-12">
              Share Referral Link
            </Button>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2">
          <div className="text-center p-3 rounded-xl bg-card border border-border/50">
            <Users className="h-4 w-4 mx-auto mb-1 text-secondary" />
            <p className="text-lg font-bold">12</p>
            <p className="text-[8px] text-muted-foreground uppercase">Invites</p>
          </div>
          <div className="text-center p-3 rounded-xl bg-card border border-border/50">
            <Trophy className="h-4 w-4 mx-auto mb-1 text-primary" />
            <p className="text-lg font-bold">4</p>
            <p className="text-[8px] text-muted-foreground uppercase">Converts</p>
          </div>
          <div className="text-center p-3 rounded-xl bg-card border border-border/50">
            <Gift className="h-4 w-4 mx-auto mb-1 text-green-500" />
            <p className="text-lg font-bold">$124</p>
            <p className="text-[8px] text-muted-foreground uppercase">Earned</p>
          </div>
        </div>

        {/* Leaderboard Preview */}
        <div className="space-y-4">
          <h2 className="text-lg font-headline">Top Referrers</h2>
          <div className="space-y-2">
            {[
              { name: "CryptoKing", earned: 2450, rank: 1 },
              { name: "SignalMaster", earned: 1890, rank: 2 },
              { name: "TradigoAdmin", earned: 1450, rank: 3 },
            ].map((ref) => (
              <div key={ref.rank} className="flex items-center justify-between p-3 rounded-lg bg-muted/20 border border-border/30">
                <div className="flex items-center gap-3">
                  <span className={`h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    ref.rank === 1 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                  }`}>
                    {ref.rank}
                  </span>
                  <span className="text-sm font-medium">{ref.name}</span>
                </div>
                <Badge variant="outline" className="text-green-500 border-green-500/20 bg-green-500/5">
                  ${ref.earned}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </div>

      <MobileNav />
    </main>
  );
}
