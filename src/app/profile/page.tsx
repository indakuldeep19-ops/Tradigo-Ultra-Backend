"use client";

import { MobileNav } from "@/components/mobile-nav";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Settings, Shield, ChevronRight, Award, Star, Zap, Crown, Wallet as WalletIcon, Gift, BarChart2, TrendingUp, Gem, Heart, Users, MessageSquare } from "lucide-react";
import { CurrencySelector } from "@/components/currency-selector";
import Link from "next/link";
import { useCurrency } from "@/context/currency-context";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

export default function ProfilePage() {
  const { format } = useCurrency();
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    const newParticles = [...Array(15)].map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <main className="min-h-screen pb-24 relative">
      <div className="particles">
        {particles.map((p) => (
          <div key={p.id} className="particle" style={{ left: p.left, top: p.top }} />
        ))}
      </div>
      
      {/* Immersive Profile Header */}
      <div className="relative pt-20 pb-12 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-background to-background -z-10" />
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -z-20"
        />
        
        <div className="relative inline-block">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="h-36 w-36 rounded-[2.5rem] border-4 border-primary/30 p-2 mx-auto glass shadow-[0_0_50px_rgba(212,175,55,0.4)] relative"
          >
            <div className="h-full w-full rounded-[2rem] overflow-hidden relative">
              <img src="https://picsum.photos/seed/me/400/400" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            {/* Pulsing LVL Ring */}
            <motion.div 
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute -top-4 -right-4 bg-primary text-primary-foreground h-10 w-10 rounded-2xl flex items-center justify-center font-black border-4 border-background text-xs shadow-xl"
            >
              24
            </motion.div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-6 space-y-2"
        >
          <h1 className="text-3xl font-headline font-black tracking-tight text-white">
            Alex Sterling
          </h1>
          <div className="flex items-center justify-center gap-3">
            <Badge className="bg-primary/20 text-primary border-primary/30 rounded-xl px-4 py-1 flex items-center gap-2 font-black uppercase text-[10px] tracking-widest">
              <Crown className="h-3 w-3" /> PRIME MEMBER
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground font-bold tracking-widest uppercase mt-2">Professional Trader & Creator</p>
        </motion.div>
      </div>

      <div className="px-6 space-y-8">
        {/* Quick Stats Grid */}
        <div className="grid grid-cols-3 gap-3">
           {[
             { icon: Users, label: "Followers", value: "1.2k" },
             { icon: Heart, label: "Likes", value: "45k" },
             { icon: MessageSquare, label: "Posts", value: "234" },
           ].map((s, i) => (
             <motion.div 
               key={i} 
               whileHover={{ y: -5 }}
               className="glass-card rounded-3xl p-4 text-center border border-white/5"
             >
                <div className="flex justify-center mb-2 text-primary/60"><s.icon className="h-4 w-4" /></div>
                <div className="text-lg font-black">{s.value}</div>
                <div className="text-[8px] font-black uppercase tracking-widest text-muted-foreground">{s.label}</div>
             </motion.div>
           ))}
        </div>

        {/* Wallet Hub - Enhanced Interactive */}
        <Link href="/profile/wallet">
          <motion.div 
            whileHover={{ scale: 1.02, rotate: -1 }} 
            whileTap={{ scale: 0.98 }}
            className="group"
          >
            <Card className="glass-card border-primary/30 p-6 relative overflow-hidden rounded-[2.5rem] scanline-effect">
              <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                <WalletIcon className="h-32 w-32 text-primary" />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-5">
                  <div className="h-16 w-16 rounded-3xl bg-primary/20 text-primary flex items-center justify-center shadow-inner group-hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all">
                    <WalletIcon className="h-8 w-8" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-[9px] text-muted-foreground uppercase tracking-[0.3em] font-black">Quantum Liquidity</p>
                    <p className="text-3xl font-black font-headline text-primary group-hover:text-white transition-colors">{format(1240.50, 'USD')}</p>
                  </div>
                </div>
                <div className="h-12 w-12 rounded-2xl glass flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all">
                  <ChevronRight className="h-7 w-7" />
                </div>
              </div>
            </Card>
          </motion.div>
        </Link>

        {/* Progression Journey */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
             <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Mastery Progress</h2>
             <span className="text-[10px] text-primary font-black px-2 py-0.5 bg-primary/10 rounded-lg">GOLD ELITE</span>
          </div>
          <Card className="glass-card border-white/5 rounded-[2.5rem]">
            <CardContent className="p-7 space-y-8">
              <div className="flex justify-between items-end">
                <div className="space-y-1">
                  <p className="text-[9px] text-secondary font-black uppercase tracking-widest">Master Strategist</p>
                  <h3 className="text-xl font-black tracking-tight">Ascending to Grandmaster</h3>
                </div>
                <div className="text-right">
                   <p className="text-sm font-black text-white">1,240 <span className="text-muted-foreground font-medium">/ 2,000 XP</span></p>
                </div>
              </div>
              
              <div className="relative h-4 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "62%" }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-primary via-secondary to-pink-500 rounded-full gold-shimmer relative" 
                >
                  <motion.div 
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                    className="absolute inset-0 bg-white/30 blur-md w-1/2"
                  />
                </motion.div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: "Win Rate", value: "92%", icon: <TrendingUp className="h-5 w-5 text-green-500" /> },
                  { label: "Artifacts", value: "12", icon: <Award className="h-5 w-5 text-primary" /> },
                  { label: "Global", value: "#42", icon: <Gem className="h-5 w-5 text-secondary" /> },
                ].map((stat, i) => (
                  <motion.div 
                    key={i} 
                    whileHover={{ scale: 1.05 }}
                    className="text-center p-4 rounded-3xl bg-white/5 border border-white/5 group cursor-pointer"
                  >
                    <div className="flex justify-center mb-2 group-hover:scale-110 transition-transform">{stat.icon}</div>
                    <p className="text-xl font-black tracking-tighter">{stat.value}</p>
                    <p className="text-[8px] text-muted-foreground uppercase font-black tracking-widest mt-1">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Menu */}
        <div className="space-y-4 pb-8">
          <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary px-2">Ecosystem Hub</h2>
          <div className="space-y-3">
            {[
              { icon: Star, label: "Creator Terminal", sub: "Broadcast signals & reels", color: "text-primary", href: "/creator" },
              { icon: Gift, label: "Affiliate Nodes", sub: "Earn 20% passive revenue", color: "text-pink-500", href: "/referral" },
              { icon: Zap, label: "Combat Arenas", sub: "Live 1v1 trading battles", color: "text-secondary", href: "/battles" },
            ].map((item, i) => (
              <Link key={i} href={item.href}>
                <motion.div 
                  whileHover={{ x: 10 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-between p-5 glass-card rounded-3xl group cursor-pointer border-white/5"
                >
                  <div className="flex items-center gap-5">
                    <div className={cn("h-12 w-12 rounded-2xl flex items-center justify-center bg-white/5 transition-all group-hover:scale-110", item.color)}>
                      <item.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm font-black tracking-tight">{item.label}</p>
                      <p className="text-[10px] text-muted-foreground font-bold">{item.sub}</p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </motion.div>
              </Link>
            ))}
          </div>
          
          <Button variant="destructive" className="w-full bg-pink-500/10 text-pink-500 hover:bg-pink-500 hover:text-white border border-pink-500/20 rounded-3xl h-16 font-black tracking-widest uppercase text-xs transition-all mt-6">
            Initiate Logout
          </Button>
        </div>
      </div>

      <MobileNav />
    </main>
  );
}
