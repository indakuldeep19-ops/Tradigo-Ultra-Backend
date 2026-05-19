"use client";

import { MobileNav } from "@/components/mobile-nav";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle, Share2, Play, Users, Sparkles, Plus, MoreHorizontal, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

const REELS = [
  { id: 1, user: "TraderJane", title: "Institutional Order Flow Secrets revealed. ⚡ #TradingTips #Alpha", likes: "12.4k", comments: "450", image: "https://picsum.photos/seed/reel1/400/700", verified: true, role: "Elite Scalper" },
  { id: 2, user: "AlphaEdge", title: "How I made 400% on PEPE this week using Quantum Signals. 🐋", likes: "8.5k", comments: "1.2k", image: "https://picsum.photos/seed/reel2/400/700", verified: false, role: "Macro Expert" },
  { id: 3, user: "BullHunter", title: "XAU/USD breakout alert! Watch the support at 2740. 🔱", likes: "15k", comments: "890", image: "https://picsum.photos/seed/reel3/400/700", verified: true, role: "Gold Specialist" },
];

export default function SocialPage() {
  const [liked, setLiked] = useState<Record<number, boolean>>({});

  const toggleLike = (id: number) => {
    setLiked(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <main className="min-h-screen pb-20 bg-black overflow-hidden relative">
      <header className="fixed top-0 left-0 right-0 z-50 p-6 flex items-center justify-between bg-gradient-to-b from-black/90 via-black/40 to-transparent backdrop-blur-sm">
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="flex items-center gap-2"
        >
          <div className="h-8 w-8 rounded-lg bg-primary/20 flex items-center justify-center">
            <Sparkles className="h-5 w-5 text-primary animate-pulse" />
          </div>
          <h1 className="text-xl font-headline font-black text-white tracking-tighter uppercase italic">Quantum Reels</h1>
        </motion.div>
        <div className="flex gap-3">
          <Button variant="ghost" size="icon" className="glass h-10 w-10 rounded-xl text-white">
            <Users className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="glass h-12 w-12 rounded-2xl bg-primary text-black border-none shadow-[0_0_20px_rgba(212,175,55,0.4)]">
            <Plus className="h-6 w-6" />
          </Button>
        </div>
      </header>

      {/* Reel Feed */}
      <div className="snap-y snap-mandatory overflow-y-scroll h-screen w-full scrollbar-hide">
        {REELS.map((reel, index) => (
          <div key={reel.id} className="snap-start relative h-screen w-full flex items-center justify-center bg-black">
            <motion.img 
              initial={{ scale: 1.2, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 0.7 }}
              transition={{ duration: 0.8 }}
              src={reel.image} 
              className="absolute inset-0 h-full w-full object-cover" 
              alt="Reel Content" 
            />
            
            {/* Glossy Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />
            
            {/* Interactive Progress Bar */}
            <div className="absolute top-0 left-0 right-0 h-1 z-50 flex gap-1 px-1 pt-2">
               {REELS.map((_, i) => (
                 <div key={i} className={cn("h-full flex-1 rounded-full transition-all duration-500", i === index ? 'bg-primary' : 'bg-white/20')} />
               ))}
            </div>

            {/* Content Container */}
            <div className="absolute bottom-28 left-6 right-20 space-y-6">
              <motion.div 
                initial={{ x: -30, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                className="flex items-center gap-4"
              >
                <div className="relative">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="absolute -inset-1.5 rounded-full border-2 border-dashed border-primary/40"
                  />
                  <Avatar className="h-14 w-14 border-2 border-primary shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                    <AvatarImage src={`https://i.pravatar.cc/150?u=${reel.user}`} />
                    <AvatarFallback>{reel.user[0]}</AvatarFallback>
                  </Avatar>
                  {reel.verified && (
                    <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1.5 border-2 border-black">
                      <Sparkles className="h-2.5 w-2.5 text-white" />
                    </div>
                  )}
                </div>
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-black text-white text-xl tracking-tight">@{reel.user}</span>
                    <Badge variant="outline" className="h-5 text-[8px] bg-primary/20 border-primary/40 text-primary px-2 font-black uppercase tracking-widest">ELITE</Badge>
                  </div>
                  <p className="text-[10px] text-white/60 font-bold uppercase tracking-widest">{reel.role} • 12k Live</p>
                </div>
                <Button size="sm" className="h-9 px-5 rounded-2xl bg-white text-black font-black uppercase text-[10px] tracking-widest ml-2 hover:scale-105 transition-transform">Follow</Button>
              </motion.div>
              
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="space-y-3"
              >
                <p className="text-base text-white/95 leading-relaxed font-bold max-w-[85%]">
                  {reel.title}
                </p>
                <div className="flex items-center gap-3">
                   <div className="px-4 py-2 rounded-2xl glass flex items-center gap-2 border border-white/10 group cursor-pointer hover:bg-white/10 transition-colors">
                      <Play className="h-4 w-4 text-primary fill-primary" />
                      <span className="text-[10px] text-white font-black uppercase tracking-[0.2em]">Original Alpha Audio</span>
                   </div>
                   <div className="h-10 w-10 rounded-full glass flex items-center justify-center border border-white/10 animate-spin-slow">
                      <Zap className="h-5 w-5 text-primary" />
                   </div>
                </div>
              </motion.div>
            </div>

            {/* Premium Action Sidebar */}
            <div className="absolute bottom-28 right-4 flex flex-col gap-8 items-center">
              <motion.div 
                whileTap={{ scale: 0.7 }} 
                className="flex flex-col items-center gap-2"
                onClick={() => toggleLike(reel.id)}
              >
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={cn(
                    "h-16 w-16 rounded-[2rem] glass transition-all duration-300",
                    liked[reel.id] ? "text-pink-500 bg-pink-500/10 border-pink-500/30" : "text-white hover:text-pink-400"
                  )}
                >
                  <Heart className={cn("h-8 w-8", liked[reel.id] && "fill-current")} />
                </Button>
                <span className="text-[10px] text-white font-black tracking-widest uppercase">{reel.likes}</span>
              </motion.div>
              
              <motion.div whileTap={{ scale: 0.7 }} className="flex flex-col items-center gap-2">
                <Button variant="ghost" size="icon" className="h-16 w-16 rounded-[2rem] glass text-white">
                  <MessageCircle className="h-8 w-8" />
                </Button>
                <span className="text-[10px] text-white font-black tracking-widest uppercase">{reel.comments}</span>
              </motion.div>

              <motion.div whileTap={{ scale: 0.7 }} className="flex flex-col items-center gap-2">
                <Button variant="ghost" size="icon" className="h-16 w-16 rounded-[2rem] glass text-white">
                  <Share2 className="h-8 w-8" />
                </Button>
                <span className="text-[10px] text-white font-black tracking-widest uppercase">Share</span>
              </motion.div>

              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="h-14 w-14 rounded-2xl border-4 border-white/20 p-1 glass"
              >
                 <img src="https://picsum.photos/seed/music/100/100" className="h-full w-full object-cover rounded-xl" />
              </motion.div>
            </div>
          </div>
        ))}
      </div>

      <MobileNav />
      
      <style jsx global>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </main>
  );
}