"use client";

import { MobileNav } from "@/components/mobile-nav";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, MessageCircle, Share2, Play, Users } from "lucide-react";

const REELS = [
  { id: 1, user: "TraderJane", title: "My Scalping Strategy for EUR/USD", likes: "12k", image: "https://picsum.photos/seed/reel1/400/700" },
  { id: 2, user: "AlphaEdge", title: "Institutional Liquidity Secrets", likes: "8.5k", image: "https://picsum.photos/seed/reel2/400/700" },
];

export default function SocialPage() {
  return (
    <main className="min-h-screen pb-20 bg-black">
      <header className="fixed top-0 left-0 right-0 z-50 p-6 flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent">
        <h1 className="text-xl font-headline text-white">Trading Reels</h1>
        <div className="flex gap-4">
          <Button variant="ghost" size="icon" className="text-white"><Users className="h-6 w-6" /></Button>
          <Button variant="ghost" size="icon" className="text-white"><MessageCircle className="h-6 w-6" /></Button>
        </div>
      </header>

      {/* Reel Feed */}
      <div className="snap-y snap-mandatory overflow-y-scroll h-screen w-full">
        {REELS.map((reel) => (
          <div key={reel.id} className="snap-start relative h-screen w-full flex items-center justify-center">
            <img src={reel.image} className="absolute inset-0 h-full w-full object-cover" alt="Reel Video" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/20" />
            
            <div className="absolute bottom-28 left-6 right-16 space-y-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 border border-primary">
                  <AvatarImage src={`https://i.pravatar.cc/150?u=${reel.user}`} />
                  <AvatarFallback>{reel.user[0]}</AvatarFallback>
                </Avatar>
                <span className="font-bold text-white">@{reel.user}</span>
                <Button size="sm" variant="outline" className="h-7 px-3 text-xs bg-primary/20 border-primary text-primary">Follow</Button>
              </div>
              <p className="text-sm text-white/90 leading-snug">{reel.title}</p>
            </div>

            <div className="absolute bottom-28 right-4 flex flex-col gap-6 items-center">
              <div className="flex flex-col items-center gap-1">
                <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full bg-white/10 backdrop-blur-md text-white">
                  <Heart className="h-6 w-6" />
                </Button>
                <span className="text-[10px] text-white font-medium">{reel.likes}</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full bg-white/10 backdrop-blur-md text-white">
                  <MessageCircle className="h-6 w-6" />
                </Button>
                <span className="text-[10px] text-white font-medium">450</span>
              </div>
              <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full bg-white/10 backdrop-blur-md text-white">
                <Share2 className="h-6 w-6" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <MobileNav />
    </main>
  );
}