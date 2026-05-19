
"use client";

import { MobileNav } from "@/components/mobile-nav";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Settings, Shield, ChevronRight, Award, Star, Zap, Crown, Wallet as WalletIcon, Gift, BarChart2, TrendingUp, Gem } from "lucide-react";
import { CurrencySelector } from "@/components/currency-selector";
import Link from "next/link";
import { useCurrency } from "@/context/currency-context";
import { motion } from "framer-motion";

export default function ProfilePage() {
  const { format } = useCurrency();

  return (
    <main className="min-h-screen pb-24 overflow-x-hidden">
      <div className="floating-bg" />
      
      {/* Dynamic Profile Header */}
      <div className="relative pt-16 pb-12 text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-secondary/5 to-transparent -z-10" />
        
        <motion.div 
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          className="relative inline-block"
        >
          <div className="h-32 w-32 rounded-3xl border-2 border-primary/40 p-1.5 mx-auto relative z-10 glass shadow-[0_0_30px_rgba(212,175,55,0.3)]">
            <img src="https://picsum.photos/seed/me/400/400" className="h-full w-full object-cover rounded-2xl" />
          </div>
          <motion.div 
            animate={{ y: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute -bottom-2 -right-2 bg-gradient-to-br from-primary to-amber-600 text-white h-10 w-10 rounded-xl flex items-center justify-center border-4 border-background z-20 shadow-xl"
          >
            <Gem className="h-5 w-5" />
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-6 space-y-1"
        >
          <h1 className="text-2xl font-headline font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-foreground/50">
            Alex Sterling
          </h1>
          <div className="flex items-center justify-center gap-2">
            <Badge className="bg-primary/20 text-primary border-primary/40 rounded-lg px-3 flex items-center gap-1">
              <Crown className="h-3 w-3" /> PRIME MEMBER
            </Badge>
            <Badge className="bg-secondary/20 text-secondary border-secondary/40 rounded-lg px-3">
              LVL 24
            </Badge>
          </div>
        </motion.div>
      </div>

      <div className="px-6 space-y-8">
        {/* Wallet Hub */}
        <Link href="/profile/wallet">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Card className="glass-card border-primary/20 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <WalletIcon className="h-24 w-24 text-primary" />
              </div>
              <CardContent className="p-5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-2xl bg-primary/10 text-primary shadow-inner">
                    <WalletIcon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Total Liquidity</p>
                    <p className="text-2xl font-bold font-headline">{format(1240.50, 'USD')}</p>
                  </div>
                </div>
                <div className="h-10 w-10 rounded-xl glass flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <ChevronRight className="h-6 w-6" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </Link>

        {/* Gamification Progress */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
             <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground px-1">Career Progression</h2>
             <span className="text-[10px] text-primary font-bold">92% Win Rate</span>
          </div>
          <Card className="glass-card border-white/5">
            <CardContent className="p-5 space-y-6">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-xs text-secondary font-bold uppercase tracking-widest">Master Strategist</p>
                  <h3 className="text-lg font-bold">Path to Grandmaster</h3>
                </div>
                <div className="text-right">
                   <p className="text-sm font-bold text-white">1,240 <span className="text-muted-foreground font-normal">/ 2,000 XP</span></p>
                </div>
              </div>
              
              <div className="relative h-3 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "62%" }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-primary via-secondary to-pink-500 rounded-full gold-shimmer" 
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Win Streak", value: "12d", icon: <TrendingUp className="h-4 w-4 text-green-500" /> },
                  { label: "Badges", value: "8", icon: <Award className="h-4 w-4 text-primary" /> },
                  { label: "Global Rank", value: "#45", icon: <Gem className="h-4 w-4 text-secondary" /> },
                ].map((stat, i) => (
                  <div key={i} className="text-center p-3 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                    <div className="flex justify-center mb-1">{stat.icon}</div>
                    <p className="text-lg font-bold">{stat.value}</p>
                    <p className="text-[8px] text-muted-foreground uppercase font-bold">{stat.label}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Interactive Menu Sections */}
        <div className="space-y-6">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground px-1 mb-3">Community & Growth</h2>
            <div className="space-y-2">
              {[
                { icon: Star, label: "Creator Dashboard", sub: "Manage signals & analytics", color: "text-primary", href: "/creator" },
                { icon: Gift, label: "Referral Program", sub: "Earn 20% commission", color: "text-pink-500", href: "/referral" },
                { icon: Zap, label: "Live Trading Battles", sub: "Compete for prize pools", color: "text-secondary", href: "/battles" },
              ].map((item, i) => (
                <Link key={i} href={item.href}>
                  <motion.div 
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center justify-between p-4 glass-card rounded-2xl group cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className={cn("p-2.5 rounded-xl bg-white/5", item.color)}>
                        <item.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-bold">{item.label}</p>
                        <p className="text-[10px] text-muted-foreground">{item.sub}</p>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground px-1 mb-3">Global Engine</h2>
            <Card className="glass-card border-white/5">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="space-y-0.5">
                  <p className="text-sm font-bold">App Currency</p>
                  <p className="text-[10px] text-muted-foreground">Real-time terminal conversion</p>
                </div>
                <CurrencySelector />
              </CardContent>
            </Card>
          </div>
        </div>

        <Button variant="destructive" className="w-full bg-pink-500/10 text-pink-500 hover:bg-pink-500 hover:text-white border border-pink-500/20 rounded-2xl h-14 font-bold transition-all mt-4 mb-8">
          Secure Logout
        </Button>
      </div>

      <MobileNav />
    </main>
  );
}
