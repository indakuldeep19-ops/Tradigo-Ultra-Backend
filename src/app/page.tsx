import { MobileNav } from "@/components/mobile-nav";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Crown, Search, Bell } from "lucide-react";
import Link from "next/link";

const TOP_ASSETS = [
  { pair: "BTC/USDT", price: "64,231.50", change: "+2.4%", trend: "up" },
  { pair: "ETH/USDT", price: "3,452.12", change: "-0.8%", trend: "down" },
  { pair: "EUR/USD", price: "1.0842", change: "+0.1%", trend: "up" },
  { pair: "GOLD", price: "2,324.50", change: "+1.2%", trend: "up" },
];

export default function Home() {
  return (
    <main className="min-h-screen pb-20">
      {/* Header */}
      <header className="p-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-headline italic font-bold text-primary">Tradigo Prime</h1>
          <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">Elite Intelligence</p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="text-primary hover:bg-primary/10">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-primary hover:bg-primary/10">
            <Bell className="h-5 w-5" />
          </Button>
          <div className="h-10 w-10 rounded-full border border-primary/30 p-0.5 bg-background overflow-hidden">
            <img src="https://picsum.photos/seed/trader-me/100/100" alt="Profile" className="h-full w-full object-cover rounded-full" />
          </div>
        </div>
      </header>

      <section className="px-6 space-y-6">
        {/* VIP Card */}
        <Card className="relative overflow-hidden border-primary/20 bg-gradient-to-br from-card to-background">
          <div className="absolute top-0 right-0 p-4">
            <Crown className="h-12 w-12 text-primary opacity-20" />
          </div>
          <CardHeader>
            <CardTitle className="font-headline text-lg">VIP Membership</CardTitle>
            <p className="text-sm text-muted-foreground">Unlock 99% accuracy AI signals.</p>
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-primary text-primary-foreground font-semibold shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:scale-105 transition-transform">
              Upgrade to Prime
            </Button>
          </CardContent>
        </Card>

        {/* Live Market */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-headline">Live Market</h2>
            <Link href="/market" className="text-xs text-primary font-semibold">View All</Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {TOP_ASSETS.map((asset) => (
              <Card key={asset.pair} className="border-border/50 bg-card/50 hover:border-primary/50 transition-colors">
                <CardContent className="p-4 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold">{asset.pair}</span>
                    <Badge variant={asset.trend === 'up' ? 'default' : 'destructive'} className={cn(
                      "text-[10px] px-1.5 h-5",
                      asset.trend === 'up' && "bg-green-500/10 text-green-500 border-green-500/20"
                    )}>
                      {asset.trend === 'up' ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                      {asset.change}
                    </Badge>
                  </div>
                  <div className="text-lg font-bold">${asset.price}</div>
                  <div className="h-10 w-full gold-shimmer rounded bg-muted/20" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* AI Quick Insights */}
        <div className="space-y-4">
          <h2 className="text-lg font-headline">AI Alchemist Insights</h2>
          <Card className="border-secondary/20 bg-secondary/5">
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center gap-2">
                <Badge className="bg-primary/20 text-primary border-primary/30">LATEST NEWS</Badge>
                <span className="text-[10px] text-muted-foreground uppercase">2 mins ago</span>
              </div>
              <p className="text-sm italic leading-relaxed">
                "Bitcoin consolidates near $64k as institutional inflow hits record levels. Sentiment remains highly positive for Q4..."
              </p>
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-muted-foreground">Sentiment: <span className="text-green-500 font-bold">BULLISH</span></span>
                <Button variant="link" size="sm" className="text-primary p-0">Read More</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <MobileNav />
    </main>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}