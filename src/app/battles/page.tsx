"use client";

import { MobileNav } from "@/components/mobile-nav";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mic, Trophy, Flame, Users, PlusCircle, Headphones, Sparkles, TrendingUp, Zap } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const ROOMS = [
  { id: 1, title: "Wall Street Open Call", active: 124, type: "Public", host: "CaptainCrypto", live: true },
  { id: 2, title: "Gold Scalping Room", active: 45, type: "Private", host: "BullTrader", live: false },
  { id: 3, title: "Crypto Whale Lounge", active: 89, type: "VIP", host: "WhaleHunter", live: true },
];

export default function BattlesPage() {
  return (
    <main className="min-h-screen pb-24 relative">
      <div className="particles">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="particle" style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }} />
        ))}
      </div>

      <header className="p-6 flex items-center justify-between sticky top-0 z-40 bg-background/40 backdrop-blur-xl">
        <div>
          <h1 className="text-3xl font-headline font-black tracking-tight italic uppercase text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
            Combat Hub
          </h1>
          <p className="text-[10px] text-muted-foreground font-black uppercase tracking-[0.3em]">Quantum Voice & Battles</p>
        </div>
        <motion.div whileHover={{ rotate: 90 }} transition={{ type: "spring" }}>
          <Button variant="ghost" size="icon" className="glass h-12 w-12 rounded-2xl text-primary">
            <PlusCircle className="h-7 w-7" />
          </Button>
        </motion.div>
      </header>

      <div className="px-6 space-y-8 mt-4">
        {/* Active Competition - Ultra Premium */}
        <motion.div
           initial={{ y: 20, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
        >
          <Card className="border-secondary/30 bg-gradient-to-br from-secondary/20 via-card to-background relative overflow-hidden rounded-[2.5rem] group scanline-effect">
            <motion.div 
              animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="absolute -top-10 -right-10 h-64 w-64 bg-secondary rounded-full blur-[80px]" 
            />
            <div className="absolute top-6 right-6 p-4">
              <Trophy className="h-16 w-16 text-primary animate-pulse" />
            </div>
            <CardHeader className="relative z-10 p-8">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-8 w-8 rounded-xl bg-orange-500/20 flex items-center justify-center">
                  <Flame className="h-5 w-5 text-orange-500 animate-bounce" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-500">Live Global War</span>
              </div>
              <CardTitle className="font-headline text-3xl font-black tracking-tighter text-white">The Gold Rush Cup</CardTitle>
            </CardHeader>
            <CardContent className="relative z-10 p-8 pt-0 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                 <div className="glass rounded-2xl p-4 border-white/5">
                    <p className="text-[8px] text-muted-foreground uppercase font-black tracking-widest mb-1">Prize Pool</p>
                    <p className="text-2xl font-black text-primary tracking-tight">$10,000</p>
                 </div>
                 <div className="glass rounded-2xl p-4 border-white/5">
                    <p className="text-[8px] text-muted-foreground uppercase font-black tracking-widest mb-1">Ends In</p>
                    <p className="text-lg font-black font-mono tracking-tight">04h 22m</p>
                 </div>
              </div>
              <Button className="w-full bg-primary text-primary-foreground font-black h-16 rounded-3xl text-sm uppercase tracking-widest shadow-[0_0_40px_rgba(212,175,55,0.4)] hover:shadow-[0_0_60px_rgba(212,175,55,0.6)] transition-all">
                DEPLOY TO BATTLE
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Discord-Style Voice Rooms */}
        <div className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary flex items-center gap-2">
              <Headphones className="h-4 w-4" /> Frequency Hub
            </h2>
            <Badge variant="outline" className="border-primary/20 text-primary uppercase text-[8px] font-black px-2">24 ROOMS ACTIVE</Badge>
          </div>
          
          <div className="grid grid-cols-1 gap-5">
            {ROOMS.map((room, i) => (
              <motion.div 
                key={room.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.02, x: 5 }}
              >
                <Link href={`/chat/${room.id}`}>
                  <Card className="glass-card border-white/5 hover:border-primary/40 transition-all cursor-pointer rounded-[2rem] overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className={cn(
                            "text-[8px] font-black tracking-widest uppercase border-none px-3",
                            room.type === 'Public' ? "bg-green-500/10 text-green-400" : "bg-primary/10 text-primary"
                          )}>
                            {room.type}
                          </Badge>
                          {room.live && (
                             <div className="flex items-center gap-1.5 px-2 py-0.5 bg-pink-500/10 rounded-full">
                               <div className="h-1 w-1 rounded-full bg-pink-500 animate-ping" />
                               <span className="text-[8px] font-black text-pink-500 uppercase">Live</span>
                             </div>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-white/40 text-[9px] font-black uppercase tracking-widest">
                          <Users className="h-3 w-3" /> {room.active}
                        </div>
                      </div>
                      
                      <div className="flex gap-5 items-center">
                         <div className="h-16 w-16 rounded-[1.5rem] bg-gradient-to-tr from-primary/20 to-secondary/20 flex items-center justify-center relative overflow-hidden border border-white/5">
                            <Headphones className="h-8 w-8 text-primary/60 group-hover:scale-110 transition-transform" />
                            <motion.div 
                              animate={{ y: [0, -10, 0] }}
                              transition={{ repeat: Infinity, duration: 2 }}
                              className="absolute bottom-1 right-1 h-3 w-3 rounded-full bg-green-500 border-2 border-background" 
                            />
                         </div>
                         <div className="flex-1 space-y-1">
                            <h3 className="text-lg font-black tracking-tight text-white group-hover:text-primary transition-colors">{room.title}</h3>
                            <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Host: {room.host}</p>
                            
                            <div className="flex items-center -space-x-3 mt-3">
                              {[1, 2, 3, 4].map((idx) => (
                                <motion.div 
                                  key={idx} 
                                  whileHover={{ y: -5, zIndex: 10 }}
                                  className="h-10 w-10 rounded-2xl border-4 border-background overflow-hidden glass shadow-xl"
                                >
                                  <img src={`https://i.pravatar.cc/100?u=${room.id}${idx}`} className="h-full w-full object-cover" />
                                </motion.div>
                              ))}
                              <div className="h-10 w-10 rounded-2xl border-4 border-background bg-muted/40 backdrop-blur-md flex items-center justify-center text-[10px] font-black text-white">
                                +{room.active - 4}
                              </div>
                            </div>
                         </div>
                         <Button variant="ghost" size="icon" className="h-12 w-12 rounded-2xl glass text-primary hover:bg-primary hover:text-black">
                            <Mic className="h-6 w-6" />
                         </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <MobileNav />
    </main>
  );
}