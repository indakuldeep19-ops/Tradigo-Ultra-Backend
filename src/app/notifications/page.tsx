
"use client";

import { MobileNav } from "@/components/mobile-nav";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, Zap, Users, CreditCard, ChevronLeft } from "lucide-react";
import Link from "next/link";

const MOCK_NOTIFICATIONS = [
  { id: 1, title: "New AI Signal", body: "Strong BUY signal generated for BTC/USDT. Confidence: 94%", type: "signal", time: "2m ago", read: false },
  { id: 2, title: "Payout Received", body: "Your creator earnings for May have been credited to your wallet.", type: "payment", time: "1h ago", read: true },
  { id: 3, title: "New Follower", body: "TraderJohn started following your signals.", type: "social", time: "3h ago", read: true },
  { id: 4, title: "System Update", body: "Tradigo Prime v2.4 is now live with improved execution speed.", type: "system", time: "1d ago", read: true },
];

export default function NotificationsPage() {
  const getIcon = (type: string) => {
    switch (type) {
      case 'signal': return <Zap className="h-4 w-4 text-primary" />;
      case 'payment': return <CreditCard className="h-4 w-4 text-green-500" />;
      case 'social': return <Users className="h-4 w-4 text-secondary" />;
      default: return <Bell className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <main className="min-h-screen pb-20">
      <header className="p-6 flex items-center gap-4">
        <Link href="/">
          <Button variant="ghost" size="icon">
            <ChevronLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-2xl font-headline">Notifications</h1>
      </header>

      <div className="px-6 space-y-4">
        {MOCK_NOTIFICATIONS.map((notif) => (
          <Card key={notif.id} className={`border-border/50 ${notif.read ? 'bg-card/50' : 'bg-primary/5 border-primary/20'}`}>
            <CardContent className="p-4 flex gap-4">
              <div className={`mt-1 p-2 rounded-full h-fit ${notif.read ? 'bg-muted' : 'bg-primary/20'}`}>
                {getIcon(notif.type)}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex justify-between items-start">
                  <h3 className={`text-sm font-bold ${notif.read ? 'text-foreground/80' : 'text-foreground'}`}>{notif.title}</h3>
                  <span className="text-[10px] text-muted-foreground">{notif.time}</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{notif.body}</p>
                {!notif.read && (
                  <Badge variant="default" className="text-[8px] h-4 py-0 bg-primary/20 text-primary border-none">NEW</Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <MobileNav />
    </main>
  );
}
