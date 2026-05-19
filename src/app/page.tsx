"use client";

import { MobileNav } from "@/components/mobile-nav";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Crown, Bell, Sparkles, Zap, Target, Flame, ChevronRight, Share2 } from "lucide-react";
import Link from "next/link";
import { useCurrency } from "@/context/currency-context";
import { cn } from "@/lib/utils";
import { PaymentButton } from "@/components/payment-button";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const TOP_ASSETS = [
  { pair: "BTC/USDT", price: 94210.50, change: "+5.1%", trend: "up" },
  { pair: "ETH/USDT", price: 2985.12, change: "+2.4%", trend: "up" },
  { pair: "XAU/USD", price: 2742.30, change: "-0.4%", trend: "down" },
  { pair: "SOL/USDT", price: 142.15, change: "+12.8%", trend: "up" },
];

const AI_INSIGHTS = [
  { id: 1, text: "Whale activity detected on ETH. Potential breakout above $3,100.", icon: <Zap className="text-blue-400" />, type: "WHALE" },
  { id: 2, text: "US Core PPI data expected in 2h. Volatility alert for EUR/USD.", icon: <Target className="text-purple-400" />, type: "MACRO" },
  { id: 3, text: "RSI Diversion on BTC 4h chart. Overbought signals emerging.", icon: <Flame className="text-orange-400" />, type: "TECH" },
];

export default function Home() {
  const { format } = useCurrency();
  const [tickerIndex, setTickerIndex] = useState(0);
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    // Generate particles only on the client to avoid hydration mismatch
    const newParticles = [...Array(20)].map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
      size: `${Math.random() * 3 + 1}px`,
    }));
    setParticles(newParticles);

    const timer = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % TOP_ASSETS.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="min-h-screen pb-24 relative">
      <div className="particles">
        {particles.map((p) => (
          <div 
            key={p.id} 
            className="particle" 
            style={{
              left: p.left,
              top: p.top,
              animationDelay: p.delay,
              width: p.size,
              height: p.size,
            }} 
          />
        ))}
      </div>
      
      {/* Floating AI Orb */}
      <motion.div 
        drag
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        className="fixed top-1/2 right-4 z-50 pointer-events-auto cursor-grab active:cursor-grabbing"
      >
        <div className="h-16 w-16 hologram-orb rounded-full flex items-center justify-center relative shadow-[0_0_50px_rgba(212,175,55,0.4)]">
           <Sparkles className="h-6 w-6 text-white animate-pulse" />
           <div className="absolute inset-0 rounded-full border border-primary/20 animate-ping" />
        </div>
      </motion.div>

      {/* Premium Header */}
      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="p-6 flex items-center justify-between sticky top-0 z-40 bg-background/40 backdrop-blur-2xl border-b border-white/5"
      >
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-2xl bg-gradient-to-tr from-primary via-secondary to-pink-500 p-[2px] shadow-[0_0_20px_rgba(212,175,55,0.4)]">
            <div className="h-full w-full bg-[#0d0d12] rounded-[14px] flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-primary animate-pulse" />
            </div>
          </div>
          <div>
            <h1 className="text-xl font-headline font-black text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-pink-500 tracking-tight">
              TRADIGO
            </h1>
            <div className="flex items-center gap-1.5">
               <div className="h-1 w-1 rounded-full bg-green-500 animate-pulse" />
               <p className="text-[8px] text-muted-foreground uppercase tracking-[0.3em] font-bold">Quantum Core Live</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Link href="/notifications">
            <Button variant="ghost" size="icon" className="glass h-10 w-10 rounded-xl relative hover:bg-white/10">
              <Bell className="h-5 w-5 text-primary" />
              <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-pink-500 border-2 border-background" />
            </Button>
          </Link>
          <Link href="/profile">
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className="h-10 w-10 rounded-xl border-2 border-primary/40 p-0.5 bg-background shadow-lg relative overflow-hidden group"
            >
              <img src="https://picsum.photos/seed/trader-me/100/100" alt="Profile" className="h-full w-full object-cover rounded-lg group-hover:scale-110 transition-transform" />
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          </Link>
        </div>
      </motion.header>

      <section className="px-6 space-y-8 mt-6">
        {/* Dynamic Ticker */}
        <div className="glass h-10 rounded-xl flex items-center px-4 overflow-hidden border border-white/5">
           <AnimatePresence mode="wait">
             <motion.div 
               key={tickerIndex}
               initial={{ y: 20, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               exit={{ y: -20, opacity: 0 }}
               className="flex items-center justify-between w-full"
             >
               <span className="text-[10px] font-black tracking-widest text-primary/80">{TOP_ASSETS[tickerIndex].pair}</span>
               <div className="flex items-center gap-2">
                 <span className="text-xs font-bold font-mono">{format(TOP_ASSETS[tickerIndex].price, 'USD')}</span>
                 <Badge variant="outline" className={cn(
                   "text-[9px] h-4 py-0 border-none",
                   TOP_ASSETS[tickerIndex].trend === 'up' ? "text-green-500 bg-green-500/10" : "text-pink-500 bg-pink-500/10"
                 )}>
                   {TOP_ASSETS[tickerIndex].change}
                 </Badge>
               </div>
             </motion.div>
           </AnimatePresence>
        </div>

        {/* Hero Card - VIP */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="relative overflow-hidden glass-card border-primary/30 group scanline-effect">
            <div className="absolute -top-12 -right-12 h-40 w-40 bg-primary/20 rounded-full blur-3xl group-hover:bg-primary/40 transition-all duration-700" />
            <div className="absolute -bottom-8 -left-8 h-24 w-24 bg-secondary/20 rounded-full blur-3xl" />
            
            <CardContent className="p-7">
              <div className="flex items-center gap-4 mb-6">
                <motion.div 
                  animate={{ rotateY: [0, 180, 360] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="p-3 rounded-2xl bg-primary/20 text-primary shadow-[0_0_20px_rgba(212,175,55,0.4)]"
                >
                  <Crown className="h-7 w-7" />
                </motion.div>
                <div>
                  <h2 className="text-xl font-headline font-black tracking-tight">Tradigo Prime VIP</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex -space-x-1">
                      {[1,2,3].map(i => <div key={i} className="h-4 w-4 rounded-full bg-muted border border-background text-[6px] flex items-center justify-center font-bold">T{i}</div>)}
                    </div>
                    <p className="text-[10px] text-muted-foreground font-medium">Joined by 12k+ Elites</p>
                  </div>
                </div>
              </div>
              
              <PaymentButton 
                amount={199} 
                currency="USD" 
                label="Ascend to VIP Status" 
                className="w-full bg-gradient-to-r from-primary via-amber-600 to-primary text-primary-foreground font-black h-14 shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:shadow-[0_0_50px_rgba(212,175,55,0.6)] transition-all rounded-2xl tracking-widest uppercase text-xs"
              />
            </CardContent>
          </Card>
        </motion.div>

        {/* AI Insight Swiper */}
        <div className="space-y-4">
          <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary flex items-center gap-2 px-1">
            <Sparkles className="h-4 w-4" /> Quantum Predictions
          </h2>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {AI_INSIGHTS.map((insight, i) => (
              <motion.div 
                key={insight.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                whileTap={{ scale: 0.95 }}
                className="min-w-[300px] p-5 rounded-[2rem] glass-card border border-white/5 relative group cursor-pointer"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      {insight.icon}
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-black text-white/50">{insight.type} ANALYSIS</span>
                      <p className="text-xs font-bold text-primary">Live Data</p>
                    </div>
                  </div>
                  <Share2 className="h-4 w-4 text-white/20 group-hover:text-primary transition-colors" />
                </div>
                <p className="text-sm text-foreground/90 leading-relaxed font-semibold italic">
                  "{insight.text}"
                </p>
                <div className="mt-4 flex items-center gap-2">
                   <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "85%" }}
                        transition={{ duration: 1.5, delay: i * 0.2 }}
                        className="h-full bg-primary gold-shimmer"
                      />
                   </div>
                   <span className="text-[8px] font-bold text-primary">94%</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Assets Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary flex items-center gap-2">
              <TrendingUp className="h-4 w-4" /> Live Terminal
            </h2>
            <Link href="/market" className="text-[10px] text-primary font-black tracking-widest flex items-center gap-1 group">
              VIEW ALL <ChevronRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {TOP_ASSETS.map((asset, i) => (
              <motion.div
                key={asset.pair}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.05, y: -5, rotate: 1 }}
                className="perspective-1000"
              >
                <Card className="glass-card border-white/5 hover:border-primary/50 transition-all cursor-pointer group">
                  <CardContent className="p-5 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black tracking-tight text-white/70">{asset.pair}</span>
                      <div className={cn(
                        "text-[9px] px-2 py-1 rounded-lg font-black",
                        asset.trend === 'up' ? "bg-green-500/10 text-green-400" : "bg-pink-500/10 text-pink-400"
                      )}>
                        {asset.change}
                      </div>
                    </div>
                    <div className="text-xl font-black font-mono tracking-tighter group-hover:text-primary transition-colors">
                      {format(asset.price, 'USD')}
                    </div>
                    {/* Pulsing Neon Line */}
                    <div className="h-10 w-full bg-white/5 rounded-xl relative overflow-hidden">
                       <motion.div 
                         animate={{ x: [-100, 300] }}
                         transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                         className={cn(
                           "absolute bottom-0 h-full w-20 blur-xl",
                           asset.trend === 'up' ? "bg-green-500/40" : "bg-pink-500/40"
                         )} 
                       />
                       <div className="absolute inset-0 flex items-center justify-center opacity-20">
                          <TrendingUp className="h-4 w-4" />
                       </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Daily Mission - Animated Reward */}
        <motion.div
           whileHover={{ scale: 1.02 }}
           className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-secondary to-pink-500 blur-xl opacity-20 -z-10" />
          <Card className="border-secondary/30 bg-card/60 backdrop-blur-3xl overflow-hidden rounded-[2.5rem]">
            <CardContent className="p-6 flex items-center justify-between">
              <div className="flex gap-4 items-center">
                <div className="h-14 w-14 rounded-2xl bg-secondary/20 flex items-center justify-center relative overflow-hidden">
                   <Flame className="h-8 w-8 text-orange-500 animate-bounce" />
                   <div className="absolute inset-0 bg-gradient-to-t from-orange-500/20 to-transparent" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-black tracking-tight uppercase">Daily Bounty</h3>
                  <p className="text-[10px] text-muted-foreground uppercase font-bold">Trade 3 assets today</p>
                  <div className="flex items-center gap-2 mt-2">
                     <div className="w-24 h-2 bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                           initial={{ width: 0 }}
                           animate={{ width: "66%" }}
                           className="h-full bg-gradient-to-r from-secondary to-pink-500 gold-shimmer"
                        />
                     </div>
                     <span className="text-[9px] font-black text-secondary">2/3</span>
                  </div>
                </div>
              </div>
              <Button className="h-12 w-12 rounded-2xl bg-secondary text-white shadow-lg shadow-secondary/30 hover:scale-110 transition-transform">
                <ChevronRight className="h-6 w-6" />
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      <MobileNav />
    </main>
  );
}
