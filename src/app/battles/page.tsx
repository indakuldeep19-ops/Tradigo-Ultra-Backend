"use client";

import { MobileNav } from "@/components/mobile-nav";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mic, MicOff, Trophy, Flame, Users, PlusCircle } from "lucide-react";

const ROOMS = [
  { id: 1, title: "Wall Street Open Call", active: 124, type: "Public", host: "CaptainCrypto" },
  { id: 2, title: "Gold Scalping Room", active: 45, type: "Private", host: "BullTrader" },
];

export default function BattlesPage() {
  return (
    <main className="min-h-screen pb-20">
      <header className="p-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-headline">Battle Rooms</h1>
          <p className="text-sm text-muted-foreground">Voice chat and trading competitions</p>
        </div>
        <Button variant="ghost" size="icon" className="text-primary">
          <PlusCircle className="h-6 w-6" />
        </Button>
      </header>

      <div className="px-6 space-y-8">
        {/* Active Competition */}
        <Card className="border-secondary bg-gradient-to-r from-secondary/10 to-transparent relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 rotate-12">
            <Trophy className="h-16 w-16 text-secondary opacity-20" />
          </div>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Flame className="h-5 w-5 text-orange-500" />
              <span className="text-xs font-bold uppercase tracking-widest text-orange-500">Live Competition</span>
            </div>
            <CardTitle className="font-headline text-xl">The Gold Rush Cup</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Prize Pool</span>
              <span className="font-bold text-primary">$10,000</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Time Remaining</span>
              <span className="font-mono">04h 22m 15s</span>
            </div>
            <Button className="w-full bg-secondary text-white font-bold">Join Battle</Button>
          </CardContent>
        </Card>

        {/* Voice Rooms */}
        <div className="space-y-4">
          <h2 className="text-lg font-headline flex items-center gap-2">
            <Mic className="h-5 w-5 text-primary" /> Active Rooms
          </h2>
          <div className="space-y-4">
            {ROOMS.map((room) => (
              <Card key={room.id} className="border-border/50 bg-card hover:border-primary/30 transition-all cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className={room.type === 'Public' ? "border-green-500/30 text-green-500" : "border-primary/30 text-primary"}>
                      {room.type}
                    </Badge>
                    <div className="flex items-center gap-1 text-muted-foreground text-xs">
                      <Users className="h-3 w-3" /> {room.active} listening
                    </div>
                  </div>
                  <h3 className="font-bold mb-1">{room.title}</h3>
                  <p className="text-xs text-muted-foreground mb-4">Hosted by {room.host}</p>
                  
                  <div className="flex -space-x-2 mb-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="h-8 w-8 rounded-full border-2 border-card overflow-hidden">
                        <img src={`https://i.pravatar.cc/100?u=${room.id}${i}`} className="h-full w-full object-cover" />
                      </div>
                    ))}
                    <div className="h-8 w-8 rounded-full border-2 border-card bg-muted flex items-center justify-center text-[10px] font-bold">
                      +{room.active - 4}
                    </div>
                  </div>

                  <Button variant="secondary" className="w-full h-8 text-xs gap-2">
                    <Mic className="h-3 w-3" /> Enter Room
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <MobileNav />
    </main>
  );
}