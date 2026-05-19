
"use client";

import { MobileNav } from "@/components/mobile-nav";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Crown, Search, Bell, Sparkles, Zap, Flame, Target } from "lucide-react";
import Link from "next/link";
import { useCurrency } from "@/context/currency-context";
import { cn } from "@/lib/utils";
import { PaymentButton } from "@/components/payment-button";
import { motion, AnimatePresence } from "framer-motion";

const TOP_ASSETS = [
  { pair: "BTC/USDT", price: 92140.50, change: "+4.2%", trend: "up", color: "from-orange-500/20" },
  { pair: "ETH/USDT", price: 2845.12, change: "+1.8%", trend: "up", color: "from-blue-500/20" },
  { pair: "XAU/USD", price: 2742.30, change: "-0.4%", trend: "down", color: "from-yellow-500/20" },
  { pair: "EUR/USD", price: 1.0542, change: "+0.1%", trend: "up", color: "from-green-500/20" },
];

const AI_INSIGHTS = [
  { id: 1, text: "Whale activity detected on ETH. Potential breakout above $2,900.", icon: <Zap className="text-blue-400" /> },
  { id: 2, text: "US Core PPI data expected in 2h. Volatility alert for EUR/USD.", icon: <Target className="text-purple-400" /> },
];

export default function Home() {
  const { format } = useCurrency();

  return (
    <main className="min-h-screen pb-24 overflow-x-hidden">
      <div className="floating-bg" />
      
      {/* Premium Header */}
      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="p-6 flex items-center justify-between sticky top-0 z-50 bg-background/40 backdrop-blur-xl border-b border-white/5"
      >
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-primary via-secondary to-pink-500 p-[2px] shadow-[0_0_15px_rgba(212,175,55,0.4)]">
            <div className="h-full w-full bg-background rounded-[10px] flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-primary animate-pulse" />
            </div>
          </div>
          <div>
            <h1 className="text-xl font-headline font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-pink-500">
              TRADIGO
            </h1>
            <p className="text-[8px] text-muted-foreground uppercase tracking-[0.2em]">Quantum Intelligence</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Link href="/notifications">
            <Button variant="ghost" size="icon" className="glass h-10 w-10 rounded-xl relative">
              <Bell className="h-5 w-5 text-primary" />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-pink-500 border-2 border-background animate-ping" />
            </Button>
          </Link>
          <Link href="/profile">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="h-10 w-10 rounded-xl border-2 border-primary/40 p-0.5 bg-background overflow-hidden shadow-lg"
            >
              <img src="https://picsum.photos/seed/trader-me/100/100" alt="Profile" className="h-full w-full object-cover rounded-lg" />
            </motion.div>
          </Link>
        </div>
      </motion.header>

      <section className="px-6 space-y-8 mt-4">
        {/* VIP Membership - Glassmorphism Card */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="relative overflow-hidden glass-card border-primary/20 group">
            <div className="absolute -top-12 -right-12 h-32 w-32 bg-primary/20 rounded-full blur-3xl group-hover:bg-primary/30 transition-all duration-500" />
            <div className="absolute -bottom-8 -left-8 h-24 w-24 bg-secondary/20 rounded-full blur-3xl" />
            
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-primary/20 text-primary shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                  <Crown className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-lg font-headline font-bold">Tradigo Prime VIP</h2>
                  <p className="text-xs text-muted-foreground">Unlock 94.8% accuracy signals</p>
                </div>
              </div>
              
              <PaymentButton 
                amount={199} 
                currency="USD" 
                label="Join the Elite for $199" 
                className="w-full bg-gradient-to-r from-primary to-amber-600 text-primary-foreground font-bold h-12 shadow-[0_0_25px_rgba(212,175,55,0.3)] hover:shadow-[0_0_40px_rgba(212,175,55,0.5)] transition-all rounded-xl"
              />
            </CardContent>
          </Card>
        </motion.div>

        {/* AI Insight Carousel */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-widest text-primary/80 flex items-center gap-2">
            <Sparkles className="h-4 w-4" /> AI Quantum Insights
          </h2>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {AI_INSIGHTS.map((insight) => (
              <motion.div 
                key={insight.id}
                whileTap={{ scale: 0.98 }}
                className="min-w-[280px] p-4 rounded-2xl glass border border-white/5 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-2 opacity-10">
                  <Sparkles className="h-12 w-12" />
                </div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-8 w-8 rounded-lg bg-white/10 flex items-center justify-center">
                    {insight.icon}
                  </div>
                  <Badge variant="outline" className="text-[10px] bg-primary/10 border-primary/20">LIVE ANALYSIS</Badge>
                </div>
                <p className="text-sm text-foreground/90 leading-relaxed font-medium">
                  {insight.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Live Market Cards */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-widest text-primary/80 flex items-center gap-2">
              <TrendingUp className="h-4 w-4" /> Live Market
            </h2>
            <Link href="/market" className="text-xs text-primary font-bold hover:underline">Full Terminal</Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {TOP_ASSETS.map((asset, i) => (
              <motion.div
                key={asset.pair}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.02, y: -2 }}
              >
                <Card className="glass-card border-white/5 hover:border-primary/40 transition-all cursor-pointer group">
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-foreground/80">{asset.pair}</span>
                      <div className={cn(
                        "text-[10px] px-2 py-0.5 rounded-full font-bold",
                        asset.trend === 'up' ? "bg-green-500/20 text-green-500" : "bg-pink-500/20 text-pink-500"
                      )}>
                        {asset.change}
                      </div>
                    </div>
                    <div className="text-xl font-bold tracking-tight">{format(asset.price, 'USD')}</div>
                    {/* Simulated Neon Chart Line */}
                    <div className="h-8 w-full bg-muted/20 rounded-lg relative overflow-hidden">
                       <div className={cn(
                         "absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r",
                         asset.trend === 'up' ? "from-green-500" : "from-pink-500",
                         "to-transparent opacity-50"
                       )} />
                       <div className="h-full w-full gold-shimmer opacity-20" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Daily Reward / Missions */}
        <Card className="border-secondary/20 bg-gradient-to-br from-secondary/10 to-pink-500/10 overflow-hidden relative">
          <div className="absolute top-0 right-0 p-4 opacity-10 rotate-12">
            <Flame className="h-16 w-16 text-secondary" />
          </div>
          <CardContent className="p-5 flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="text-sm font-bold flex items-center gap-2">
                <Flame className="h-4 w-4 text-orange-500" /> Daily Mission
              </h3>
              <p className="text-[10px] text-muted-foreground uppercase">Trade 3 pairs to earn 50 Coins</p>
              <div className="w-32 h-1.5 bg-white/10 rounded-full mt-2 overflow-hidden">
                <div className="h-full w-[66%] bg-gradient-to-r from-secondary to-pink-500" />
              </div>
            </div>
            <Button size="sm" className="bg-secondary text-white rounded-xl font-bold px-5">Go</Button>
          </CardContent>
        </Card>
      </section>

      <MobileNav />
    </main>
  );
}
