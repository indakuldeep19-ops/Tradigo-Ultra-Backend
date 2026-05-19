
"use client";

import { MobileNav } from "@/components/mobile-nav";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, MessageCircle, Share2, Play, Users, Sparkles, Plus, MoreHorizontal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const REELS = [
  { id: 1, user: "TraderJane", title: "Institutional Order Flow Secrets revealed. ⚡", likes: "12k", comments: "450", image: "https://picsum.photos/seed/reel1/400/700", verified: true },
  { id: 2, user: "AlphaEdge", title: "How I made 400% on PEPE this week. #Crypto #AI", likes: "8.5k", comments: "1.2k", image: "https://picsum.photos/seed/reel2/400/700", verified: false },
];

export default function SocialPage() {
  const [activeReel, setActiveReel] = useState(0);

  return (
    <main className="min-h-screen pb-20 bg-black overflow-hidden relative">
      <header className="fixed top-0 left-0 right-0 z-50 p-6 flex items-center justify-between bg-gradient-to-b from-black/90 via-black/40 to-transparent backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-primary animate-pulse" />
          <h1 className="text-xl font-headline font-bold text-white tracking-tight">Quantum Reels</h1>
        </div>
        <div className="flex gap-3">
          <Button variant="ghost" size="icon" className="glass h-10 w-10 rounded-xl text-white">
            <Users className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="glass h-10 w-10 rounded-xl text-white">
            <Plus className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Reel Feed */}
      <div className="snap-y snap-mandatory overflow-y-scroll h-screen w-full scrollbar-hide">
        {REELS.map((reel, index) => (
          <div key={reel.id} className="snap-start relative h-screen w-full flex items-center justify-center bg-black">
            <motion.img 
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              src={reel.image} 
              className="absolute inset-0 h-full w-full object-cover opacity-80" 
              alt="Reel Video" 
            />
            
            {/* Glossy Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />
            
            {/* Content Container */}
            <div className="absolute bottom-28 left-6 right-20 space-y-5">
              <motion.div 
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                className="flex items-center gap-3"
              >
                <div className="relative">
                  <Avatar className="h-12 w-12 border-2 border-primary shadow-lg">
                    <AvatarImage src={`https://i.pravatar.cc/150?u=${reel.user}`} />
                    <AvatarFallback>{reel.user[0]}</AvatarFallback>
                  </Avatar>
                  {reel.verified && (
                    <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1 border-2 border-black">
                      <Sparkles className="h-2 w-2 text-white" />
                    </div>
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-white text-lg tracking-tight">@{reel.user}</span>
                    <Badge variant="outline" className="h-5 text-[10px] bg-primary/20 border-primary text-primary px-2 font-bold">ELITE</Badge>
                  </div>
                  <p className="text-[10px] text-white/60">Professional Scalper • London, UK</p>
                </div>
                <Button size="sm" className="h-8 px-4 rounded-xl bg-primary text-primary-foreground font-bold ml-2">Follow</Button>
              </motion.div>
              
              <motion.p 
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-sm text-white/90 leading-relaxed font-medium line-clamp-2 max-w-sm"
              >
                {reel.title}
              </motion.p>
              
              <div className="flex items-center gap-2">
                 <div className="px-3 py-1.5 rounded-full glass flex items-center gap-2 border border-white/10">
                    <Play className="h-3 w-3 text-primary fill-primary" />
                    <span className="text-[10px] text-white font-bold uppercase tracking-widest">Original Audio</span>
                 </div>
              </div>
            </div>

            {/* Action Sidebar */}
            <div className="absolute bottom-28 right-4 flex flex-col gap-6 items-center">
              <motion.div whileTap={{ scale: 0.8 }} className="flex flex-col items-center gap-1.5">
                <Button variant="ghost" size="icon" className="h-14 w-14 rounded-2xl glass text-white hover:text-pink-500 transition-colors">
                  <Heart className="h-7 w-7" />
                </Button>
                <span className="text-xs text-white font-bold shadow-sm">{reel.likes}</span>
              </motion.div>
              
              <motion.div whileTap={{ scale: 0.8 }} className="flex flex-col items-center gap-1.5">
                <Button variant="ghost" size="icon" className="h-14 w-14 rounded-2xl glass text-white">
                  <MessageCircle className="h-7 w-7" />
                </Button>
                <span className="text-xs text-white font-bold">{reel.comments}</span>
              </motion.div>

              <motion.div whileTap={{ scale: 0.8 }}>
                <Button variant="ghost" size="icon" className="h-14 w-14 rounded-2xl glass text-white">
                  <Share2 className="h-7 w-7" />
                </Button>
              </motion.div>

              <motion.div whileTap={{ scale: 0.8 }}>
                <Button variant="ghost" size="icon" className="h-14 w-14 rounded-2xl glass text-white">
                  <MoreHorizontal className="h-7 w-7" />
                </Button>
              </motion.div>
            </div>
          </div>
        ))}
      </div>

      <MobileNav />
    </main>
  );
}
