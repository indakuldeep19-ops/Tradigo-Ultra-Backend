
"use client";

import { useState } from "react";
import { MobileNav } from "@/components/mobile-nav";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Zap, Target, ShieldAlert, Filter } from "lucide-react";
import { useCurrency } from "@/context/currency-context";

const MOCK_SIGNALS = [
  { pair: "GBP/JPY", type: "SELL", entry: 192.540, target: 190.200, stop: 193.100, confidence: 88, base: 'USD' as const },
  { pair: "XAU/USD", type: "BUY", entry: 2321.40, target: 2350.00, stop: 2310.00, confidence: 94, base: 'USD' as const },
];

export default function SignalsPage() {
  const { format } = useCurrency();

  return (
    <main className="min-h-screen pb-20">
      <header className="p-6">
        <h1 className="text-2xl font-headline">Intelligence Hub</h1>
        <p className="text-sm text-muted-foreground">AI signals and premium indicators</p>
      </header>

      <div className="px-6 space-y-6">
        <Tabs defaultValue="ai" className="w-full">
          <TabsList className="w-full bg-card border border-border/50 h-12 p-1">
            <TabsTrigger value="ai" className="flex-1 rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">AI Signals</TabsTrigger>
            <TabsTrigger value="marketplace" className="flex-1 rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Marketplace</TabsTrigger>
          </TabsList>

          <TabsContent value="ai" className="mt-6 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <Badge variant="outline" className="rounded-full border-primary/20 text-primary">Crypto</Badge>
                <Badge variant="outline" className="rounded-full border-border">Forex</Badge>
              </div>
              <Button variant="ghost" size="sm" className="text-muted-foreground">
                <Filter className="h-4 w-4 mr-2" /> Filter
              </Button>
            </div>

            {MOCK_SIGNALS.map((sig, i) => (
              <Card key={i} className="border-primary/20 bg-gradient-to-br from-card to-background overflow-hidden">
                <div className="h-1 bg-primary gold-shimmer w-full" />
                <CardContent className="p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Zap className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">{sig.pair}</h3>
                        <span className="text-[10px] text-muted-foreground">Confidence: {sig.confidence}%</span>
                      </div>
                    </div>
                    <Badge className={sig.type === 'BUY' ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"}>
                      {sig.type}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase text-muted-foreground">Entry</span>
                      <p className="font-bold text-sm">{format(sig.entry, sig.base)}</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase text-muted-foreground flex items-center"><Target className="h-2 w-2 mr-1" /> Target</span>
                      <p className="font-bold text-sm text-primary">{format(sig.target, sig.base)}</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase text-muted-foreground flex items-center"><ShieldAlert className="h-2 w-2 mr-1" /> Stop Loss</span>
                      <p className="font-bold text-sm text-secondary">{format(sig.stop, sig.base)}</p>
                    </div>
                  </div>

                  <Button className="w-full bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-primary-foreground transition-all">
                    View Full Analysis
                  </Button>
                </CardContent>
              </Card>
            ))}

            <Card className="border-dashed border-primary/30 bg-primary/5">
              <CardContent className="p-8 text-center space-y-4">
                <p className="text-sm text-muted-foreground italic">"Unlock more high-frequency signals with our VIP strategy packs."</p>
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  Explore Packs
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="marketplace" className="mt-6">
            <div className="grid grid-cols-1 gap-6">
              {[1, 2, 3].map((item) => (
                <Card key={item} className="overflow-hidden border-border/50">
                  <div className="h-40 w-full bg-muted relative">
                    <img src={`https://picsum.photos/seed/pack${item}/600/400`} className="h-full w-full object-cover opacity-60" alt="Strategy Pack" />
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-primary text-primary-foreground">{format(49.99, 'USD')}</Badge>
                    </div>
                  </div>
                  <CardContent className="p-4 space-y-2">
                    <h3 className="font-headline text-lg">Pro Trend Master Indicator</h3>
                    <p className="text-xs text-muted-foreground">By EliteTrader24 • 4.9 ★ (120 reviews)</p>
                    <div className="flex gap-2 pt-2">
                      <Button size="sm" className="flex-1 bg-secondary text-white">Buy Now</Button>
                      <Button size="sm" variant="outline" className="flex-1">Details</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <MobileNav />
    </main>
  );
}
